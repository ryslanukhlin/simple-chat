import { MessageBd } from './socket/messageBd';

export interface IRoom {
    users: IUser[];
    _id: string;
}

export interface IUser {
    _id: string;
    nicname: string;
    email: string;
    password: string;
    frends: IUser[];
    requestFrends: IUser[];
    applicationFrends: IUser[];
    rooms: IRoom[];
    unreadMessages: MessageBd[];
    online: boolean;
    unreadNotificationAplicationFrends: string[];
    newNotificationFrends: IUser[];
    __v: number;
    avatar: string | undefined;
}

export type TUserState = {
    isAuth: boolean;
    isError: boolean;
    user: IUser | null;
    loading: boolean;
    isFailedDownloadAvatar: boolean;
};

export enum UserActionEnum {
    USER_GET_INFO = 'USER_GET_INFO',
    USER_GET_INFO_ERROR = 'USER_GET_INO_ERROR',
    USER_GET_INFO_SUCCESS = 'USER_GET_INFO_SUCCESS',
    USER_OUTPUT = 'USER_OUTPUT',
    USER_DOWNLOAD_AVATAR = 'USER_DOWNLOAD_AVATAR',
    SET_FAILED_DOWNLOAD_AVATAR = 'SET_FAILED_DOWNLOAD_AVATAR',
    REMOVE_FAILED_DOWNLOAD_AVATAR = 'REMOVE_FAILED_DOWNLOAD_AVATAR',
    CLEAR_APLICATION_FRENDS = 'CLEAR_APLICATION_FRENDS',
}

export type TUserGetInfo = {
    type: UserActionEnum.USER_GET_INFO;
    payload: string;
    loading: boolean;
};
export type TUserGetInfoSuccess = {
    type: UserActionEnum.USER_GET_INFO_SUCCESS;
    payload: IUser;
};
export type TUserGetInfoError = {
    type: UserActionEnum.USER_GET_INFO_ERROR;
};

export type TUserOutput = {
    type: UserActionEnum.USER_OUTPUT;
};

export type TUserDownloadAvatar = {
    type: UserActionEnum.USER_DOWNLOAD_AVATAR;
    payload: FormData;
    token: string;
};

export type TSetFailedDownloadAvatar = {
    type: UserActionEnum.SET_FAILED_DOWNLOAD_AVATAR;
};

export type TRemoveFailedDownloadAvatar = {
    type: UserActionEnum.REMOVE_FAILED_DOWNLOAD_AVATAR;
};

export type TClearAplicationFrends = {
    type: UserActionEnum.CLEAR_APLICATION_FRENDS;
    payload: string;
};

export type TUserAction =
    | TUserGetInfo
    | TUserGetInfoSuccess
    | TUserGetInfoError
    | TUserOutput
    | TUserDownloadAvatar
    | TSetFailedDownloadAvatar
    | TRemoveFailedDownloadAvatar
    | TClearAplicationFrends;
