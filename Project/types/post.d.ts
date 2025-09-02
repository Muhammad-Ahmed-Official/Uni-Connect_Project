import { Document, Types } from "mongoose";
import { BaseEntity } from "./BaseEntity";

export interface IPost extends Document,BaseEntity {
  user_id: Types.ObjectId; 
  title: string;
  content: string;
  tags?: string[];
  department_id: Types.ObjectId; 
  share_count: number;
  likes_count: number;
  comment_count: number;
  views: number;
}
