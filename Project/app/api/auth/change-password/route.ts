import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";
import { redisDeleteKey, safeGet } from "@/lib/redis";

export const PUT = asyncHandler(async (request: NextRequest): Promise<NextResponse> => {
    const { token, password } = await request.json();
    if (!token || !password) return nextError(400, "Missing fields");

    await connectDB();

    const userId = await safeGet(`reset:${token}`);

    if (!userId) {
        return nextError(400, "Invalid user or password change time is finish");
    }
    await redisDeleteKey(`reset:${token}`);

    const user = await User.findById(userId);
    if (!user) return nextError(404, "User not found");

    user.password = password;

    await user.save();
    return nextResponse(200, "Password updated successfully");
});
