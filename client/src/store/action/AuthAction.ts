import { call, put, takeEvery } from '@redux-saga/core/effects';

import { AuthActionEnum, TAuthRequsest, TAuthResponseError } from '../../types/AuthStore';
import { authFetchData } from '../fetch/authFetch';
import { authError, authFailed, authSuccess } from '../reducers/AuthReducer';
import { userGetInfo } from '../reducers/UserReducer';

function* getDataAuth(authRequsest: TAuthRequsest) {
    try {
        const data: TAuthResponseError = yield call(authFetchData.bind(null, authRequsest.payload));
        if (data.error) yield put(authError());
        else {
            if (authRequsest.isRememberMe) localStorage.setItem('token', data.token!);
            yield put(authSuccess(data.token!));
            yield put(userGetInfo(data.token!));
        }
    } catch (err) {
        yield put(authFailed());
    }
}

export function* watcherAuthSaga() {
    yield takeEvery(AuthActionEnum.AUTH_REQUEST, getDataAuth);
}
