import { connectDB } from "@/lib/mongodb";
import Event from "@/models/event.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";
import DocumentSchema from "@/models/document.schema";
import PostModel from "@/models/post.model";
import { IPost } from "@/types/post";
import { IEvent } from "@/types/event";

// 🧠 Utility to format unified activity object
const formatActivity = (type: string, title: string, createdAt: Date, description?: string) => ({
    type,
    title,
    time: createdAt,
    description,
});

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
    await connectDB();

    // 🔹 Fetch recent records (sorted by time)
    const [posts, recentDocuments, recentEvents] = await Promise.all([
        PostModel?.find().sort({ createdAt: -1 }).limit(3),
        DocumentSchema?.find().sort({ createdAt: -1 }).limit(3),
        Event?.find().sort({ createdAt: -1 }).limit(3),
    ]);

    // 🔹 Format all activities into one list
    const activities = [
        ...posts.map((p: IPost) => formatActivity("post", `New post created: ${p.title}`, p.createdAt ?? new Date(0), p.content)),
        ...recentDocuments.map((d: any) =>
            formatActivity("document", `New Document uploaded: ${d.title}`, d.createdAt)
        ),
        ...recentEvents.map((e: IEvent) =>
            formatActivity("event", `New Event created: ${e.title}`, e.createdAt ?? new Date(0), e.content)
        ),
    ];

    activities.sort((a, b) => b?.time?.getTime() - a?.time?.getTime());

    const latestActivities = activities.slice(0, 5);

    return nextResponse(200, "Recent activity fetched successfully", latestActivities);
});
