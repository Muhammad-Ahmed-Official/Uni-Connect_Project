import { connectDB } from "@/lib/mongodb";
import departmentModel from "@/models/department.model";
import PostModel from "@/models/post.model";
import DocumentSchema from "@/models/document.schema";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
    await connectDB();

    const documents = await DocumentSchema.find().populate("user_id", "-password -department_id -isVerified -role -privacy_settings -notification_preferences").populate("department_id", "departmentName").sort({ createdAt: -1 });

    if (!documents || documents.length === 0) {
        return nextError(404, "No documents found for this department");
    }

    console.log("documents are: ", documents);

    return nextResponse(201, "Post Fetched successfully", documents);
})