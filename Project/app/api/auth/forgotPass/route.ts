import { connectDB } from "@/lib/mongodb";
import { sendEmailLink } from "@/lib/nodemailer";
import User from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { safeSet } from "@/lib/redis"; 

export const POST = asyncHandler(async (request:NextRequest):Promise<NextResponse> => {
  const { email } = await request.json();
  if(!email) return nextError(400, 'Missing Email field');

  await connectDB();

  const user = await User.findOne({ email }).select("isVerified");
  if(!user) return nextError(404, "User not found");

  if(!user.isVerified) return nextError(403, "Please verify your account first");

  const resetToken = crypto.randomBytes(32).toString("hex");
  const {success,error} = await safeSet(`reset:${resetToken}`, user._id.toString(), 60 * 10); 

  if (!success) {
      return nextError(500, "Failed. Please try again.",error);
    }

  const resetLink = `${process.env.ALLOWED_ORIGIN}/change-pass?reset-token=${resetToken}`;

   try {
      const emailResponse = await sendEmailLink(email, resetLink, "Reset Password");
      if (!emailResponse.success) {
        return nextError(500, emailResponse.message);
      }
      return nextResponse(200, `email sent to ${email}`);
    } catch (err) {
      console.log(err)
      return nextError(500, "Internal Server Error");
    }
});
