import { call, put, takeEvery } from '@redux-saga/core/effects';

import { IUser, TUserGetInfo, UserActionEnum } from '../../types/UserStore';
import { userGetInfoFetch } from '../fetch/userGetInfoFetch';
import { userGetInfoError, userGetInfoSuccess } from '../reducers/UserReducer';
import {
    addNotification,
    setMessageNotification,
    setNewFrendNotification,
} from '../reducers/NotificationReducer';
import io from '../../Socket';

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

export function* watcherUserSaga() {
    yield takeEvery(UserActionEnum.USER_GET_INFO, getUserData);
}
