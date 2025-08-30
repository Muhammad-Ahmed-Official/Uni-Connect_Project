import { EscalationEntity } from "@/lib/db";
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Escalation Schema
const escalationSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["open", "in-progress", "resolved", "closed"], default: "open" },
    createdByUserId: { type: String, required: true }
}, { timestamps: true});

const Escalation = models?.Escalation || model<EscalationEntity>("Escalation", escalationSchema);

export default Escalation;