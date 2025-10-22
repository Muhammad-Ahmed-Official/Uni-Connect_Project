import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import PostModel from "@/models/post.model";
import Event from "@/models/event.model";
import DepartmentModel from "@/models/department.model";
// import { DocumentSchema } from "@/models/document.schema"; 
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions.util";
import DocumentSchema from "@/models/document.schema";

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  await connectDB();

  // 🔹 Authenticate the user
  const session = await getServerSession(authOptions);
  if (!session) {
    return nextError(401, "Unauthorized: Please login to access dashboard data");
  }

  // 🔹 Optional role check (only admin/university advisor can view dashboard)
  const role = session?.user?.role;
  if (!["admin", "university_Student_Advisor"].includes(role)) {
    return nextError(403, "Forbidden: You are not allowed to access this dashboard");
  }

  // 🔹 Aggregations
  const [
    totalStudents,
    totalAdvisors,
    totalEvents,
    totalDepartments,
    totalDocuments,
  ] = await Promise.all([
    User.countDocuments({ role: "student" }),
    User.countDocuments({role:{ $in: ["department_Student_Advisor", "university_Student_Advisor"] }}),
    Event.countDocuments(),
    DepartmentModel.countDocuments(),
    DocumentSchema.countDocuments(),
  ]);

  // ✅ Return Dashboard Overview
  return nextResponse(200, "Dashboard Overview fetched successfully", {
    totalStudents,
    totalAdvisors,
    totalEvents,
    totalDepartments,
    totalDocuments,
    systemStatus: "Healthy ✅",
  });
});