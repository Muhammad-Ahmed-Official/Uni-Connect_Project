import { connectDB } from "@/lib/mongodb";
import DocumentSchema from "@/models/document.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    await connectDB();

    const documentId = params.id;

    try {
        const updatedDocument = await DocumentSchema.findByIdAndUpdate(
            documentId,
            {
                $inc: { view: 1 }
            },
            { new: true }
        );

        if (!updatedDocument) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "View counted successfully",
            totalViews: updatedDocument.view
        });

    } catch (error) {
        console.error("View count error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}