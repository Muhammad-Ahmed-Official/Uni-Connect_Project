import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions.util";

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

  // 🔹 Extract query params
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const departmentId = searchParams.get("department") || "";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  // 🔹 Filter: only students
  const filter: any = { role: "student" };

  // Department filter
  if (departmentId && departmentId !== "All") {
    filter.department_id = departmentId;
  }

  // Search filter (by name, email, or studentId)
  if (search) {
    filter.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { studentId: { $regex: search, $options: "i" } },
    ];
  }

  // 🔹 Pagination setup
  const skip = (page - 1) * limit;

  // 🔹 Fetch students
  const students = await User.find(filter)
    .populate("department_id", "departmentName") // optional populate
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .select("-password")
    .lean();

  // 🔹 Count total students for pagination
  const totalStudents = await User.countDocuments(filter);

  // ✅ Response
  return nextResponse(200, "Students fetched successfully", {
    total: totalStudents,
    count: students.length,
    currentPage: page,
    totalPages: Math.ceil(totalStudents / limit),
    students,
  });
});
