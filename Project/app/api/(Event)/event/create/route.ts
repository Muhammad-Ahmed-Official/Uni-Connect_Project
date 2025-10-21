import { connectDB } from "@/lib/mongodb";
import departmentModel from "@/models/department.model";
import Event from "@/models/event.model";
import { postSchema } from "@/schemas/post.schema";
import { asyncHandler } from "@/utils/asyncHandler";
import { authOptions } from "@/utils/authOptions.util";
import { nextError, nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  // ✅ Connect to DB
  await connectDB();

  // ✅ Check authentication
  const user = await getServerSession(authOptions);

  if (!user) {
    return nextError(401, "Unauthorized: Please login to create an event");
  }

  if (user?.user?.role !== "admin") {
    return nextError(403, "Forbidden: Only admin can create an event");
  }

  const user_id = user.user.id;
  if (!user_id) {
    return nextError(401, "Unauthorized: User ID not found");
  }

  // ✅ Parse body
  const body = await req.json();
  if (!body) {
    return nextError(400, "Bad Request: No body found");
  }

  console.log("Request Body:", body);

  // ✅ Validate data using Zod schema
  const result = postSchema.safeParse(body);
  if (!result.success) {
    const firstError = result.error.errors[0];
    return nextError(400, `Validation Error: ${firstError.message}`);
  }

  const { departmentName } = result.data as { departmentName?: string };

  // ✅ Fetch department by name (using short form like "CS")
  const department = departmentName
    ? (await departmentModel.findOne({ departmentName }).lean().exec()) as { _id: string } | null
    : null;

  if (!department || !department._id) {
    return nextError(404, "Department not found");
  }

  const department_id = department._id.toString();

  // ✅ Check if an event for this department already exists (optional logic)
  const existingEvent = await Event.findOne({ department_id });
  if (existingEvent) {
    return nextError(400, "An event for this department already exists");
  }

  // ✅ Create payload for event creation
  const payload = {
    ...result.data,
    user_id,
    department_id,
  };

  // ✅ Create the event
  const event = await Event.create(payload);
  if (!event) {
    return nextError(500, "Internal Server Error: Failed to create event");
  }

  return nextResponse(201, "Event created successfully", event);
});
