import {
    IUser,
    TUserAction,
    TUserGetInfo,
    TUserGetInfoError,
    TUserGetInfoSuccess,
    TUserState,
    UserActionEnum,
} from '../../types/UserStore';

const defaultState: TUserState = {
    isAuth: false,
    isError: false,
    user: null,
    loading: true,// при первом рендере странички мы сразу будет запрос на сервер
};

export const UserReducer = (state = defaultState, action: TUserAction): TUserState => {
    switch (action.type) {
        case UserActionEnum.USER_GET_INFO:
            return { ...state, loading: true };
        case UserActionEnum.USER_GET_INFO_SUCCESS:
            return { ...state, isAuth: true, user: action.payload, loading: false };
        case UserActionEnum.USER_GET_INFO_ERROR:
            return { ...state, isError: true, loading: false };
        default:
            return state;
    }
};

export const userGetInfo = (payload: string): TUserGetInfo => ({
    type: UserActionEnum.USER_GET_INFO,
    payload,
});
export const userGetInfoSuccess = (payload: IUser): TUserGetInfoSuccess => ({
    type: UserActionEnum.USER_GET_INFO_SUCCESS,
    payload,
});
export const userGetInfoError = (): TUserGetInfoError => ({
    type: UserActionEnum.USER_GET_INFO_ERROR,
});
