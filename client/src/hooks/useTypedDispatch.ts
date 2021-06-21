import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { registerRequest, closeAlertSuccess } from '../store/reducers/RegisterReducer';
import { authRequest, closeAlertError } from '../store/reducers/AuthReducer';
import { userGetInfo } from '../store/reducers/UserReducer';
import {
    addNotification,
    clearNotification,
    addNewFrendNotification,
    clearFrendNotification,
} from '../store/reducers/NotificationReducer';

const actionCreater = {
    registerRequest,
    closeAlertSuccess,
    authRequest,
    closeAlertError,
    userGetInfo,
    addNotification,
    clearNotification,
    addNewFrendNotification,
    clearFrendNotification,
};

export const useTypeDispatch = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actionCreater, dispatch);
};
