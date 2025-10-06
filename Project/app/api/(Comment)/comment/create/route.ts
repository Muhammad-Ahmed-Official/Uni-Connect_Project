import { connectDB } from "@/lib/mongodb";
import commentModel from "@/models/comment.model";
import Event from "@/models/event.model";
import PostModel from "@/models/post.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { authOptions } from "@/utils/authOptions.util";
import { nextError, nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {

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

    const body = await req.json();
    console.log("Request Body:", body);
    if (!body) {
        return nextError(400, "Bad Request: No body found");
    }

    const payload = {
        entity_id: body.entityId,
        entity_type: body.entityType,
        content: body.content,
        parentCommentId: body.parentCommentId || null,
        user_id: user_id
    }


    const [comment] = await Promise.all([
        commentModel.create(payload),
        body.entity_type === "post" &&
        PostModel.findByIdAndUpdate(body.entity_id, { $inc: { comment_count: 1 } }),
        body.entity_type === "event" &&
        Event.findByIdAndUpdate(body.entity_id, { $inc: { comments_count: 1 } }),
    ]);

    if (!comment) {
        return nextError(500, "Internal Server Error: Comment creation failed");
    }


    return nextResponse(201, "Comment created successfully");
});