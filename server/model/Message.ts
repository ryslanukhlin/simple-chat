import { Schema, model } from 'mongoose';
import { TMessage } from '../types/Message';

const MessageSchema = new Schema<TMessage>({
    text: { type: String, require: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    roomId: { type: Schema.Types.ObjectId, ref: 'MessageRoom' },
});

export const MessageModel = model<TMessage>('Message', MessageSchema);
