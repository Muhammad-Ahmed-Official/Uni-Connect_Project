import { connectDB } from "@/lib/mongodb";
import departmentModel from "@/models/department.model";
import { departmentSchema } from "@/schemas/department.schema";
import { asyncHandler } from "@/utils/asyncHandler";
import { authOptions } from "@/utils/authOptions.util";
import { nextError, nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  await connectDB();

  // 🔹 Authenticate the user
  const user = await getServerSession(authOptions);
  if (!user) {
    return nextError(401, "Unauthorized: Please login to create a department");
  }

  const role = user?.user?.role;
  if (role !== "admin") {
    return nextError(403, "Forbidden: Only admins can create departments");
  }

  // 🔹 Parse and validate body
  const body = await req.json();
  const validation = await departmentSchema.safeParseAsync(body);

  if (!validation.success) {
    const error = validation.error.format();
    const firstError = Object.values(error).find((err: any) => err?._errors?.length);
    const errorMessage =
      firstError && Array.isArray((firstError as any)._errors)
        ? (firstError as any)._errors[0]
        : "Invalid input data";
    return nextError(400, errorMessage as string);
  }

  const { departmentName, departmentBio, deaprtmentchairmanEmail, departmentChairman, established} = validation.data;
  // 🔹 Check if department already exists
  const existingDept = await departmentModel.findOne({ departmentName });
  if (existingDept) {
    return nextError(409, "Department already exists");
  }

  // 🔹 Create new department
  const newDepartment = await departmentModel.create({
    departmentName,
    departmentBio,
    deaprtmentchairmanEmail,
    departmentChairman,
    established,
  });

  if (!newDepartment) {
    return nextError(500, "Internal Server Error: Failed to create department");
  }

  return nextResponse(201, "Department created successfully", newDepartment);
});
