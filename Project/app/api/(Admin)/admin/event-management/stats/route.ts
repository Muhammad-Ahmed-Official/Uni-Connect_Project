import { connectDB } from "@/lib/mongodb";
import DepartmentModel from "@/models/department.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions.util";
import User from "@/models/user.model";
import Event from "@/models/event.model";
import Like from "@/models/like.model";
import commentModel from "@/models/comment.model";

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
    await connectDB();
    const totalEvents = await Event.countDocuments();
    const eventIds = await Event.find().distinct("_id")
    const totalLikes = await Like.countDocuments({
        entity_id: { $in: eventIds },
        entity_type: "event"
    });

    const totalComments = await commentModel.countDocuments({
        entity_id: { $in: eventIds },
        entity_type: "event"
    });
    return nextResponse(200, "Event Fetched Succesfully",{
        totalEvents,
        totalLikes,
        totalComments
    });
});