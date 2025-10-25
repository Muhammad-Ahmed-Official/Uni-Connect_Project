import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/notification.model";
import User from "@/models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions.util";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextResponse, nextError } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) return nextError(401, "Unauthorized");

  const user = session.user;

  if (!user) return nextError(404, "User not found");

  const { title, content, scheduleFor } = await req.json();
  if(!title || !content) {
    return nextError(400, "Title and content are required");
  }
if (user.role !== "admin" && user.role !== "department_Student_Advisor") {
    return nextError(403, "Only admin or advisor can send messages");
  }

  let recipients = [];
  let department_id = null;
  let targetAudience = "All Users";

  // 🔹 Admin → all users
  if (user.role === "admin") {
    const allUsers = await User.find({}, "_id");
    recipients = allUsers.map(u => u._id);
    targetAudience = "All Users";
  }

  // 🔹 Advisor → only students in their department
  else if (user.role === "department_Student_Advisor") {
    const advisor = await User.findById(user.id);
    if (!advisor?.department_id) {
      return nextError(400, "Advisor has no department assigned");
    }

    department_id = advisor.department_id;

    const students = await User.find(
      { role: "student", department_id },
      "_id"
    );

    if (!students.length) {
      return nextError(404, "No students found in this department");
    }

    recipients = students.map(s => s._id);
    targetAudience = "Students";
  }

   // 🔹 Create notification
  const newMessage = await Notification.create({
    title,
    content,
    scheduleFor,
    sender: user.id,
    recipients,
    department_id,
    targetAudience,
  });

  return nextResponse(201, "Message created successfully", newMessage);
});


/* ================================
   🟣 GET (For All Users)
================================ */
export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) return nextError(401, "Unauthorized");
  const user = session.user;

  let notifications;

  if (user.role === "admin") {
    notifications = await Notification.find().sort({ createdAt: -1 });
  } else if (user.role === "department_Student_Advisor") {
    notifications = await Notification.find({ department_id: user.department_id }).sort({ createdAt: -1 });
  } else {
    notifications = await Notification.find({ recipients: user.id }).sort({ createdAt: -1 });
  }

  return nextResponse(200, "Notifications fetched successfully", notifications);
});

/* ================================
   🔵 UPDATE (Only Admin or Advisor)
================================ */
export const PATCH = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) return nextError(401, "Unauthorized");
  const user = session.user;

  const { title, content, scheduleFor } = await req.json();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("notificationId");
  if (!id) return nextError(400, "Notification ID is required");



  const notification = await Notification.findById(id);
  if (!notification) return nextError(404, "Notification not found");

  // ✅ Admin can edit any notification
  // ✅ Advisor can edit only their department's
  if (
    user.role !== "admin" &&
    !(user.role === "department_Student_Advisor" && String(notification.department_id) === String(user.department_id))
  ) {
    return nextError(403, "You are not authorized to update this notification");
  }

  notification.title = title || notification.title;
  notification.content = content || notification.content;
  notification.scheduleFor = scheduleFor || notification.scheduleFor;

  await notification.save();

  return nextResponse(200, "Notification updated successfully", notification);
});

/* ================================
   🔴 DELETE (Only Admin or Advisor)
================================ */
export const DELETE = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) return nextError(401, "Unauthorized");
  const user = session.user;

  const { searchParams } = new URL(req.url);
  const notificationId = searchParams.get("notificationId");
  if (!notificationId) return nextError(400, "Notification ID is required");

  const notification = await Notification.findById(notificationId);
  if (!notification) return nextError(404, "Notification not found");

  if (
    user.role !== "admin" &&
    !(user.role === "department_Student_Advisor")
    && String(notification.department_id) === String(user.department_id)
  ) {
    return nextError(403, "You are not authorized to delete this notification");
  }

  await Notification.findByIdAndDelete(notificationId);
  return nextResponse(200, "Notification deleted successfully");
});