import { Avatar, Button, List } from 'antd';
import React from 'react';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import io from '../Socket';

const Notification: React.FC = () => {
    const { user } = useTypedSelector((state) => state.UserReducer);
    const { token } = useTypedSelector((state) => state.AuthReducer);
    const { newFrends } = useTypedSelector((state) => state.NotificationReducer);
    const { userGetInfo, clearNotification, clearFrendNotification } = useTypeDispatch();

    React.useEffect(() => {
        clearNotification();
        localStorage.removeItem('countNotifications');
        return () => {
            clearFrendNotification();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addFrend = async (frendId: string) => {
        io.emit('USER:ADD_FREND', user?._id, frendId);
        userGetInfo(localStorage.getItem('token') || token!, false);
    };

    return (
        <>
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
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
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
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
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
