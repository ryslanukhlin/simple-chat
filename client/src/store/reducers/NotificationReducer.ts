import {
    NotificationActionEnum,
    TNotificationAction,
    TNotificationAdd,
    TNotificationClear,
    TNotificationClearFrend,
    TNotificationMessages,
    TNotificationMessagesAdd,
    TNotificationMessagesClear,
    TNotificationMessagesSet,
    TNotificationNewFrend,
    TNotificationState,
} from '../../types/NotificationStore';
import { MessageBd } from '../../types/socket/messageBd';
import { IUser } from '../../types/UserStore';

const defautlState: TNotificationState = {
    NotificationCount: Number(localStorage.getItem('countNotifications')) || 0,
    newFrends: [],
    NotificationMessages: JSON.parse(localStorage.getItem('NotificationMessages')!) || [],
};

export const NotificationReducer = (
    state = defautlState,
    action: TNotificationAction,
): TNotificationState => {
    switch (action.type) {
        case NotificationActionEnum.ADD_NOTIFICATION:
            localStorage.setItem('countNotifications', String(state.NotificationCount + 1));
            return { ...state, NotificationCount: state.NotificationCount + 1 };
        case NotificationActionEnum.NEW_FREND_NOTIFICATION:
            return { ...state, newFrends: [...state.newFrends, action.payload] };
        case NotificationActionEnum.CLEAR_NOTIFICATION:
            localStorage.removeItem('countNotifications');
            return { ...state, NotificationCount: 0 };
        case NotificationActionEnum.CLEAR_FREND_NOTIFICATION:
            return { ...state, newFrends: [] };
        case NotificationActionEnum.ADD_NOTIFICATION_MESSAGES:
            console.log(3424432);

            const notificationMessage = state.NotificationMessages.find(
                (item) => item.roomId === action.payload,
            );
            if (typeof notificationMessage !== 'undefined') {
                notificationMessage.countNewMessage++;
                const copyNotificationsMessages = [
                    ...state.NotificationMessages.filter((item) => item.roomId !== action.payload),
                    notificationMessage,
                ];
                localStorage.setItem(
                    'NotificationMessages',
                    JSON.stringify(copyNotificationsMessages),
                );
                return {
                    ...state,
                    NotificationMessages: copyNotificationsMessages,
                };
            }
            const copyNotificationsMessages = [
                ...state.NotificationMessages,
                { roomId: action.payload, countNewMessage: 1 },
            ];
            localStorage.setItem('NotificationMessages', JSON.stringify(copyNotificationsMessages));
            return {
                ...state,
                NotificationMessages: copyNotificationsMessages,
            };
        case NotificationActionEnum.SET_NOTIFICATION_MESSAGES:
            const setNotificationsMessages: TNotificationMessages[] = [];
            action.payload.forEach((messageDb) => {
                const NotificationMessage = setNotificationsMessages.find(
                    (NotificationMessage) => NotificationMessage.roomId === messageDb.roomId,
                );
                if (NotificationMessage) NotificationMessage.countNewMessage++;
                else
                    setNotificationsMessages.push({ roomId: messageDb.roomId, countNewMessage: 1 });
            });
            return { ...state, NotificationMessages: setNotificationsMessages };
        case NotificationActionEnum.CLEAR_NOTIFICATION_MESSAGES:
            const copyClearNotificationsMessages = [
                ...state.NotificationMessages.filter((item) => item.roomId !== action.payload),
            ];
            localStorage.setItem(
                'NotificationMessages',
                JSON.stringify(copyClearNotificationsMessages),
            );
            return { ...state, NotificationMessages: copyClearNotificationsMessages };
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

export const addMessageNotification = (payload: string): TNotificationMessagesAdd => ({
    type: NotificationActionEnum.ADD_NOTIFICATION_MESSAGES,
    payload,
});

export const setMessageNotification = (payload: MessageBd[]): TNotificationMessagesSet => ({
    type: NotificationActionEnum.SET_NOTIFICATION_MESSAGES,
    payload,
});

export const clearMessageNotification = (payload: string): TNotificationMessagesClear => ({
    type: NotificationActionEnum.CLEAR_NOTIFICATION_MESSAGES,
    payload,
});
