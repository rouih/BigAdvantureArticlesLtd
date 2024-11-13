import mongoose, { Document, Schema, Types } from "mongoose";
import ArticleModel from "./article.model";

export interface IComment extends Document {
    content: string;
    author: Types.ObjectId;
    article: Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    article: { type: Schema.Types.ObjectId, ref: "Article", required: true },
}, {
    timestamps: true
});

CommentSchema.pre("save", async function (next) {
    const comment = this as IComment;
    const articleExists = await ArticleModel.exists({ _id: comment.article });

    if (!articleExists) {
        return next(new Error("Invalid article ID: Article does not exist."));
    }

    next();
});

CommentSchema.index({ author: 1 });
CommentSchema.index({ article: 1, createdAt: -1 });

const CommentModel = mongoose.model<IComment>("Comment", CommentSchema);

export default CommentModel;