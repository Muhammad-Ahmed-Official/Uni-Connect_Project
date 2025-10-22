import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const PUT = asyncHandler(async (request: NextRequest): Promise<NextResponse> => {
    const { userId, newPassword } = await request.json();

    await connectDB();

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const user = await User.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true, runValidators: false }
    );

    if (!user) return nextError(404, "User not found");

    return nextResponse(200, "Password updated successfully");
});