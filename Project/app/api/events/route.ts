import { EventEntity } from "@/lib/db";
import { connectDB } from "@/lib/mongodb";
import { clearCache, getOrSetCache } from "@/lib/redis";
import Event from "@/schemas/event.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
    title: z.string().min(1, "Title is required!"),
    description: z.string().optional(),
    date: z.string().min(1),
    location: z.string().optional(),
    departmentId: z.string().optional(),
})

export async function GET() {
    const items = await getOrSetCache<EventEntity[]>(
        "events:all", 120, async () => {
            await connectDB();

            const events = await Event.find().sort({ date: -1 }).lean();
            return events.map((event) => ({
                _id: event._id,
                title: event.title,
                description: event.description,
                date: event.date,
                location: event.location,
                departmentId: event.departmentId,
            })) as EventEntity[];
        }
    )

    return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

    await connectDB();
    const event = new Event(parsed.data);
    await event.save();
    await clearCache(["events:all"]);
    return NextResponse.json({
        message: "Event created successfully!"
    }, { status: 200 })

}