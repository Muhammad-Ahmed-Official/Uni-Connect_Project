import { connectDB } from "@/lib/mongodb";
import departmentModel from "@/models/department.model";
import User from "@/models/user.model";
import PostModel from "@/models/post.model";
import Event from "@/models/event.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions.util";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  await connectDB();

  // 🔹 Authenticate the user
  const session = await getServerSession(authOptions);
  if (!session) {
    return nextError(401, "Unauthorized: Please login to access department details");
  }

  // 🔹 Role check (Only admin or university advisor)
  const role = session?.user?.role;
  if (!["admin", "university_Student_Advisor"].includes(role)) {
    return nextError(403, "Forbidden: You are not allowed to view department details");
  }

  const searchParams = new URL(req.url);
    const id = searchParams.searchParams.get("departmentId");

  // 🔹 Find department
  const department = await departmentModel.findById(id);
  if (!department) {
    return nextError(404, "Department not found");
  }

  // 🔹 Parallel aggregation
  const [totalStudents, totalPosts, totalEvents] = await Promise.all([
    User.countDocuments({ department_id: id, role: "student" }),
    PostModel.countDocuments({ department_id: id }),
    Event.countDocuments({ department_id: id }),
  ]);

  const departmentAdvisors = await User.find({ department_id:department?._id, role: { $in: ["department_Student_Advisor", "university_Student_Advisor"] } }).select('firstName lastName email ');

  // ✅ Return data
  return nextResponse(200, "Department details fetched successfully", {
    department,
    totalStudents,
    totalPosts,
    totalEvents,
    departmentAdvisors
  });
});
