import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/utils/authOptions.util"
import { connectDB } from "@/lib/mongodb"
import { z } from "zod"

// Import models
import { Schema, model, models } from "mongoose"

// Define escalation schema if not exists
const EscalationSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
  status: { type: String, enum: ["New", "In Progress", "Resolved", "Escalated"], default: "New" },
  category: { type: String, required: true },
  student_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  department_id: { type: Schema.Types.ObjectId, ref: "Department", required: true },
  assigned_advisor_id: { type: Schema.Types.ObjectId, ref: "User" },
  university_admin_notes: { type: String },
  resolution: { type: String },
  resolved_at: { type: Date },
  escalated_at: { type: Date },
}, { timestamps: true })

const Escalation = models?.Escalation || model("Escalation", EscalationSchema)

const assignEscalationSchema = z.object({
  escalation_id: z.string().min(1, "Escalation ID is required"),
  advisor_id: z.string().min(1, "Advisor ID is required"),
  notes: z.string().optional(),
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
    const status = searchParams.get("status")
    const priority = searchParams.get("priority")
    const department = searchParams.get("department")
    const skip = (page - 1) * limit

    // Build filter query
    const filter: any = {}
    if (status) filter.status = status
    if (priority) filter.priority = priority
    if (department) filter.department_id = department

    const escalations = await Escalation.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("student_id", "firstName lastName studentId")
      .populate("department_id", "name")
      .populate("assigned_advisor_id", "firstName lastName")
      .lean()

    const total = await Escalation.countDocuments(filter)

    // Get statistics
    const stats = await Escalation.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ])

    const priorityStats = await Escalation.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 }
        }
      }
    ])

    return NextResponse.json({
      escalations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: {
        byStatus: stats,
        byPriority: priorityStats
      }
    })
  } catch (error) {
    console.error("Error fetching university escalations:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - University access required" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const parsedBody = assignEscalationSchema.safeParse(body)

    if (!parsedBody.success) {
      return NextResponse.json({
        error: "Validation failed",
        details: parsedBody.error.flatten()
      }, { status: 400 })
    }

    await connectDB()

    const { escalation_id, advisor_id, notes } = parsedBody.data

    const escalation = await Escalation.findById(escalation_id)
    if (!escalation) {
      return NextResponse.json(
        { error: "Escalation not found" },
        { status: 404 }
      )
    }

    // Update escalation with assigned advisor
    escalation.assigned_advisor_id = advisor_id
    escalation.status = "In Progress"
    escalation.university_admin_notes = notes || ""
    escalation.escalated_at = new Date()

    await escalation.save()

    return NextResponse.json({
      message: "Escalation assigned successfully",
      escalation
    })

  } catch (error) {
    console.error("Error assigning escalation:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
