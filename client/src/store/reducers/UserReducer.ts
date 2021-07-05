import {
    IUser,
    TRemoveFailedDownloadAvatar,
    TSetFailedDownloadAvatar,
    TUserAction,
    TUserDownloadAvatar,
    TUserGetInfo,
    TUserGetInfoError,
    TUserGetInfoSuccess,
    TUserOutput,
    TUserState,
    UserActionEnum,
} from '../../types/UserStore';

const defaultState: TUserState = {
    isAuth: false,
    isError: false,
    user: null,
    loading: true, // при первом рендере странички мы сразу будет запрос на сервер
    isFailedDownloadAvatar: false,
};

export const UserReducer = (state = defaultState, action: TUserAction): TUserState => {
    switch (action.type) {
        case UserActionEnum.USER_GET_INFO:
            return { ...state, loading: action.loading };
        case UserActionEnum.USER_GET_INFO_SUCCESS:
            return { ...state, isAuth: true, user: action.payload, loading: false };
        case UserActionEnum.USER_GET_INFO_ERROR:
            return { ...state, isError: true, loading: false };
        case UserActionEnum.USER_OUTPUT:
            return { ...state, user: null, isAuth: false };
        case UserActionEnum.SET_FAILED_DOWNLOAD_AVATAR:
            return { ...state, isFailedDownloadAvatar: true };
        case UserActionEnum.REMOVE_FAILED_DOWNLOAD_AVATAR:
            return { ...state, isFailedDownloadAvatar: false };
        default:
            return state;
    }
};

export const userGetInfo = (payload: string, loading: boolean = true): TUserGetInfo => ({
    type: UserActionEnum.USER_GET_INFO,
    payload,
    loading,
});

export const userGetInfoSuccess = (payload: IUser): TUserGetInfoSuccess => ({
    type: UserActionEnum.USER_GET_INFO_SUCCESS,
    payload,
});

export const userGetInfoError = (): TUserGetInfoError => ({
    type: UserActionEnum.USER_GET_INFO_ERROR,
});

export const userOutput = (): TUserOutput => ({
    type: UserActionEnum.USER_OUTPUT,
});

export const userDownloadAvatar = (payload: FormData, token: string): TUserDownloadAvatar => ({
    type: UserActionEnum.USER_DOWNLOAD_AVATAR,
    payload,
    token,
});

export const setFailedDownloadAvatar = (): TSetFailedDownloadAvatar => ({
    type: UserActionEnum.SET_FAILED_DOWNLOAD_AVATAR,
});

export const semoveFailedDownloadAvatar = (): TRemoveFailedDownloadAvatar => ({
    type: UserActionEnum.REMOVE_FAILED_DOWNLOAD_AVATAR,
});
