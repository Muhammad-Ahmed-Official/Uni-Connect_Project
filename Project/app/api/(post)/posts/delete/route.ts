import { connectDB } from "@/lib/mongodb";
import commentModel from "@/models/comment.model";
import departmentModel from "@/models/department.model";
import Like from "@/models/like.model";
import PostModel from "@/models/post.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { authOptions } from "@/utils/authOptions.util";
import { nextError, nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {

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
    const postId = searchParams.get("postId");
    console.log("Post ID:", postId);
    if (!postId) {
        return nextError(400, "Bad Request: Post ID is required");
    }
    const post = await PostModel.findById(postId);
    if (!post) {
        return nextError(404, "Post not found");
    }

    if (user?.user?.role !== "admin" && post.user_id.toString() !== user_id.toString()) {
        return nextError(403, "Forbidden: You are not authorized to delete this post");
    }

    // 🔹 Delete the post and related data in parallel
    await Promise.all([
        PostModel.findByIdAndDelete(post._id),
        commentModel.deleteMany({ entity_id:post._id }),
        Like.deleteMany({ entity_id:post._id }),
    ]);

    return nextResponse(200, "Post and related data deleted successfully");

})