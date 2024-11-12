
import mongoose, { Document, mongo, Schema, Types } from "mongoose";


export interface IArticle extends Document {
    title: string;
    body: string;
    author: Types.ObjectId;
}

const ArticleSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

ArticleSchema.index({ author: 1 });
ArticleSchema.index({ title: 1 });



const ArticleModel = mongoose.model<IArticle>("Article", ArticleSchema);

export default ArticleModel;