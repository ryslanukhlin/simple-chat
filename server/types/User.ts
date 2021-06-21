import { Document } from 'mongoose';

export type TUserModel = IUser & Document;

export interface IUser {
    login: string;
    email: string;
    password: string;
}

export interface ILoginForm {
    email: string;
    password: string;
}
