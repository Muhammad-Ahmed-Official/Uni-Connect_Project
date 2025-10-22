import { connectDB } from "@/lib/mongodb";
import departmentModel from "@/models/department.model";
import { departmentSchema } from "@/schemas/department.schema";
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
    const id = searchParams.get("departmentId");
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
    
    const updateDepartmentSchema = departmentSchema.partial();
    const result = updateDepartmentSchema.safeParse(body);
    if (!result.success) {
        const firstError = result.error.errors[0];
        return nextError(400, `Validation Error: ${firstError.message}`);
    };

    const { ...updatedDepartment } = result?.data;
    
    const updated = await departmentModel.findByIdAndUpdate(id, updatedDepartment, {
        new: true,
        runValidators: true,
    });

    if (!updated) {
        return nextError(404, "Department not found");
    }


    return nextResponse(200, "Department updated successfully");
})