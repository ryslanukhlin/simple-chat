import { Document } from 'mongoose';
import { IMessage } from './Message';
import { IMessageRoom } from './MessageRoom';

export type TUserModel = IUser & Document;

export interface IUser {
    avatar: string;
    login: string;
    email: string;
    password: string;
    applicationFrends: string[] | IUser[];
    requestFrends: string[] | IUser[];
    frends: string[] | IUser[];
    rooms: string[] | IMessageRoom[];
    unreadMessages: IMessage[];
    unreadNotificationAplicationFrends: IUser[];
    newNotificationFrends: IUser[];
    online: boolean;
}

export interface ILoginForm {
    email: string;
    password: string;
}
