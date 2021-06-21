import { IUser } from './UserStore';

export type TNotificationState = {
    NotificationCount: number;
    newFrends: IUser[];
};

export enum NotificationActionEnum {
    ADD_NOTIFICATION = 'ADD_NOTIFICATION',
    NEW_FREND_NOTIFICATION = 'NEW_FREND_NOTIFICATION',
    CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION',
    CLEAR_FREND_NOTIFICATION = 'CLEAR_FREND_NOTIFICATION',
}

export type TNotificationAdd = {
    type: NotificationActionEnum.ADD_NOTIFICATION;
};

export type TNotificationNewFrend = {
    type: NotificationActionEnum.NEW_FREND_NOTIFICATION;
    payload: IUser;
};

export type TNotificationClear = {
    type: NotificationActionEnum.CLEAR_NOTIFICATION;
};

export type TNotificationClearFrend = {
    type: NotificationActionEnum.CLEAR_FREND_NOTIFICATION;
};

export type TNotificationAction =
    | TNotificationAdd
    | TNotificationClear
    | TNotificationNewFrend
    | TNotificationClearFrend;
