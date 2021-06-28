import { Document } from 'mongoose';
import { IMessage } from './Message';
import { IMessageRoom } from './MessageRoom';

export type TUserModel = IUser & Document;

export interface IUser {
    login: string;
    email: string;
    password: string;
    applicationFrends: string[] | IUser[];
    requestFrends: string[] | IUser[];
    frends: string[] | IUser[];
    rooms: string[] | IMessageRoom[];
    unreadMessages: IMessage[];
    online: boolean;
}

export interface ILoginForm {
    email: string;
    password: string;
}
