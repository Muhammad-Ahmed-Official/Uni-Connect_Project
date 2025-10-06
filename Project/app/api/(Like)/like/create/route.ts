import { connectDB } from "@/lib/mongodb";
import commentModel from "@/models/comment.model";
import Event from "@/models/event.model";
import Like from "@/models/like.model";
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

    const {entityId,entityType,isLiked} = await req.json();
    // console.log("Request Body:", body);
    if (!entityId || !entityType) {
        return nextError(400, "Bad Request: No body found");
    }

    const payload = {
        entity_id: entityId,
        entity_type: entityType,
        user_id: user_id
    }


    if(isLiked){
        const [like] = await Promise.all([
        Like.create(payload),
        entityType === "post" &&
        PostModel.findByIdAndUpdate({entity_id:entityId}, { $inc: { likes_count: 1 } }),
        entityType === "event" &&
        Event.findByIdAndUpdate({entity_id:entityId}, { $inc: { likes_count: 1 } }),
        entityType === "comment" && commentModel.findByIdAndUpdate({entity_id:entityId}, { $inc: { like_count: 1 } }),
    ]);
    if (!like) {
        return nextError(500, "Internal Server Error: like creation failed");
    }
    }else{
        const [like] = await Promise.all([
            Like.findOneAndDelete(payload),
            entityType === "post" &&
            PostModel.findByIdAndUpdate({entity_id:entityId}, { $inc: { likes_count: -1 } }),
            entityType === "event" &&
            Event.findByIdAndUpdate({entity_id:entityId}, { $inc: { likes_count: -1 } }),
            entityType === "comment" && commentModel.findByIdAndUpdate({entity_id:entityId}, { $inc: { like_count: -1 } }),
        ]);
        if (!like) {
        return nextError(500, "Internal Server Error: like creation failed");
    }
    }

    return nextResponse(201, "like done successfully");
});