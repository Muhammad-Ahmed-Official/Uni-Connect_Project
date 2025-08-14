import { DepartmentEntity } from "@/lib/db";
import { connectDB } from "@/lib/mongodb";
import { clearCache, getOrSetCache } from "@/lib/redis";
import Department from "@/schemas/department.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional()
})

export async function GET() {
    const items = await getOrSetCache<DepartmentEntity[]>("departments:all", 300, async () => {
        await connectDB();

        // return await Department.find().sort({ name: 1 }).lean()
        return await Department.find()
    })

    return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
    );

    await connectDB();
    const department = new Department(parsed.data);
    await department.save();
    await clearCache(["departments:all"])
    return NextResponse.json({ ok: true });
}