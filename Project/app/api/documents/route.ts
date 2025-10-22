import { connectDB } from "@/lib/mongodb";
import DocumentSchema from "@/models/document.schema";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions.util";
import departmentModel from "@/models/department.model";

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
        return nextError(401, "Unauthorized: Please login to view documents");
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const departmentId = searchParams.get("department") || "";
    const year = searchParams.get("year") || "";
    const semester = searchParams.get("semester") || "";
    const docType = searchParams.get("type") || ""; // final, midterms, repeater
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const filter: any = {};

    if (departmentId && departmentId !== "All") {
        filter.department_id = departmentId;
    }

    if (year) {
        filter.year = parseInt(year);
    }

    if (semester) {
        filter.semester = semester;
    }

    if (docType && ["final", "midterms", "repeater"].includes(docType)) {
        filter.document_type = docType;
    }

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { teacher: { $regex: search, $options: "i" } },
            { document_type: { $regex: search, $options: "i" } },
        ];
    }

    const skip = (page - 1) * limit;

    const [documents, totalDocuments] = await Promise.all([
        DocumentSchema.find(filter)
            .sort({ createdAt: -1 }) // latest first
            .skip(skip)
            .limit(limit)
            .lean(),
        DocumentSchema.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalDocuments / limit);

    return nextResponse(200, "Fetched documents successfully", {
        documents,
        pagination: {
            totalDocuments,
            totalPages,
            currentPage: page,
            limit,
        },
    });
});


export const POST = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
        return nextError(401, "Unauthorized: Please login to upload documents");
    }

    const userId = session.user.id;
    if (!userId) {
        return nextError(401, "Unauthorized: User ID not found in session");
    }

    const body = await req.json();
    const {
        title,
        document,
        departmentName,
        year,
        semester,
        document_type,
        teacher,
    } = body;

    // Validate required fields
    if (
        !title ||
        !document ||
        !departmentName ||
        !year ||
        !semester ||
        !document_type ||
        !teacher
    ) {
        return nextError(400, "Missing required fields");
    }

    const allowedTypes = ["final", "midterms", "repeater"];
    if (!allowedTypes.includes(document_type)) {
        return nextError(400, "Invalid document type");
    }

    if (session.user.role === "admin") {

        const newDoc = await DocumentSchema.create({
            title,
            document,
            year,
            semester,
            document_type,
            teacher,
            userId,
        });
        return nextResponse(201, "Document uploaded successfully", newDoc);

    }
    const department = await departmentModel.findOne({ departmentName });
    if (!department) {
        return nextError(400, "Invalid department name");
    }

    const department_id = department._id;


    const newDoc = await DocumentSchema.create({
        title,
        document,
        department_id,
        year,
        semester,
        document_type,
        teacher,
        userId,
    });

    return nextResponse(201, "Document uploaded successfully", newDoc);
});

export const DELETE = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) return nextError(401, "Unauthorized: Please login first");

    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("documentId");

    if (!documentId) return nextError(400, "Document ID is required");

    const document = await DocumentSchema.findById(documentId);
    if (!document) return nextError(404, "Document not found");

    const isAdmin = session.user.role === "admin";
    const isOwner = document.userId === session.user.id;

    if (!isAdmin && !isOwner) {
        return nextError(403, "Forbidden: You don't have permission to delete this document");
    }

    await DocumentSchema.findByIdAndDelete(documentId);

    return nextResponse(200, "Document deleted successfully");
});


export const PUT = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) return nextError(401, "Unauthorized: Please login first");

    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("documentId");

    const body = await req.json();
    const { title, document, year, semester, document_type, teacher } = body;


    const existingDoc = await DocumentSchema.findById({_id:documentId});
    if (!existingDoc) return nextError(404, "Document not found");

    const isAdmin = session.user.role === "admin";
    const isOwner = existingDoc.userId === session.user.id;

    if (!isAdmin && !isOwner) {
        return nextError(403, "Forbidden: You don't have permission to update this document");
    }

    // Update fields only if provided
    if (title) existingDoc.title = title;
    if (document) existingDoc.document = document;
    if (year) existingDoc.year = year;
    if (semester) existingDoc.semester = semester;
    if (document_type) existingDoc.document_type = document_type;
    if (teacher) existingDoc.teacher = teacher;

    await existingDoc.save();

    return nextResponse(200, "Document updated successfully", existingDoc);
});

