import React from 'react';
import { Input } from 'antd';
import io from '../Socket';
import { useLocation } from 'react-router-dom';

import '../scss/MessageRoom.scss';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { MessageBd } from '../types/socket/messageBd';
import MessagesListItem from '../component/MessagesListItem';
import { IUser } from '../types/UserStore';
import { useTypeDispatch } from '../hooks/useTypedDispatch';

const Message: React.FC = () => {
    const frendRef = React.useRef<IUser>();
    const roomId = useLocation().pathname.split('/')[2];
    const [messages, setMessages] = React.useState<MessageBd[]>([]);
    const { collapsed } = useTypedSelector((state) => state.PagesMetadataReducer);
    const { user } = useTypedSelector((state) => state.UserReducer);
    const { clearMessageNotification } = useTypeDispatch();

    React.useEffect(() => {
        const frend = user?.frends.find((man) => man._id !== user?._id);
        frendRef.current = frend;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        io.emit('MESSAGE:JOIN_MESSAGE_ROOM', roomId, user?._id);
        return () => {
            setMessages([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        io.on('MESSAGE:GET_MESSAGES', (messagesArrDb: MessageBd[]) => {
            setMessages(messagesArrDb);
        });
    }, []);

    React.useEffect(() => {
        io.on('MESSAGE:ACCEPT_MESSAGE', (messagesArrDb: MessageBd[]) => {
            setMessages(messagesArrDb);
        });
    }, []);

    React.useEffect(() => {
        clearMessageNotification(roomId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sendMessage = (message: string) => {
        io.emit('MESSAGE:SEND_MESSAGE', roomId, user?._id, message, frendRef.current?._id);
    };

    return (
        <>
            {messages.length !== 0
                ? messages.map((message) => <MessagesListItem message={message} />)
                : null}
            <div style={{ marginTop: '40px' }}></div>
            <div
                className="wrapper__messageinput"
                style={{ width: `calc(100% - ${collapsed ? 100 : 219}px)` }}>
                <Input.Search
                    placeholder="Введите сообшение"
                    size="large"
                    enterButton="Отправить"
                    onSearch={sendMessage}
                />
            </div>
        </>
    );
};

export default Message;
