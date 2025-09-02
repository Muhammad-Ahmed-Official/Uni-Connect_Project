import { Types,Document } from "mongoose";
import { BaseEntity } from "./BaseEntity";

export interface IEventDetails {
  location: string;
  start_date: Date;
  end_date: Date;
  note: string;
}

export interface IEvent extends Document,BaseEntity {
  title: string;
  content: string;
  image?: string;
  user_id: Types.ObjectId;
  department_id?: Types.ObjectId;
  tags: string[];
  likes_count: number;
  comments_count: number;
  shares_count: number;
  eventDetails?: IEventDetails;
}
