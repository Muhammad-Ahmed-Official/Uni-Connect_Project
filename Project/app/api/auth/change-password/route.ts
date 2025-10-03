import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";
import { redisDeleteKey, safeGet } from "@/lib/redis";
import bcrypt from "bcryptjs";

export const PUT = asyncHandler(async (request: NextRequest): Promise<NextResponse> => {
    const { resetToken, newPassword } = await request.json();
    console.log("resetToken ==>", resetToken);
    console.log("newPassword ==>", newPassword);

    if (!resetToken || !newPassword) return nextError(400, "Missing fields");

    await connectDB();

    const userId = await safeGet(`reset:${resetToken}`) as string;

    if (!userId) {
        return nextError(400, "Invalid token or token has expired");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const user = await User.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true, runValidators: false } // Skip validation for other fields
    );

    if (!user) return nextError(404, "User not found");

    await redisDeleteKey(`reset:${resetToken}`);

    return nextResponse(200, "Password updated successfully");
});