import { connectDB } from "@/lib/mongodb";
import departmentModel from "@/models/department.model";
import PostModel from "@/models/post.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { authOptions } from "@/utils/authOptions.util";
import { nextError, nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {

    await connectDB();
    const user = await getServerSession(authOptions);

    if (!user) {
        return nextError(401, "Unauthorized: Please login to create a post");
    }
    const user_id = user?.user?.id;

    if (!user_id) {
        return nextError(401, "Unauthorized: User ID not found");
    }

      // 3️⃣ Get `department` from the URL
    const { searchParams } = new URL(req.url);
    const departmentName = searchParams.get("department");
    console.log("Department Name:", departmentName);

    if (!departmentName) {
        return nextError(400, "Bad Request: Department name is required");
    }

    const department = await departmentModel.findOne({ departmentName }).select("_id");
    if (!department) {
        return nextError(404, "Department not found");
    }

    const post = await PostModel.find({ department_id: department._id }).populate("user_id").select("_id").sort({ createdAt: -1 });

    if (!post || post.length === 0) {
        return nextError(404, "No posts found for this department");
    }


    return nextResponse(201, "Post Fetched successfully",post);

})