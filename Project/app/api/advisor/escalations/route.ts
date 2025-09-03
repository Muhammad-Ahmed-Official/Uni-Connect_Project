import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/utils/authOptions.util"
import { connectDB } from "@/lib/mongodb"
import { z } from "zod"
import { Schema, model, models } from "mongoose"

// Define escalation schema (should match university schema)
const EscalationSchema = new Schema({
  title: String,
  description: String,
  priority: String,
  status: String,
  category: String,
  student_id: { type: Schema.Types.ObjectId, ref: "User" },
  department_id: { type: Schema.Types.ObjectId, ref: "Department" },
  assigned_advisor_id: { type: Schema.Types.ObjectId, ref: "User" },
  university_admin_notes: String,
  resolution: String,
  resolved_at: Date,
  escalated_at: Date,
}, { timestamps: true })

const Escalation = models?.Escalation || model("Escalation", EscalationSchema)

const updateEscalationSchema = z.object({
  escalation_id: z.string().min(1),
  status: z.enum(["In Progress", "Resolved", "Escalated"]),
  resolution: z.string().optional(),
  notes: z.string().optional(),
})

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !["department_Student_Advisor", "University_Student_Advisor"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status") || "In Progress"
    const priority = searchParams.get("priority")
    
    const escalations = await Escalation.find({
      assigned_advisor_id: session.user.id,
      ...(priority && { priority }),
      status
    })
    .populate("student_id", "firstName lastName studentId")
    .populate("department_id", "name")
    .lean()

    return NextResponse.json(escalations)

  } catch (error) {
    console.error("Error fetching advisor escalations:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !["department_Student_Advisor", "University_Student_Advisor"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const parsedBody = updateEscalationSchema.safeParse(body)
    
    if (!parsedBody.success) {
      return NextResponse.json({
        error: "Validation failed",
        details: parsedBody.error.flatten()
      }, { status: 400 })
    }

    await connectDB()

    const escalation = await Escalation.findById(parsedBody.data.escalation_id)
    if (!escalation) {
      return NextResponse.json({ error: "Escalation not found" }, { status: 404 })
    }

    if (escalation.assigned_advisor_id.toString() !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized for this escalation" }, { status: 403 })
    }

    escalation.status = parsedBody.data.status
    escalation.resolution = parsedBody.data.resolution || ""
    if (parsedBody.data.notes) {
      escalation.university_admin_notes = parsedBody.data.notes
    }
    
    if (parsedBody.data.status === "Resolved") {
      escalation.resolved_at = new Date()
    }

    await escalation.save()

    return NextResponse.json({
      message: "Escalation updated successfully",
      escalation
    })

  } catch (error) {
    console.error("Error updating escalation:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
