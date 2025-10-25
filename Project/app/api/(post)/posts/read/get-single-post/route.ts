import { connectDB } from "@/lib/mongodb";
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

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
        return nextError(400, "Bad Request: Post ID is required");
    }

    const post = await PostModel.findById(postId).populate("user_id").select("-password");

    if (!post) {
        return nextResponse(404, "Post not found", null, false);
    }


    return nextResponse(200, "Single Post Fetched successfully", post);

})