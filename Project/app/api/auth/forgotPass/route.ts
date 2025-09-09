import { connectDB } from "@/lib/mongodb";
import { sendEmailLink } from "@/lib/nodemailer";
import User from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (request:NextRequest):Promise<NextResponse> => {
    const { email } = await request.json();
    if(!email) return nextError(400, 'Missing Email fields');

    await connectDB();

    const user = await User.findOne({email}).select("isVerified");
    if(!user) return nextError(404, "User nor found");

    if(!user?.isVerified) return nextError(200, "Plz verify your account first");
    const resetLink = `${process.env.ALLOWED_ORIGIN}/change-pass/${user?._id}`;
    sendEmailLink(email, resetLink, "Reset Password");

    return nextResponse(200, "Link send successfully");
})