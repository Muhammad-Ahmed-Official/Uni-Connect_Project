import { connectDB } from "@/lib/mongodb";
import DepartmentModel from "@/models/department.model";
import Event from "@/models/event.model";
import PostModel from "@/models/post.model";
import User from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";

// 🚀 STATS FETCHING ROUTE
export const GET = asyncHandler(async (req:NextRequest): Promise<NextResponse> => {
  await connectDB();

  // 🔹 Total Counts Fetch karna
  const totalDepartments = await DepartmentModel.countDocuments();
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalAdvisors = await User.countDocuments({role:{
    $in: ["department_Student_Advisor", "university_Student_Advisor"]
  }});
  const totalEvents = await Event.countDocuments();

  // ✅ Response
  return nextResponse(200, "University stats fetched successfully", {
    totalDepartments,
    totalStudents,
    totalAdvisors,
    totalEvents
  });
});