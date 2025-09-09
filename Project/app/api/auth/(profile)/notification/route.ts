import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const PUT = asyncHandler(async (request:NextRequest):Promise<NextResponse> => {
    const token = await getToken({ req:request });
    if(!token || !token.id) return nextError(401, "Unauthorized: Token not found");

    const { updatesNotificationName } = await request.json(); 
    if (!updatesNotificationName) return nextError(400, "Missing notification field");

    await connectDB();

    const updatedUserNotification = await User.findByIdAndUpdate(
        token.id,
        // $bit version makes it safer and faster at scale convert 1 -> 0 and vise versa
        { $bit: { [`notification_preferences.${updatesNotificationName}`] : { xor: 1 } } }, 
        { new: true },
    );
    if (!updatedUserNotification) return nextError(404, "User not found");

    return nextResponse(200, "Notification  setting updated");
});