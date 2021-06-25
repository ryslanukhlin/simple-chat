import { Document } from 'mongoose';
import { IMessage } from './Message';
import { IUser } from './User';

export type TMessageRoom = IMessageRoom & Document;

export interface IMessageRoom {
    users: string[] | IUser[];
    messages: string[] | IMessage[];
}
