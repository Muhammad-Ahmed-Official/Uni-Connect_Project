import { connectDB } from "@/lib/mongodb";
import departmentModel from "@/models/department.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";
import {  redisDeleteKey } from "@/lib/redis";

export const DELETE = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("departmentId");
  if (!id) {
    return nextError(400, "Department ID is required");
  }

  // 🔹 Delete department from MongoDB
  const deleted = await departmentModel.findByIdAndDelete(id);

  if (!deleted) {
    return nextError(404, "Department not found");
  }

  await redisDeleteKey("departments:sorted");

  return nextResponse(200, "Department deleted successfully", deleted);
});
