import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './action';
import { AuthReducer } from './reducers/AuthReducer';
import { RegisterReducer } from './reducers/RegisterReducer';
import { UserReducer } from './reducers/UserReducer';
import { NotificationReducer } from './reducers/NotificationReducer';
import { PagesMetadataReducer } from './reducers/PagesMetadataReducer';

const enhancers: Array<any> = [];
const globalReducer = combineReducers({
    AuthReducer,
    RegisterReducer,
    UserReducer,
    NotificationReducer,
    PagesMetadataReducer,
});

export type TRootState = ReturnType<typeof globalReducer>;

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension =
        ((window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION__()) ||
        compose;
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension);
    }
}

const sagaMiddleware = createSagaMiddleware();
const composedEnhancers = compose(applyMiddleware(sagaMiddleware), ...enhancers);

export const store = createStore(globalReducer, composedEnhancers);
sagaMiddleware.run(rootSaga);
