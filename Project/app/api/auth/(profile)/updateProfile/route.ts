import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const PUT = asyncHandler(async (request:NextRequest):Promise<NextResponse> => {
    const token = await getToken({ req: request });
    if(!token || !token?.id) return nextError(401, "Unauthorized: Token not found");

    const updates = await request.json(); 

    await connectDB();

    const updatedStudent = await User.findByIdAndUpdate(
        token?.id,
        { $set: updates },
        { new: true, runValidators: true },
    )

    if (!updatedStudent) return nextError(404, "Student not found");

    return nextResponse(200, "Profile updated successfully");
});