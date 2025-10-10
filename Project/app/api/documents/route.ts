import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getOrSetCache, clearCache } from "@/lib/redis"
import { DocumentEntity } from "@/lib/db"
import { connectDB } from "@/lib/mongodb"
import { DocumentSchema } from "@/models/document.schema"

const schema = z.object({
    title: z.string().min(1),
    url: z.string().url(),
    type: z.string().optional(),
    departmentId: z.string().optional(),
})

export async function GET() {
    const items = await getOrSetCache<DocumentEntity[]>("documents:all", 300, async () => {
        await connectDB();
        
        const documents = await DocumentSchema.find().sort({ createdAt: -1 }).lean();

        return documents.map((docuemnt) => ({
            title: docuemnt.title,
            url: docuemnt.url,
            type: docuemnt.type,
            departmentId: docuemnt.departmentId,
            _id: docuemnt._id,
            uploadedByUserId: docuemnt.uploadedByUserId,
        })) as DocumentEntity[];
    })
    return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

    await connectDB();
    const document = new DocumentSchema(parsed.data)
    await document.save()
    await clearCache(["documents:all"])
    return NextResponse.json({ ok: true })
}


