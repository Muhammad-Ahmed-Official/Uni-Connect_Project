import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/utils/authOptions.util"
import { connectDB } from "@/lib/mongodb"
import { z } from "zod"

// Import the Event model correctly - it's not a default export
import { Schema, model, models } from "mongoose"
import { IEvent } from "@/types/event"

// Get the Event model (it's defined in the event.model.ts file)
const Event = models?.Event || model<IEvent>("Event", new Schema({}))

const createEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  location: z.string().min(1, "Location is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  note: z.string().optional(),
  tags: z.array(z.string()).default([]),
  image: z.string().optional(),
  department_id: z.string().optional(),
})

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - University access required" },
        { status: 401 }
      )
    }

    await connectDB()
    
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Get university-wide events (events without department_id or with specific university flag)
    const events = await Event.find({
      $or: [
        { department_id: { $exists: false } },
        { department_id: null }
      ]
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user_id", "firstName lastName")
      .populate("department_id", "name")
      .lean()

    const total = await Event.countDocuments({
      $or: [
        { department_id: { $exists: false } },
        { department_id: null }
      ]
    })

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching university events:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - University access required" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const parsedBody = createEventSchema.safeParse(body)

    if (!parsedBody.success) {
      return NextResponse.json({
        error: "Validation failed",
        details: parsedBody.error.flatten()
      }, { status: 400 })
    }

    await connectDB()

    const { location, start_date, end_date, note, ...eventData } = parsedBody.data

    const newEvent = new Event({
      ...eventData,
      user_id: session.user.id,
      eventDetails: {
        location,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        note: note || ""
      },
      // University-wide events don't have department_id
      department_id: null
    })

    await newEvent.save()

    return NextResponse.json({
      message: "University event created successfully",
      event: newEvent
    }, { status: 201 })

  } catch (error) {
    console.error("Error creating university event:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
