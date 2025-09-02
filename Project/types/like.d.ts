import { Types , Document } from "mongoose";
import { BaseEntity } from "./BaseEntity";

export interface ILike extends Document,BaseEntity {
  _id?: Types.ObjectId;
  user_id: Types.ObjectId; 
  entity_id: Types.ObjectId; 
  entity_type: "post" | "event" | "comment";
}
