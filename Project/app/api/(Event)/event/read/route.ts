import { connectDB } from "@/lib/mongodb";
import Event from "@/models/event.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  await connectDB();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let events = await Event.find({
    "eventDetails.start_date": { $gte: today }
  })
    .populate("department_id", "departmentName")
    .sort({ "eventDetails.start_date": 1 })
    .lean();

  if (!events || events.length === 0) {
    return nextError(404, "No upcoming events found");
  }

  return nextResponse(200, "Upcoming events fetched successfully", events);
});
