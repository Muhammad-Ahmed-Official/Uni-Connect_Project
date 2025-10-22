import { connectDB } from "@/lib/mongodb";
import { safeGet, safeSet } from "@/lib/redis";
import departmentModel from "@/models/department.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  await connectDB()

  const cacheKey = "departments:sorted";

  // 🔹 1. Try fetching from cache
  const cachedData = await safeGet(cacheKey);
  if (cachedData) {
    console.log("📦 Departments served from cache");
    return nextResponse(200, "Departments fetched successfully (from cache)", JSON.parse(cachedData));
  }

  const { searchParams } = new URL(req.url);
  const sortBy = searchParams.get("sortBy") || "followers"; // 'followers' or 'name'

  const sort = sortBy;

  const departments = await departmentModel.find()
    .sort(sort === "followers" ? { followers_count: -1 } : { departmentName: 1 })
    .lean();

  const { success } = await safeSet(cacheKey, JSON.stringify(departments), 300);
  if (!success) {
    console.warn("⚠️ Failed to set Redis cache for departments");
  }

  return nextResponse(200, "Departments fetched successfully", departments);
});
