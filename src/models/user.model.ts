import mongoose, { Document, mongo, Schema } from "mongoose";


export interface IUser extends Document {
    username: string;
    fullName: string;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
});

//add here pasport plugin

const userModel = mongoose.model<IUser>("User", UserSchema);

export default userModel;