import { connectDB } from "@/lib/mongodb";
import departmentModel from "@/models/department.model";
import PostModel from "@/models/post.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
    await connectDB();

    const posts = await PostModel.find().populate("user_id", "-password -department_id -isVerified -role -privacy_settings -notification_preferences").sort({ createdAt: -1 });

    console.log("Fetched Posts:", posts);

    if (!posts || posts.length === 0) {
        return nextError(404, "No posts found for this department");
    }

    return nextResponse(201, "Post Fetched successfully", posts);
})