import mongoose, { Types } from "mongoose";

const { Schema, model, models } = mongoose;

// Document Schema
const documentSchema = new Schema({
    title: { type: String, required: true, index: true },
    document_url: { type: String, required: true },
    subject_name: { type: String, required: true },
    department_id: { type: Types.ObjectId, ref: "Department", required: true, },
    user_id: { type: Types.ObjectId, ref: "User", required: true },
    year: { type: String },
    semester: { type: String, required: true },
    document_type: { type: String, enum: ["past-paper", "study-material"] },
    exam_type: { type: String, enum: ["final", "midterms", "quiz"] },
    teacher_name: { type: String, default: null },
    totalDownloads: { type: Number, default: 0 },
    view: { type: Number, default: 0 }
}, { timestamps: true });

const DocumentSchema = models?.Document || model("Document", documentSchema);

export default DocumentSchema;