import { Document } from 'mongoose';
import { IUser } from './User';

export type TMessage = IMessage & Document;

export interface IMessage {
    text: string;
    user: string | IUser;
}
