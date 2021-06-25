import React from 'react';
import { List } from 'antd';
import { useTypedSelector } from '../hooks/useTypedSelector';
import MessageItem from '../component/MessageItem';

const Messages: React.FC = () => {
    const { rooms } = useTypedSelector((state) => state.UserReducer.user!);

    if (rooms.length === 0) return <h1>Сначало вам необходимо завести друзей</h1>;

    return <List bordered dataSource={rooms} renderItem={(room) => <MessageItem room={room} />} />;
};

export default Messages;
