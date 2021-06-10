import { call, put, takeEvery } from '@redux-saga/core/effects';
import { IUser, TUserGetInfo, UserActionEnum } from '../../types/UserStore';
import { userGetInfoFetch } from '../fetch/userGetInfoFetch';
import { userGetInfoError, userGetInfoSuccess } from '../reducers/UserReducer';

function* getUserData(getUserAction: TUserGetInfo) {
    try {
        const data: IUser = yield call(userGetInfoFetch.bind(null, getUserAction.payload));
        yield put(userGetInfoSuccess(data));
    } catch {
        yield put(userGetInfoError());
    }
}

export function* watcherUserSaga() {
    yield takeEvery(UserActionEnum.USER_GET_INFO, getUserData);
}
