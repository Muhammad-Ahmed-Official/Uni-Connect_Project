import { UserEntity } from "@/lib/db";
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// User Schema
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    departmed: { type: String },
    studentId: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });


const User = models?.User || model<UserEntity>("User", userSchema);

export default User;