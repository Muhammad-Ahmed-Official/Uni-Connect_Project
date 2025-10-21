import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions.util";
import Event from "@/models/event.model";

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  await connectDB();

  // 🔹 Authenticate user
  const session = await getServerSession(authOptions);
  if (!session) {
    return nextError(401, "Unauthorized: Please login to view students data");
  }

  // 🔹 Role-based Access
  const role = session?.user?.role;
  if (!["admin", "department_Student_Advisor", "university_Student_Advisor"].includes(role)) {
    return nextError(403, "Forbidden: You are not allowed to view students list");
  }

     // 🔹 Aggregations
  const [
    totalUsers,
    totalStudents,
    totalAdvisors,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: "student" }),
    User.countDocuments({role:{ $in: ["department_Student_Advisor", "university_Student_Advisor"] }}),
  ]);


  return nextResponse(200, "Students fetched successfully",
    {
    totalUsers,
    totalStudents,
    totalAdvisors,
  }
  )
});
