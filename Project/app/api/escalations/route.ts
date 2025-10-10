// import { NextRequest, NextResponse } from "next/server"
// import { z } from "zod"
// import { getOrSetCache, clearCache } from "@/lib/redis"
// import { connectDB } from "@/lib/mongodb"
// import { EscalationEntity } from "@/lib/db"
// // import Escalation from "@/schemas/escalation.schema"   ERRRO FIX Model required 

// const schema = z.object({
//     title: z.string().min(1),
//     description: z.string().optional(),
//     status: z.enum(["open", "in_progress", "resolved"]).default("open"),
//     createdByUserId: z.string().optional(),
// })

// export async function GET() {
//     const items = await getOrSetCache<EscalationEntity[]>(
//         "escalations:all", 60,
//         async () => {
//             await connectDB()

//             const escalations = await Escalation.find().sort({ createdAt: -1 }).lean();
//             return escalations.map((escalation) => ({
//                 _id: escalation._id,
//                 title: escalation.title,
//                 description: escalation.description,
//                 status: escalation.status,
//                 createdByUserId: escalation.createdByUserId
//             })) as EscalationEntity[]
//         }
//     )
//     return NextResponse.json(items)
// }

// export async function POST(req: NextRequest) {
//     const body = await req.json()
//     const parsed = schema.safeParse(body)
//     if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

//     await connectDB()
//     const escalation = new Escalation(parsed.data)
//     await escalation.save()
//     await clearCache(["escalations:all"])
//     return NextResponse.json({ ok: true })
// }