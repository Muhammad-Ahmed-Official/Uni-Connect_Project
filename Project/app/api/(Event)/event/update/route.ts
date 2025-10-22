import { connectDB } from "@/lib/mongodb";
import Event from "@/models/event.model";
import { eventSchema } from "@/schemas/event.schema";
import { asyncHandler } from "@/utils/asyncHandler";
import { authOptions } from "@/utils/authOptions.util";
import { nextError, nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PUT = asyncHandler(async (req:NextRequest):Promise<NextResponse> => {
    // 🔹 Authenticate the user
    const user = await getServerSession(authOptions);
    if (!user) {
        return nextError(401, "Unauthorized: Please login to create a department");
    };

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("eventId");
    if (!id) {
        return nextError(400, "Department ID is required");
    };

    await connectDB();

    const role = user?.user?.role;
    if (role !== "admin") {
        return nextError(403, "Forbidden: Only admins can create departments");
    };

    // 🔹 Parse and validate body
    const body = await req.json();
    if (!body) {
        return nextError(400, "Bad Request: No body found");
    };

    const result = eventSchema.safeParse(body);
    if (!result.success) {
        const firstError = result.error.errors[0];
        console.log(firstError);
        return nextError(400, `Validation Error: ${firstError.message}`);
    };

    const { ...updateData } = result.data;

    await Event.findByIdAndUpdate(id, updateData, {
        new : true,
        runValidators: true,
    });
    return nextResponse(200, "Event updated Successfully");
});