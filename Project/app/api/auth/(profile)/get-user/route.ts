import User from "@/models/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
    const token = await getToken({ req });
    if (!token?.id) return nextError(401, "Unauthorized");
    const user = await User.findById(token.id).select("-password");
    if (!user) return nextError(404, "User not found");
    return nextResponse(200, "User fetched successfully", user);
});