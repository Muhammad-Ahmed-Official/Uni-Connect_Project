import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { safeSet, safeGet } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import { generateOTP } from "@/helpers/generateOTP";
import { sendEmailOTP } from "@/lib/nodemailer";

export const POST = asyncHandler(async (request: NextRequest):Promise<NextResponse> => {
  const { email } = await request.json();
  const redisKey = `otp:${email}`;

  const existingOtp = await safeGet(redisKey);
  if (existingOtp) {
    return nextError(429, "OTP already sent, please wait before requesting again");
  }

  const code = generateOTP();

   const {success,error} = await safeSet(redisKey, code, 60 * 3);

  if (!success) {
    return nextError(500, "Failed to save OTP. Please try again.",error);
  }

  
  try {
    const emailResponse = await sendEmailOTP(email, code);
    if (!emailResponse.success) {
      return nextError(500, emailResponse.message);
    }
    return nextResponse(200, `OTP sent to ${email}`);
  } catch (err) {
    console.log(err)
    return nextError(500, "Internal Server Error");
  }

});
