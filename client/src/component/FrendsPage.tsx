import { Avatar, List } from 'antd';
import React from 'react';
import { ServerPort } from '../config';
import { useTypedSelector } from '../hooks/useTypedSelector';

const FrendsPage: React.FC = () => {
    const { frends } = useTypedSelector((state) => state.UserReducer.user!);

    if (frends.length === 0) return null;

    return (
        <>
            <h1>Ваши Друзья</h1>
            <List
                dataSource={frends}
                renderItem={(frend) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={
                                        frend.avatar
                                            ? ServerPort + '/avatar/' + frend.avatar
                                            : './notAvatar.jpg'
                                    }
                                />
                            }
                            title={frend.nicname}
                            description={frend.email}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};

export default FrendsPage;
