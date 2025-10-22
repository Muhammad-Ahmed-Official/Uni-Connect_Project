import User from "@/models/user.model";
import { nextError, nextResponse } from "@/utils/Response";
import { asyncHandler } from "@/utils/asyncHandler";
import { connectDB } from "@/lib/mongodb";
import { z } from 'zod'
import { NextRequest, NextResponse } from "next/server";
import { usernameQuerySchema } from "@/schemas/register.schema";

const usernameValidation = z.object({
    username: usernameQuerySchema
})

export const POST = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {

    const { username } =  await req.json();

    if (!username) {
        return nextError(400, "Please Enter a username");
    }

    const result = usernameValidation.safeParse({username});
    if (!result.success) {
        const error = result.error.format().username?._errors[0]  || "Invalid username";
        // console.log(error)
        return nextError(400, error as string);
    }
    await connectDB();
    const existingUsername = await User.findOne({ username, isVerified: true });
    if (existingUsername) {
        return nextError(409, "username already exist")
    }
    return nextResponse(200, "username is unique");
})