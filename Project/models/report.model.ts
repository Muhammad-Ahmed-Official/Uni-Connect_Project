import { IReport } from "@/types/report";
import {Schema,model,models} from "mongoose"

const reportSchema = new Schema<IReport>(
  {
    post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true, trim: true },
    status: { 
      type: String, 
      enum: ["pending", "resolved"], 
      default: "pending" 
    },
    resolved_by: { type: Schema.Types.ObjectId, ref: "User" },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

const ReportModel =models?.Report ||  model<IReport>("Report", reportSchema);
export default ReportModel;
