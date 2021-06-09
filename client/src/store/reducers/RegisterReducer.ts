import { IRegisterForm } from '../../types/form/RegisterForm';
import {
    RegisterActionEnum,
    TErrors,
    TRegisterAction,
    TRegisterError,
    TRegisterFailed,
    TRegisterRequest,
    TRegisterState,
    TRegisterSuccess,
    TCloseAlertSuccess,
} from '../../types/RegisterStore';

const defaultStore: TRegisterState = {
    loading: false,
    fetchFailed: false,
    errors: null,
    success: false,
};

export const RegisterReducer = (state = defaultStore, action: TRegisterAction): TRegisterState => {
    switch (action.type) {
        case RegisterActionEnum.REGISTER_REQUEST:
            return { ...defaultStore, loading: true };
        case RegisterActionEnum.REGISTER_SUCCESS:
            return { ...state, success: true, loading: false, errors: null };
        case RegisterActionEnum.REGISTER_FAILED:
            return { ...state, fetchFailed: true, loading: false };
        case RegisterActionEnum.REGISTER_ERROR:
            return { ...state, loading: false, errors: action.payload };
        case RegisterActionEnum.CLOSE_ALERT_SUCCESS:
            return { ...state, success: false };
        default:
            return state;
    }
};

export const registerRequest = (payload: IRegisterForm): TRegisterRequest => ({
    type: RegisterActionEnum.REGISTER_REQUEST,
    payload,
});
export const registerSuccess = (): TRegisterSuccess => ({
    type: RegisterActionEnum.REGISTER_SUCCESS,
});

export const registerError = (payload: TErrors): TRegisterError => ({
    type: RegisterActionEnum.REGISTER_ERROR,
    payload,
});

export const registerFailed = (): TRegisterFailed => ({
    type: RegisterActionEnum.REGISTER_FAILED,
});

export const closeAlertSuccess = (): TCloseAlertSuccess => ({
    type: RegisterActionEnum.CLOSE_ALERT_SUCCESS,
});
