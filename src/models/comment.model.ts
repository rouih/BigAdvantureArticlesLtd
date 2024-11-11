import e from 'express';
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IComment extends Document {
    userId: string;
    articleId: string;
    content: string;
    createdAt: Date;
}

const CommentSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    articleId: {
        type: Types.ObjectId,
        required: true,
        ref: 'Article'
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now() // current time
    },
});

const commentModel = mongoose.model<IComment>('Comment', CommentSchema);

export default commentModel;