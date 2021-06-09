import { Schema, model } from 'mongoose';
import { IUserModel } from '../types/User';

const UserSchema = new Schema<IUserModel>({
    nicname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const UserModel = model<IUserModel>('User', UserSchema);
