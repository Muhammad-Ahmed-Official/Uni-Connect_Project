import { AdvisorEntity } from "@/lib/db";
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Advisor Schema
const advisorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    departmentId: { type: String, required: true }
}, { timestamps: true});

const Advisor = models?.Advisor || model<AdvisorEntity>("Advisor", advisorSchema);

export default Advisor;