import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { registerRequest, closeAlertSuccess } from '../store/reducers/RegisterReducer';
import { authRequest, closeAlertError } from '../store/reducers/AuthReducer';
import { userGetInfo } from '../store/reducers/UserReducer';

const actionCreater = {
    registerRequest,
    closeAlertSuccess,
    authRequest,
    closeAlertError,
    userGetInfo,
};

export const useTypeDispatch = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actionCreater, dispatch);
};
