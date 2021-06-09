import { all } from '@redux-saga/core/effects';
import { watcherRegisterSaga } from './RegistesAction';

export default function* rootSaga() {
    yield all([watcherRegisterSaga()]);
}
