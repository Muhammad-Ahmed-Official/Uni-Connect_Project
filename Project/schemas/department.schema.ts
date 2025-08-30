import { DepartmentEntity } from "@/lib/db";
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;


// Department Schema
const departmentSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String }
}, { timestamps: true })


const Department = models?.Department || model<DepartmentEntity>("Department", departmentSchema);

export default Department;