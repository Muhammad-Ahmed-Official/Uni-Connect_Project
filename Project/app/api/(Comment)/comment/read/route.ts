import { buildCommentTree } from "@/helpers/buildCommentTree";
import { connectDB } from "@/lib/mongodb";
import commentModel from "@/models/comment.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { authOptions } from "@/utils/authOptions.util";
import { nextError, nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {

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


    const { searchParams } = new URL(req.url);

  const entityId = searchParams.get("entityId");
  // console.log("id of comment",id)


  if (!entityId) {
    return nextError(400, "reuired fields missing");
  };

  if (!entityId) {
    return nextError(400, "Entity is Missing");
  };

  const comments = await commentModel.find({ entity_id:entityId }).sort({ createdAt: -1 }).populate('user_id',"firstName lastName profilePic");
  console.log("comments",comments)

  if (!comments) {
    return nextError(400, "Error in getting Comments");
  }


  const tree = buildCommentTree(comments);


    return nextResponse(201, "Comment Fetched successfully",tree);
});