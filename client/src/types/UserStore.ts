export interface IUser {
    _id: string;
    nicname: string;
    email: string;
    password: string;
    __v: number;
}

export type TUserState = {
    isAuth: boolean;
    isError: boolean;
    user: IUser | null;
    loading: boolean;
};

export enum UserActionEnum {
    USER_GET_INFO = 'USER_GET_INFO',
    USER_GET_INFO_ERROR = 'USER_GET_INO_ERROR',
    USER_GET_INFO_SUCCESS = 'USER_GET_INFO_SUCCESS',
}

export type TUserGetInfo = {
    type: UserActionEnum.USER_GET_INFO;
    payload: string;
};
export type TUserGetInfoSuccess = {
    type: UserActionEnum.USER_GET_INFO_SUCCESS;
    payload: IUser;
};
export type TUserGetInfoError = {
    type: UserActionEnum.USER_GET_INFO_ERROR;
};

export type TUserAction = TUserGetInfo | TUserGetInfoSuccess | TUserGetInfoError;