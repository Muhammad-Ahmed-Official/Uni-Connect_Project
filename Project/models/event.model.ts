import { Schema, Document, model, models } from "mongoose";
import { IEvent } from "@/types/event";

const EventDetailsSchema = new Schema(
  {
    location: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    note: { type: String, required: false },
  },
  { _id: false }
);

const EventSchema: Schema<IEvent & Document> = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    department_id: { type: Schema.Types.ObjectId, ref: "Department" },
    tags: { type: [String], default: [] },
    likes_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
    shares_count: { type: Number, default: 0 },
    eventDetails: { type: EventDetailsSchema, required: false },
  },
  { timestamps: true }
);

const Event = models?.Event ||  model<IEvent>("Event", EventSchema);
