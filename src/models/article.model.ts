
import mongoose, { Document, mongo, Schema } from "mongoose";


export interface IArticle extends Document {
    title: string;
    body: string;
    author: string;
}

const ArticleSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
});

//add here pasport plugin

const ArticleModel = mongoose.model<IArticle>("Article", ArticleSchema);

export default ArticleModel;