import { Schema, model } from 'mongoose';
import { IUser } from '../types/User';

const UserSchema = new Schema<IUser>({
    nicname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const UserModel = model<IUser>('User', UserSchema);
