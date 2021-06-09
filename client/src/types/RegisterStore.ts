import { IRegisterForm } from './form/RegisterForm';

export interface TResponseRegisterErrorValid {
    errors: TErrors;
    validErr: boolean;
}

export interface TErrors {
    nicname?: string;
    email?: string;
    password?: string;
    repeatPassword?: string;
}

export type TRegisterState = {
    loading: boolean;
    fetchFailed: boolean;
    errors: TErrors | null;
    success: boolean;
};

export enum RegisterActionEnum {
    REGISTER_REQUEST = 'REGISTER_REQUEST',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_ERROR = 'REGISTER_ERROR',
    REGISTER_FAILED = 'REGISTER_FAILED',
    CLOSE_ALERT_SUCCESS = 'CLOSE_ALERT_SUCCESS',
}

export type TRegisterRequest = {
    type: RegisterActionEnum.REGISTER_REQUEST;
    payload: IRegisterForm;
};

export type TRegisterSuccess = {
    type: RegisterActionEnum.REGISTER_SUCCESS;
};

export type TRegisterError = {
    type: RegisterActionEnum.REGISTER_ERROR;
    payload: TErrors;
};

export type TRegisterFailed = {
    type: RegisterActionEnum.REGISTER_FAILED;
};

export type TCloseAlertSuccess = {
    type: RegisterActionEnum.CLOSE_ALERT_SUCCESS;
};

export type TRegisterAction =
    | TRegisterRequest
    | TRegisterSuccess
    | TRegisterError
    | TRegisterFailed
    | TCloseAlertSuccess;
