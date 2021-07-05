import React from 'react';
import { Avatar, List } from 'antd';
import { IRoom, IUser } from '../types/UserStore';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useHistory } from 'react-router-dom';

import '../scss/MessageItem.scss';
import { TNotificationMessages } from '../types/NotificationStore';
import { ServerPort } from '../config';

interface Props {
    room: IRoom;
}

const MessageItem: React.FC<Props> = ({ room }) => {
    const frendRef = React.useRef<IUser>();
    const router = useHistory();
    const [notificationMessage, setNotificationMessage] = React.useState<TNotificationMessages>();
    const { user } = useTypedSelector((state) => state.UserReducer);
    const { NotificationMessages } = useTypedSelector((state) => state.NotificationReducer);

    React.useEffect(() => {
        const frend = room.users.find((man) => man._id !== user?._id);
        frendRef.current = frend;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        const notificationMessage = NotificationMessages.find((item) => item.roomId === room._id);
        if (notificationMessage) setNotificationMessage(notificationMessage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [NotificationMessages]);

    const goMessage = (): void => {
        router.push('/messages/' + room._id);
    };

    if (typeof frendRef.current === 'undefined') return null;

    return (
        <List.Item
            onClick={goMessage}
            className="MessageItem"
            actions={[
                notificationMessage && notificationMessage.countNewMessage !== 0 ? (
                    <div className="badgeMessageItem">+{notificationMessage?.countNewMessage}</div>
                ) : null,
            ]}>
            <List.Item.Meta
                avatar={
                    <Avatar
                        src={
                            frendRef.current.avatar
                                ? ServerPort + '/avatar/' + frendRef.current.avatar
                                : './notAvatar.jpg'
                        }
                    />
                }
                title={frendRef.current.nicname}
                description={frendRef.current.email}
            />
        </List.Item>
    );
};

export default MessageItem;
