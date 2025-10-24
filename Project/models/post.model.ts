import { Schema, model, models } from "mongoose";
import { IPost } from "@/types/post";

const PostSchema = new Schema<IPost>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    department_id: { type: Schema.Types.ObjectId, ref: "Department", required: true },
    share_count: { type: Number, default: 0 },
    likes_count: { type: Number, default: 0 },
    comment_count: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const PostModel = models?.Post || model<IPost>("Post", PostSchema);
export default PostModel;
