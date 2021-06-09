import { Document } from 'mongoose';

export interface IUserModel extends Document {
    login: string;
    email: string;
    password: string;
}

export interface IUser {
    login: string;
    email: string;
    password: string;
}
