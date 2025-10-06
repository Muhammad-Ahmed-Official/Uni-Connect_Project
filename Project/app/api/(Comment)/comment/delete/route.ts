import { connectDB } from "@/lib/mongodb";
import commentModel from "@/models/comment.model";
import departmentModel from "@/models/department.model";
import Event from "@/models/event.model";
import PostModel from "@/models/post.model";
import { postSchema } from "@/schemas/post.schema";
import { asyncHandler } from "@/utils/asyncHandler";
import { authOptions } from "@/utils/authOptions.util";
import { nextError, nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {

    await connectDB();

    const user = await getServerSession(authOptions);
    // console.log("User Session:", user);

    if (!user) {
        return nextError(401, "Unauthorized: Please login to create a post");
    }

    const user_id = user?.user?.id;

    if (!user_id) {
        return nextError(401, "Unauthorized: User ID not found");
    }

    const {commentId} = await req.json();
    console.log("Request Body:", commentId);
    if (!commentId) {
        return nextError(400, "Bad Request: No body found");
    }

    const comment = await commentModel.findById(commentId);

    if(!comment)
    {
        return nextError(400, "Comment not found");
    }

    if (user?.user?.role !== "admin" && comment?.user_id.toString() !== user_id.toString()) {
            return nextError(403, "Forbidden: You are not authorized to delete this comment");
        }

    await commentModel.findByIdAndDelete(commentId);

    return nextResponse(201, "Comment Delete successfully");
});