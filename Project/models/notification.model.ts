import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  title: string;
  content: string;
  targetAudience: "All Users" | "Students";
  scheduleFor?: Date;
  sender: mongoose.Types.ObjectId; // User reference
  department_id?: mongoose.Types.ObjectId; // Only for advisors
  recipients: mongoose.Types.ObjectId[]; // Resolved users
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<IMessage>(
  {
    title: {
      type: String,
      required: [true, "Message title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
    },
    targetAudience: {
      type: String,
      enum: ["All Users", "Students"],
      default: "All Users",
    },
    scheduleFor: {
      type: Date,
      default: null,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department_id: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
    recipients: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Notification = mongoose.models.Notification || mongoose.model<IMessage>("Notification", notificationSchema);

export default Notification;
