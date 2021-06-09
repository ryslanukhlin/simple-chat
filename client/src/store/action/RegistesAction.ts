import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';
import { registerError, registerFailed, registerSuccess } from '../reducers/RegisterReducer';
import { registerFetchData } from '../fetch/registerFetch';
import {
    RegisterActionEnum,
    TResponseRegisterErrorValid,
    TRegisterError,
    TRegisterFailed,
    TRegisterRequest,
    TRegisterSuccess,
} from '../../types/RegisterStore';

function* getDataSaga(
    registerRequest: TRegisterRequest,
): Generator<
    | CallEffect<TResponseRegisterErrorValid>
    | PutEffect<TRegisterSuccess>
    | PutEffect<TRegisterError>
    | PutEffect<TRegisterFailed>,
    void,
    TResponseRegisterErrorValid
> {
    try {
        const data: TResponseRegisterErrorValid = yield call(
            registerFetchData.bind(null, registerRequest.payload),
        );
        if (data.validErr) {
            yield put(registerError(data.errors));
        } else {
            yield put(registerSuccess());
        }
    } catch (error) {
        yield put(registerFailed());
    }
}

export function* watcherRegisterSaga(): Generator<ForkEffect<never>, void, unknown> {
    yield takeEvery(RegisterActionEnum.REGISTER_REQUEST, getDataSaga);
}
