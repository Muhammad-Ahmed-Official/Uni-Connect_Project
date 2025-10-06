import { Types,Document } from "mongoose";
import { BaseEntity } from "./BaseEntity";

export interface IComment extends Document,BaseEntity {
  _id?: Types.ObjectId;
  entity_id: Types.ObjectId; // post | event
  user_id: Types.ObjectId;   // user
  entity_type: "post" | "event";
  content: string;
  parentCommentId?: Types.ObjectId;
  like_count?: number;
}
