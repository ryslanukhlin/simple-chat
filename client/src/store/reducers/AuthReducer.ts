import {
    AuthActionEnum,
    TAuthAction,
    TAuthError,
    TAuthFailed,
    TAuthRequsest,
    TAuthState,
    TAuthSuccess,
    TClearAuth,
    TCloseAlertError,
} from '../../types/AuthStore';
import { ILoginForm } from '../../types/form/LoginForm';

const defaultState: TAuthState = {
    loading: false,
    token: null,
    error: false,
    fetchFailed: false,
};

export const AuthReducer = (state = defaultState, action: TAuthAction): TAuthState => {
    switch (action.type) {
        case AuthActionEnum.AUTH_REQUEST:
            return { ...defaultState, loading: true };
        case AuthActionEnum.AUTH_SUCCESS:
            return { ...state, loading: false, token: action.payload };
        case AuthActionEnum.AUTH_ERROR:
            return { ...state, loading: false, error: true };
        case AuthActionEnum.AUTH_FAILED:
            return { ...state, loading: false, fetchFailed: true };
        case AuthActionEnum.CLOSE_ALERT_ERROR:
            return { ...state, error: false };
        case AuthActionEnum.CLEAR_AUTH:
            return { ...state, token: null };
        default:
            return state;
    }
};

export const authRequest = (payload: ILoginForm, isRememberMe: boolean): TAuthRequsest => ({
    type: AuthActionEnum.AUTH_REQUEST,
    payload,
    isRememberMe,
});
export const authSuccess = (payload: string): TAuthSuccess => ({
    type: AuthActionEnum.AUTH_SUCCESS,
    payload,
});

export const authError = (): TAuthError => ({
    type: AuthActionEnum.AUTH_ERROR,
});

export const authFailed = (): TAuthFailed => ({
    type: AuthActionEnum.AUTH_FAILED,
});

export const closeAlertError = (): TCloseAlertError => ({
    type: AuthActionEnum.CLOSE_ALERT_ERROR,
});

export const clearAuth = (): TClearAuth => ({
    type: AuthActionEnum.CLEAR_AUTH,
});
