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




  
    const session = await getServerSession(authOptions);
    if (!session) {
      return nextError(401, "Unauthorized: Please login to view users data");
    }
    const role = session?.user?.role;
    if (role !== "admin") {
      return nextError(403, "Forbidden: You are not allowed to view user data");
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if(!userId){
      return nextError(400, "Bad Request: User ID is required");
    }

    // Fetch user by ID

    const user = await User.findById(userId).select("-password");

    if(!user){
      return nextError(404, "User not found");
    }

    if (user.department_id) {
      const department = await departmentModel.findById(user.department_id).select("departmentName departmentChairman");
      if (department) {
        const users={
          ...user,
          departmentName: department.departmentName,
        }
        return nextResponse(200,"Users fetched successfully",users);
      }
    }

    return nextResponse(200,"Users fetched successfully",user);

});