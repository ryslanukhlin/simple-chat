import React from 'react';
import { Avatar, Button, List } from 'antd';

import { IUser } from '../types/UserStore';
import { useTypedSelector } from '../hooks/useTypedSelector';
import io from '../Socket';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import { ServerPort } from '../config';

interface props {
    user: IUser;
}

const SearchFrendsItem: React.FC<props> = ({ user }) => {
    const [isAplication, setIsAplication] = React.useState<boolean>(false);
    const { user: MyProfile } = useTypedSelector((state) => state.UserReducer);
    const { token } = useTypedSelector((state) => state.AuthReducer);
    const { userGetInfo } = useTypeDispatch();

    const addFrend = (userId: string, frendId: string) => {
        io.emit('USER:ADD_FREND_REQUEST', userId, frendId);
        setIsAplication(true);
        userGetInfo(token || localStorage.getItem('token')!, false);
    };

    return (
        <List.Item
            actions={[
                <Button
                    type="link"
                    disabled={
                        isAplication ||
                        MyProfile?.requestFrends.some((person) => person._id === user._id) ||
                        MyProfile?.frends.some((person) => person._id === user._id)
                    }
                    onClick={addFrend.bind(null, MyProfile?._id!, user._id)}>
                    Добавить в друзья
                </Button>,
            ]}>
            <List.Item.Meta
                avatar={
                    <Avatar
                        src={
                            user.avatar ? ServerPort + '/avatar/' + user.avatar : './notAvatar.jpg'
                        }
                    />
                }
                title={user.nicname}
                description={user.email}
            />
        </List.Item>
    );
};

export default SearchFrendsItem;
