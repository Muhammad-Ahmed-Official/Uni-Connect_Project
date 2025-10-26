import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import Event from "@/models/event.model";
import DepartmentModel from "@/models/department.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions.util";
import { NextRequest, NextResponse } from "next/server";
import DocumentSchema from "@/models/document.schema";

// 🧠 Utility to format unified activity object
const formatActivity = (type: string, title: string, createdAt: Date) => ({
  type,
  title,
  time: createdAt,
});

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  await connectDB();

  // 🔹 Authenticate user
  const session = await getServerSession(authOptions);
  if (!session) {
    return nextError(401, "Unauthorized: Please login to view recent activity");
  }

  // 🔹 Fetch recent records (sorted by time)
  const [recentUsers, recentDocuments, recentEvents, recentDepartments] = await Promise.all([
    User?.find().populate("department_id", "departmentName").sort({ createdAt: -1 }).limit(3),
    DocumentSchema?.find().sort({ createdAt: -1 }).limit(3),
    Event?.find().sort({ createdAt: -1 }).limit(3),
    DepartmentModel?.find().sort({ createdAt: -1 }).limit(3),
  ]);

  // 🔹 Format all activities into one list
  const activities = [
    ...recentUsers.map((u:any) =>
      formatActivity(
        "user",
        `New student registered: ${u.firstName} ${u.lastName} (${u.department_id?.departmentName})`,
        u.createdAt
      )
    ),
    ...recentDocuments.map((d:any) =>
      formatActivity("document", `Document uploaded: ${d.title}`, d.createdAt)
    ),
    ...recentEvents.map((e:any) =>
      formatActivity("event", `Event created: ${e.title}`, e.createdAt)
    ),
    ...recentDepartments.map((d:any) =>
      formatActivity("department", `New department created: ${d.departmentName}`, d.createdAt)
    ),
  ];

  // 🔹 Sort by latest first
  activities.sort((a, b) => b?.time?.getTime() - a?.time?.getTime());

  // 🔹 Limit to top 5 most recent
  const latestActivities = activities.slice(0, 5);

  return nextResponse(200, "Recent activity fetched successfully", latestActivities);
});
