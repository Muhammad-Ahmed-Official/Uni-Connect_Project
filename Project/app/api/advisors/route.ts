import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getOrSetCache, clearCache } from "@/lib/redis"
import { connectDB } from "@/lib/mongodb"
import { AdvisorEntity } from "@/lib/db"
import Advisor from "@/schemas/advisor.schema"

const schema = z.object({ name: z.string().min(1), email: z.string().email().optional(), departmentId: z.string().optional() })

export async function GET() {
    const items = await getOrSetCache<AdvisorEntity[]>(
        "advisors:all", 600,
        async () => {
            await connectDB();
            const advisors = await Advisor.find().sort({ name: 1 }).lean();
            return advisors.map((advisor) => ({
                _id: advisor._id,
                name: advisor.name,
                email: advisor.email,
                departmentId: advisor.departmentId,
            })) as AdvisorEntity[]
        }
    )
    return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

    await connectDB();
    const advisor = new Advisor(parsed.data)
    await advisor.save()
    await clearCache(["advisors:all"])
    return NextResponse.json({ ok: true })
}


