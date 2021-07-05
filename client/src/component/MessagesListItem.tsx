import React from 'react';
import { Avatar, Comment } from 'antd';
import { MessageBd } from '../types/socket/messageBd';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IUser } from '../types/UserStore';
import { ServerPort } from '../config';

interface Props {
    message: MessageBd;
}

const MessagesListItem: React.FC<Props> = ({ message }) => {
    const [isMy, setIsMy] = React.useState<boolean>();
    const [frendInfo, setFrendInfo] = React.useState<IUser | null>();
    const { user } = useTypedSelector((state) => state.UserReducer);

    React.useEffect(() => {
        if (user?._id !== message.user) {
            setIsMy(false);
            setFrendInfo(user?.frends.find((frend) => frend._id === message.user));
        } else setIsMy(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Comment
            author={isMy ? user?.nicname : frendInfo?.nicname}
            content={<p>{message.text}</p>}
            style={{ backgroundColor: isMy ? 'lightblue' : 'white' }}
            avatar={
                <Avatar
                    src={
                        isMy
                            ? user?.avatar
                                ? ServerPort + '/avatar/' + user.avatar
                                : '../notAvatar.jpg'
                            : frendInfo?.avatar
                            ? ServerPort + '/avatar/' + frendInfo.avatar
                            : '../notAvatar.jpg'
                    }
                />
            }
        />
    );
};

export default MessagesListItem;
