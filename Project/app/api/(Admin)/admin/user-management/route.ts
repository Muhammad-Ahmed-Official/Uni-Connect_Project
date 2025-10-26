import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions.util";
import departmentModel from "@/models/department.model";

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  await connectDB();

  // 🔹 Authenticate user
  const session = await getServerSession(authOptions);
  if (!session) {
    return nextError(401, "Unauthorized: Please login to view users data");
  }

  // 🔹 Role-based Access Control
  const role = session?.user?.role;
  if (!["admin", "department_Student_Advisor", "university_Student_Advisor"].includes(role)) {
    return nextError(403, "Forbidden: You are not allowed to view users list");
  }

  // 🔹 Extract query params
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  // 🔹 Filter base: exclude admin
  const filter: any = {
    role: { $in: ["student", "department_Student_Advisor", "admin"] },
  };


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

  // 🔹 Fetch users
  const users = await User.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    // .limit(limit)
    .select("-password -isVerified -notification_preferences -social_links -privacy_settings -bio -year")
    .lean();

      const departments = await departmentModel.find({
    _id: { $in: users.map((user) => user.department_id).filter(Boolean) },
  }).select("departmentName").lean();

  // 🔹 Create a quick lookup map { departmentId: departmentName }
  const departmentMap = departments.reduce((acc: any, dep: any) => {
    const id = dep._id ? String(dep._id) : "";
    acc[id] = dep.departmentName;
    return acc;
  }, {} as Record<string, string>);

  // 🔹 Merge department names into users
  const formattedUsers = users.map((user) => ({
    ...user,
    departmentName: departmentMap[user.department_id?.toString()] || null,
    department_id: undefined, // optional: remove raw ID
  }));


  // 🔹 Count total for pagination
  const totalUsers = await User.countDocuments(filter);

  return nextResponse(200, "Users fetched successfully", {
  totalUsers: totalUsers,
  currentPage: page,
  totalPages: Math.ceil(totalUsers / limit),
  users: formattedUsers,  // <-- Use the formatted users
});
});



export const DELETE = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  await connectDB()

  // 🔹 Authenticate user
  const session = await getServerSession(authOptions);
  if (!session) {
    return nextError(401, "Unauthorized: Please login to delete users");
  }
  // 🔹 Role-based Access Control
  const role = session?.user?.role;
  if (role !== "admin") {
    return nextError(403, "Forbidden: You are not allowed to delete users");
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return nextError(400, "Bad Request: No user ID provided for deletion");
  }

  // 🔹 Delete user

  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    return nextError(404, "User not found or already deleted");
  }

    // ✅ Response
    return nextResponse(200, "User deleted successfully");
  });
