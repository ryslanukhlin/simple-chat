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
};

export const UserReducer = (state = defaultState, action: TUserAction): TUserState => {
    switch (action.type) {
        case UserActionEnum.USER_GET_INFO_SUCCESS:
            return { ...state, isAuth: true, user: action.payload };
        case UserActionEnum.USER_GET_INFO_ERROR:
            return { ...state, isError: true };
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
