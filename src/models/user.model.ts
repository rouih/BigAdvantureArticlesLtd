import mongoose, { Document, mongo, Schema } from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'

export interface IUser extends Document {
    username: string;
    fullName: string;
    token?: string;
}

const UserSchema: Schema = new Schema({
    userName: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
});

//add here pasport plugin

UserSchema.plugin(passportLocalMongoose)

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;