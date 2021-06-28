import { Schema, model } from 'mongoose';
import { TUserModel } from '../types/User';

const UserSchema = new Schema<TUserModel>({
    nicname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    applicationFrends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    requestFrends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    frends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    rooms: [{ type: Schema.Types.ObjectId, ref: 'MessageRoom' }],
    unreadMessages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    online: { type: Boolean, default: false },
});

export const UserModel = model<TUserModel>('User', UserSchema);
