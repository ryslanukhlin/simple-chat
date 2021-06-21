import { call, put, takeEvery } from '@redux-saga/core/effects';

import { IUser, TUserGetInfo, UserActionEnum } from '../../types/UserStore';
import { userGetInfoFetch } from '../fetch/userGetInfoFetch';
import { userGetInfoError, userGetInfoSuccess } from '../reducers/UserReducer';
import io from '../../Socket';

function* getUserData(getUserAction: TUserGetInfo) {
    try {
        const data: IUser = yield call(userGetInfoFetch.bind(null, getUserAction.payload));
        console.log(data);
        yield put(userGetInfoSuccess(data));
        if (getUserAction.loading) io.emit('USER:JOIN_USER', data._id);
    } catch {
        yield put(userGetInfoError());
    }
}

export function* watcherUserSaga() {
    yield takeEvery(UserActionEnum.USER_GET_INFO, getUserData);
}
