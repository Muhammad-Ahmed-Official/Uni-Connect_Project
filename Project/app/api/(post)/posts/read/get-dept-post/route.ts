import { connectDB } from "@/lib/mongodb";
import departmentModel from "@/models/department.model";
import PostModel from "@/models/post.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
    const params = new URL(req.url).searchParams;
    const departmentId = params.get("departmentId");

    if (!departmentId) {
        return nextError(400, "Bad Request: Department ID is required");
    }

    await connectDB();
    
    const department = await departmentModel.findById(departmentId);
    if (!department) {
        return nextError(404, "Department not found");
    }

    const posts = await PostModel.find({ department_id: department._id }).populate("user_id", "-password -department_id -isVerified -role -privacy_settings -notification_preferences").sort({ createdAt: -1 });

    if (!posts || posts.length === 0) {
        return nextError(404, "No posts found for this department");
    }

    return nextResponse(201, "Post Fetched successfully", { posts, department });
})