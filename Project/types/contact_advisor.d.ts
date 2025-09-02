import { Document } from "mongoose";
import { BaseEntity } from "./BaseEntity";

export interface IContactAdvisor extends Document,BaseEntity {
  student_id: Schema.Types.ObjectId;
  advisor_id: Schema.Types.ObjectId;
  priority_level: "High" | "Medium" | "Low";
  category: string;
  issue_title: string;
  detailed_description: string;
  attachments: string[];
  status: "pending" | "in progress" | "resolved";
  resolved_at?: Date;
}