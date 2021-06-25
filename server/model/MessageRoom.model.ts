import { Schema, model } from 'mongoose';
import { TMessageRoom } from '../types/MessageRoom';

const MessageRoomSchema = new Schema<TMessageRoom>({
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

export const MessageRoomModel = model<TMessageRoom>('MessageRoom', MessageRoomSchema);
