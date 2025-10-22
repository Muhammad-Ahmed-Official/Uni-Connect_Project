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

    // const user = await getServerSession(authOptions);

    // if (!user) {
    //     return nextError(401, "Unauthorized: Please login to create a post");
    // }

    // const user_id = user?.user?.id;
    // if (!user_id) {
    //     return nextError(401, "Unauthorized: User ID not found");
    // }

    // if (!body) {
    //     return nextError(400, "Bad Request: No body found");
    // }

    // const result = await postSchema.safeParseAsync(body);
    // if (!result.success) {
    //     const error = result.error.format();
    //     const firstError = Object.values(error).find((err: any) => err?._errors?.length);
    //     const errorMessage = firstError && Array.isArray((firstError as any)._errors)
    //         ? (firstError as any)._errors[0]
    //         : "Invalid request data";
    //     return nextError(400, errorMessage as string);
    // }

    // const department_id = user?.user?.department_id as any;
    // if (!department_id) {
    //     return nextError(404, "Department not found");
    // }

    // const postData = {
    //     ...result.data,
    //     department_id,
    //     user_id,
    // }

    const post = await PostModel.create(body);
    if (!post) {
        return nextError(500, "Failed to create post");
    }

    return nextResponse(201, "Post created successfully", post);
});