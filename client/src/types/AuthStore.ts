import { ILoginForm } from './form/LoginForm';

export type TAuthState = {
    loading: boolean;
    token: string | null;
    error: boolean;
    fetchFailed: boolean;
};

export type TAuthResponseError = {
    error: boolean;
    token?: string;
};

export enum AuthActionEnum {
    AUTH_REQUEST = 'AUTH_REQUEST',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_ERROR = 'AUTH_ERROR',
    AUTH_FAILED = 'AUTH_FAILED',
    CLOSE_ALERT_ERROR = 'CLOSE_ALERT_ERROR',
    CLEAR_AUTH = 'CLEAR_AUTH',
}

export type TAuthRequsest = {
    type: AuthActionEnum.AUTH_REQUEST;
    payload: ILoginForm;
    isRememberMe: boolean;
};

export type TAuthSuccess = {
    type: AuthActionEnum.AUTH_SUCCESS;
    payload: string;
};

export type TAuthError = {
    type: AuthActionEnum.AUTH_ERROR;
};

export type TAuthFailed = {
    type: AuthActionEnum.AUTH_FAILED;
};

export type TCloseAlertError = {
    type: AuthActionEnum.CLOSE_ALERT_ERROR;
};

export type TClearAuth = {
    type: AuthActionEnum.CLEAR_AUTH;
};

export type TAuthAction =
    | TAuthRequsest
    | TAuthSuccess
    | TAuthError
    | TAuthFailed
    | TCloseAlertError
    | TClearAuth;
