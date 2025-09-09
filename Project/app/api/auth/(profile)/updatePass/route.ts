import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import bcrypt from "bcryptjs";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const PUT = asyncHandler(async (request: NextRequest): Promise<NextResponse> => {
    const token = await getToken({ req: request });
    if (!token || !token.id) return nextError(401, "Unauthorized: Token not found");

    const { oldPassword, newPassword, confirmNewPassword } = await request.json();
    if (!oldPassword || !newPassword || !confirmNewPassword) return nextError(400, "Missing field");

    if (newPassword !== confirmNewPassword) return nextError(400, "Updated Password not match");

    await connectDB();

    const currentUser = await User.findById(token?.id);
    if (!currentUser) return nextError(400, "User not found");

    const isPasswordCorrect = await bcrypt.compare(oldPassword, currentUser?.Password);
    if (!isPasswordCorrect) return nextError(400, "Incorrect Password");

    currentUser.password = confirmNewPassword;
    await currentUser.save();

    return nextResponse(200, "Password updated successfully");
});