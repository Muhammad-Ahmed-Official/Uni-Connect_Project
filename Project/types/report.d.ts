import {  Document } from "mongoose";
import { BaseEntity } from "./BaseEntity";

export interface IReport extends Document,BaseEntity {
  post_id: Schema.Types.ObjectId;  
  user_id: Schema.Types.ObjectId;  
  reason: string;                  
  status: "pending" | "resolved";  
  resolved_by?: Schema.Types.ObjectId; 
  notes?: string;                  
}