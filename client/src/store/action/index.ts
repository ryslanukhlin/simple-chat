import { all } from '@redux-saga/core/effects';

import { watcherAuthSaga } from './AuthAction';
import { watcherRegisterSaga } from './RegistesAction';
import { watcherUserSaga } from './UserAction';

export default function* rootSaga() {
    yield all([watcherRegisterSaga(), watcherAuthSaga(), watcherUserSaga()]);
}
