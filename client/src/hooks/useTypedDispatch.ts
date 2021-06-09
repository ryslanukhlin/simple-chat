import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { registerRequest, closeAlertSuccess } from '../store/reducers/RegisterReducer';

const actionCreater = {
    registerRequest,
    closeAlertSuccess,
};

export const useTypeDispatch = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actionCreater, dispatch);
};
