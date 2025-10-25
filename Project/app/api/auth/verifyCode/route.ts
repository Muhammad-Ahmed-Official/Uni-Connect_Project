import { redisDeleteKey, safeGet } from "@/lib/redis";
import User from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (request: NextRequest): Promise<NextResponse> => {
  const { email, code } = await request.json();
  const redisKey = `otp:${email}`;

  const data = await safeGet(redisKey);

  if (!data) {
    return nextError(400, "Verification code not found or expired");
  }

  

  const isCodeValid = data === code.toString();

  if (isCodeValid) {
    await redisDeleteKey(redisKey);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    if (!updatedUser) {
      return nextError(404, "User not found");
    }

    return nextResponse(201, "You registered successfully");
  } else {
    return nextError(400, "Incorrect Verification code");
  }
});
