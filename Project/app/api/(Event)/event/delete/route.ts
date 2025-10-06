import { connectDB } from "@/lib/mongodb";
import Event from "@/models/event.model";
import commentModel from "@/models/comment.model";
import likeModel from "@/models/like.model"; // optional if you have likes
import { asyncHandler } from "@/utils/asyncHandler";
import { authOptions } from "@/utils/authOptions.util";
import { nextError, nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
    await connectDB();

    const user = await getServerSession(authOptions);
    if (!user) {
        return nextError(401, "Unauthorized: Please login to delete an event");
    }

    const user_id = user?.user?.id;
    const role = user?.user?.role;

    if (!user_id) {
        return nextError(401, "Unauthorized: User ID not found");
    }

    // Get eventId from URL query
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
        return nextError(400, "Bad Request: Event ID is required");
    }

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
        return nextError(404, "Event not found");
    }

    // Check permissions — only admin or event creator can delete
    if (role !== "admin" && event.user_id.toString() !== user_id.toString()) {
        return nextError(403, "Forbidden: You are not authorized to delete this event");
    }

    // Delete event + related comments and likes concurrently
    await Promise.all([
        Event.findByIdAndDelete(eventId),
        commentModel.deleteMany({ entity_id: eventId, entity_type: "Event" }),
        likeModel.deleteMany({ entity_id: eventId, entity_type: "Event" }),
    ]);

    return nextResponse(200, "Event deleted successfully");
});
