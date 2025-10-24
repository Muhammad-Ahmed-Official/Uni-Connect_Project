import { connectDB } from "@/lib/mongodb";
import departmentModel from "@/models/department.model";
import PostModel from "@/models/post.model";
import { postSchema } from "@/schemas/post.schema";
import { asyncHandler } from "@/utils/asyncHandler";
import { authOptions } from "@/utils/authOptions.util";
import { nextError, nextResponse } from "@/utils/Response";
import { de } from "date-fns/locale";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
    const body = await req.json();

    await connectDB();

    const post = await PostModel.create(body);
    if (!post) {
        return nextError(500, "Failed to create post");
    }

    return nextResponse(201, "Post created successfully", post);
});