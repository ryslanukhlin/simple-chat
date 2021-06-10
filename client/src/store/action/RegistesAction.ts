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
    TResponseRegisterSuccess,
} from '../../types/RegisterStore';

function* getDataRegister(
    registerRequest: TRegisterRequest,
): Generator<
    | CallEffect<TResponseRegisterErrorValid | TResponseRegisterSuccess>
    | PutEffect<TRegisterSuccess>
    | PutEffect<TRegisterError>
    | PutEffect<TRegisterFailed>,
    void,
    TResponseRegisterErrorValid
> {
    try {
        const data: TResponseRegisterErrorValid | TResponseRegisterSuccess = yield call(
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
    yield takeEvery(RegisterActionEnum.REGISTER_REQUEST, getDataRegister);
}
