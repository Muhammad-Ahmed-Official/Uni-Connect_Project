import { UserEntity } from "@/lib/db";
import { connectDB } from "@/lib/mongodb";
import { clearCache, getOrSetCache } from "@/lib/redis";
import User from "@/schemas/user.schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createUserSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    department: z.string().optional(),
    studentId: z.string().optional(),
})

export async function GET() {
    const users = await getOrSetCache<UserEntity[]>(
        "users:all",
        60,
        async () => {
            await connectDB();
            const docs = await User.find({}, { password: 0 }).sort({ createdAt: -1 }).lean();

            return docs.map(doc => ({
                _id: doc._id,
                firstName: doc.firstName,
                lastName: doc.lastName,
                email: doc.email,
                department: doc.department,
                studentId: doc.studentId,
                role: doc.role,
                createdAt: doc.createdAt,
                updatedAt: doc.updatedAt,
            })) as UserEntity[];
        }
    )

    return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsedBody = createUserSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: parsedBody.error.flatten()
            }, { status: 400 })
        }


        const { firstName, lastName, email, password, department, studentId } = parsedBody.data;
        await connectDB();
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }
        const passwordHash = await hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            department,
            studentId,
            role: "user",
        })

        await newUser.save();
        await clearCache(["users:all"]);
        return NextResponse.json({
            message: "User created successfully",
        }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors.map(e => e.message) },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}