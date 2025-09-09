import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { profileUpdateSchema } from "@/schemas/userProfileUpdates";

export const PUT = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  const token = await getToken({ req });
  if (!token?.id) return nextError(401, "Unauthorized");

  const body = await req.json();

  // validate with Zod
  const result = profileUpdateSchema.safeParse(body);
  if (!result.success) {
    return nextError(400, result.error.issues[0].message)|| "Invalid Fields!";
  }

  await connectDB();

  const updatedUser = await User.findByIdAndUpdate(
    token?.id,
    { $set: result?.data },
    { new: true, runValidators: true }
  );

  if (!updatedUser) return nextError(404, "User not found");

  return nextResponse(200, "Profile updated successfully");
});
