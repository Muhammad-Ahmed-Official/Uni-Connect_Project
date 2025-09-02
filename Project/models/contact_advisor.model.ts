import { IContactAdvisor } from "@/types/contact_advisor";
import {Schema,model,models} from "mongoose"


const ContactAdvisorSchema = new Schema<IContactAdvisor>(
  {
    student_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    advisor_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    priority_level: { type: String, enum: ["High", "Medium", "Low"], required: true },
    category: { type: String, required: true },
    issue_title: { type: String, required: true },
    detailed_description: { type: String, required: true },
    attachments: [{ type: String }],
    status: { type: String, enum: ["pending", "in progress", "resolved"], default: "pending" },
    resolved_at: { type: Date },
  },
  { timestamps: true } 
);

const ContactAdvisor = models?.ContactAdvisor || model<IContactAdvisor>("ContactAdvisor", ContactAdvisorSchema);

export default ContactAdvisor