import mongoose, { Schema } from "mongoose";
import { IComment } from "@/types/comment";

const commentSchema = new Schema<IComment>(
    {
        entity_id: { type: Schema.Types.ObjectId, required: true, index: true },
        user_id: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        entity_type: { type: String, enum: ["post", "event", "comment"], required: true },
        content: { type: String, required: true, trim: true },
        parentCommentId: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Comment ||
    mongoose.model<IComment>("Comment", commentSchema);
