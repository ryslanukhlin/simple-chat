import {
    NotificationActionEnum,
    TNotificationAction,
    TNotificationAdd,
    TNotificationClear,
    TNotificationClearFrend,
    TNotificationNewFrend,
    TNotificationState,
} from '../../types/NotificationStore';
import { IUser } from '../../types/UserStore';

const defautlState: TNotificationState = {
    NotificationCount: 0,
    newFrends: [],
};

export const NotificationReducer = (
    state = defautlState,
    action: TNotificationAction,
): TNotificationState => {
    switch (action.type) {
        case NotificationActionEnum.ADD_NOTIFICATION:
            return { ...state, NotificationCount: state.NotificationCount + 1 };
        case NotificationActionEnum.NEW_FREND_NOTIFICATION:
            return { ...state, newFrends: [...state.newFrends, action.payload] };
        case NotificationActionEnum.CLEAR_NOTIFICATION:
            return { ...state, NotificationCount: 0 };
        case NotificationActionEnum.CLEAR_FREND_NOTIFICATION:
            return { ...state, newFrends: [] };
        default:
            return state;
    }
};

export const addNotification = (): TNotificationAdd => ({
    type: NotificationActionEnum.ADD_NOTIFICATION,
});

export const addNewFrendNotification = (payload: IUser): TNotificationNewFrend => ({
    type: NotificationActionEnum.NEW_FREND_NOTIFICATION,
    payload,
});

export const clearNotification = (): TNotificationClear => ({
    type: NotificationActionEnum.CLEAR_NOTIFICATION,
});

export const clearFrendNotification = (): TNotificationClearFrend => ({
    type: NotificationActionEnum.CLEAR_FREND_NOTIFICATION,
});
