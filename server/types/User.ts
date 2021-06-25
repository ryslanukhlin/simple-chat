import { Document } from 'mongoose';
import { IMessage } from './MessageRoom';

export type TUserModel = IUser & Document;

export interface IUser {
    login: string;
    email: string;
    password: string;
    applicationFrends: string[] | IUser[];
    requestFrends: string[] | IUser[];
    frends: string[] | IUser[];
    rooms: string[] | IMessage[];
}

export interface ILoginForm {
    email: string;
    password: string;
}
