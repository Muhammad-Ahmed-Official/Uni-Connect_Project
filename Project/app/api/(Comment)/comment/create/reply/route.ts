import { buildCommentTree } from "@/helpers/buildCommentTree";
import { connectDB } from "@/lib/mongodb";
import commentModel from "@/models/comment.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { authOptions } from "@/utils/authOptions.util";
import { nextError, nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {

    await connectDB();

    const session = await getServerSession(authOptions);
  
      if (!session) {
          return nextError(401, "Please Login first!")
      }
  const { content, entityId, parentCommentId,entityType } = await req.json();

  if (!content || !entityId || !parentCommentId || !entityType) {
    return nextError(400,"Missing requied fields!");
  }''

  const reply = await commentModel.create({
    content,
    entity_id:entityId,
    parentCommentId, 
    entity_type:entityType,
    user_id:session.user.id
  });

  return nextResponse(200,"Reply added",reply);

});