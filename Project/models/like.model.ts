import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILike extends Document {
    user_id: Types.ObjectId;
    entity_id: Types.ObjectId;
    entity_type: 'post' | 'event' | 'comment';
    createdAt: Date;
    updatedAt: Date;
}

const LikeSchema: Schema = new Schema<ILike>(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        entity_id: { type: Schema.Types.ObjectId, required: true },
        entity_type: {
            type: String,
            enum: ['post', 'event', 'comment'],
            required: true,
        },
    },
    { timestamps: true }
);

const Like= mongoose.models.Like || mongoose.model<ILike>('Like', LikeSchema);
export default Like;