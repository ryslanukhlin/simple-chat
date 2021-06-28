import { MessageBd } from './socket/messageBd';
import { IUser } from './UserStore';

export type TNotificationMessages = {
    roomId: string;
    countNewMessage: number;
};

export type TNotificationState = {
    NotificationCount: number;
    newFrends: IUser[];
    NotificationMessages: TNotificationMessages[];
};

export enum NotificationActionEnum {
    ADD_NOTIFICATION = 'ADD_NOTIFICATION',
    NEW_FREND_NOTIFICATION = 'NEW_FREND_NOTIFICATION',
    CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION',
    CLEAR_FREND_NOTIFICATION = 'CLEAR_FREND_NOTIFICATION',
    ADD_NOTIFICATION_MESSAGES = 'ADD_NOTIFICATION_MESSAGES',
    SET_NOTIFICATION_MESSAGES = 'SET_NOTIFICATION_MESSAGES',
    CLEAR_NOTIFICATION_MESSAGES = 'CLEAR_NOTIFICATION_MESSAGES',
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

export type TNotificationMessagesAdd = {
    type: NotificationActionEnum.ADD_NOTIFICATION_MESSAGES;
    payload: string;
};

export type TNotificationMessagesSet = {
    type: NotificationActionEnum.SET_NOTIFICATION_MESSAGES;
    payload: MessageBd[];
};

export type TNotificationMessagesClear = {
    type: NotificationActionEnum.CLEAR_NOTIFICATION_MESSAGES;
    payload: string;
};

export type TNotificationAction =
    | TNotificationAdd
    | TNotificationClear
    | TNotificationNewFrend
    | TNotificationClearFrend
    | TNotificationMessagesAdd
    | TNotificationMessagesSet
    | TNotificationMessagesClear;
