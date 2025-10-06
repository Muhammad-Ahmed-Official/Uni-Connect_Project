import { connectDB } from "@/lib/mongodb";
import Event from "@/models/event.model";
import { postSchema } from "@/schemas/post.schema";
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

    const result = postSchema.safeParse(body);
    if (!result.success) {
        console.log("Validation Errors:", result.error.errors);
        const firstError = result.error.errors[0];
        return nextError(400, `Validation Error: ${firstError.message}`);
    }

     const department_id =user?.user?.department_id as any;
            if (!department_id) {
                return nextError(404, "Department not found");
            }

    const payload = {
        ...result.data,
        user_id: user_id,
        department_id,
    }

    const event = await Event.create(payload);
    if (!event) {
        return nextError(500, "Internal Server Error: Failed to create event");
    }

    return nextResponse(201, "Comment created successfully",event);
});