import { Avatar, Button, List } from 'antd';
import React from 'react';
import { ServerPort } from '../config';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import io from '../Socket';

const Notification: React.FC = () => {
    const { user } = useTypedSelector((state) => state.UserReducer);
    const { newFrends } = useTypedSelector((state) => state.NotificationReducer);
    const { clearNotification, clearFrendNotification } = useTypeDispatch();

    React.useEffect(() => {
        clearNotification();
        localStorage.removeItem('countNotifications');
        if (user!.unreadNotificationAplicationFrends!.length > 0) {
            io.emit('USER:CLEAR_UREAD_NOTIFICATION_APLICATION_FRENDS', user?._id);
        }
        if (user!.newNotificationFrends!.length > 0) {
            io.emit('USER:CLEAR_NEW_FRENDS_NOTIFICATION', user?._id);
        }
        return () => {
            clearFrendNotification();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addFrend = async (frendId: string) => {
        io.emit('USER:ADD_FREND', user?._id, frendId);
    };

    return (
        <>
            {user?.applicationFrends.length === 0 && newFrends.length === 0 ? (
                <h1>Нет Уведомлений</h1>
            ) : null}
            {user?.applicationFrends.length !== 0 ? (
                <>
                    <h1>Заявки на Дружбу</h1>
                    <List
                        itemLayout="horizontal"
                        dataSource={user?.applicationFrends}
                        renderItem={(potontialFrend) => (
                            <List.Item
                                actions={[
                                    <Button
                                        type="link"
                                        onClick={addFrend.bind(null, potontialFrend._id)}>
                                        Принять запрос дружбы
                                    </Button>,
                                ]}>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            src={
                                                potontialFrend?.avatar
                                                    ? ServerPort +
                                                      '/avatar/' +
                                                      potontialFrend?.avatar
                                                    : './notAvatar.jpg'
                                            }
                                        />
                                    }
                                    title={potontialFrend.nicname}
                                    description={potontialFrend.email}
                                />
                            </List.Item>
                        )}
                    />
                </>
            ) : null}
            {newFrends.length !== 0 ? (
                <>
                    <h1>Ваш запрос дружбы приняли</h1>
                    <List
                        itemLayout="horizontal"
                        dataSource={newFrends}
                        renderItem={(newFrend) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            src={
                                                newFrend?.avatar
                                                    ? ServerPort + '/avatar/' + newFrend?.avatar
                                                    : './notAvatar.jpg'
                                            }
                                        />
                                    }
                                    title={newFrend.nicname}
                                    description={newFrend.email}
                                />
                            </List.Item>
                        )}
                    />
                </>
            ) : null}
        </>
    );
};

export default Notification;
