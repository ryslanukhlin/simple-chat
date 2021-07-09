import { call, put, takeEvery } from '@redux-saga/core/effects';

import { IUser, TUserDownloadAvatar, TUserGetInfo, UserActionEnum } from '../../types/UserStore';
import { userGetInfoFetch } from '../fetch/userGetInfoFetch';
import {
    setFailedDownloadAvatar,
    userGetInfoError,
    userGetInfoSuccess,
} from '../reducers/UserReducer';
import {
    addNotification,
    setMessageNotification,
    setNewFrendNotification,
} from '../reducers/NotificationReducer';
import io from '../../Socket';
import { clearAuth } from '../reducers/AuthReducer';
import { userDownloadAvatarFetch } from '../fetch/downloadAvatar';

function* getUserData(getUserAction: TUserGetInfo) {
    try {
        const data: IUser = yield call(userGetInfoFetch.bind(null, getUserAction.payload));
        yield put(userGetInfoSuccess(data));
        if (data.unreadMessages.length > 0) {
            yield put(setMessageNotification(data.unreadMessages));
        }
        if (data.unreadNotificationAplicationFrends.length > 0) {
            yield put(addNotification(data.unreadNotificationAplicationFrends.length, false));
        }
        if (data.newNotificationFrends.length > 0) {
            yield put(setNewFrendNotification(data.newNotificationFrends));
        }
        if (getUserAction.loading) io.emit('USER:JOIN_USER', data._id);
    } catch {
        yield put(userGetInfoError());
    }
}

function* userOutput() {
    localStorage.removeItem('token');
    yield put(clearAuth());
}

function* userDownloadAvatar(downloadAvatarAction: TUserDownloadAvatar) {
    try {
        const { payload, token } = downloadAvatarAction;
        const data: IUser = yield call(userDownloadAvatarFetch.bind(null, payload, token));
        yield put(userGetInfoSuccess(data));
    } catch (e) {
        yield put(setFailedDownloadAvatar());
    }
}

export function* watcherUserSaga() {
    yield takeEvery(UserActionEnum.USER_GET_INFO, getUserData);
    yield takeEvery(UserActionEnum.USER_OUTPUT, userOutput);
    yield takeEvery(UserActionEnum.USER_DOWNLOAD_AVATAR, userDownloadAvatar);
}
