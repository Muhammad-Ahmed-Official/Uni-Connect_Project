import { DocumentEntity } from "@/lib/db";
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Document Schema
const documentSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ["pdf", "docx", "xlsx", "pptx", "txt"] },
    departmentId: { type: String },
    uploadedByUserId: { type: String, required: true }
}, { timestamps: true });

export const DocumentSchema = models?.Document || model<DocumentEntity>("Document", documentSchema);