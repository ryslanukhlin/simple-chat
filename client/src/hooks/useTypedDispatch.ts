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
    addMessageNotification,
    clearMessageNotification,
    setMessageNotification,
} from '../store/reducers/NotificationReducer';
import { setCollepsed } from '../store/reducers/PagesMetadataReducer';

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
    setCollepsed,
    addMessageNotification,
    clearMessageNotification,
    setMessageNotification,
};

export const useTypeDispatch = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actionCreater, dispatch);
};
