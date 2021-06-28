import { Document } from 'mongoose';
import { IMessageRoom } from './MessageRoom';
import { IUser } from './User';

export type TMessage = IMessage & Document;

export interface IMessage {
    text: string;
    user: string | IUser;
    roomId: string | IMessageRoom;
}
