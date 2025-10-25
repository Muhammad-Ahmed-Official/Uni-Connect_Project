import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import { authOptions } from "@/utils/authOptions.util";
import DocumentSchema from "@/models/document.schema";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const documentId = params.id;

  try {
    const updatedDocument = await DocumentSchema.findByIdAndUpdate(
      documentId,
      { 
        $inc: { totalDownloads: 1 } 
      },
      { new: true }
    );

    if (!updatedDocument) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Download counted successfully",
      totalDownloads: updatedDocument.totalDownloads
    });

  } catch (error) {
    console.error("Download count error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}