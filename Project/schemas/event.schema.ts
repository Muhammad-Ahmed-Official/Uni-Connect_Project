import { EventEntity } from "@/lib/db";
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Event Schema
const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: String, required: true },
    location: { type: String },
    departmentId: { type: String }
}, { timestamps: true });

const Event = models?.Event || model<EventEntity>("Event", eventSchema);

export default Event;