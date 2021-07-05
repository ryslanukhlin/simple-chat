import React from 'react';
import { Alert, Avatar, Button, Typography } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useTypedSelector } from '../hooks/useTypedSelector';

import '../scss/HomePage.scss';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import io from '../Socket';
import { ServerPort } from '../config';

const Title = Typography.Title;

const HomePage: React.FC = () => {
    const avatarInput = React.useRef<HTMLInputElement>(null);
    const { user, isFailedDownloadAvatar } = useTypedSelector((state) => state.UserReducer);
    const { token } = useTypedSelector((state) => state.AuthReducer);
    const { userOutput, userDownloadAvatar, semoveFailedDownloadAvatar } = useTypeDispatch();

    const outUser = () => {
        userOutput();
        io.emit('USER:LEAVR_USER', user?._id);
    };

    const clickDownloadBtn = () => {
        avatarInput.current?.click();
    };

    const downloadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        formData.append('avatar', e.target.files![0]);
        userDownloadAvatar(formData, localStorage.getItem('token') || token!);
    };

    return (
        <div>
            {isFailedDownloadAvatar ? (
                <Alert
                    type="error"
                    message="Не удалось загрузить изображение"
                    onClose={semoveFailedDownloadAvatar}
                    closable
                />
            ) : null}
            <Avatar
                src={ServerPort + '/avatar/' + user?.avatar}
                shape="square"
                size={128}
                icon={<UserOutlined />}
            />
            <Button
                onClick={clickDownloadBtn}
                className="download__avatar"
                icon={<UploadOutlined />}>
                Загрузить Изображение
            </Button>
            <input
                onChange={downloadAvatar}
                ref={avatarInput}
                type="file"
                style={{ display: 'none' }}
            />
            <Title className="Title__nicname">Никнейм: {user?.nicname}</Title>
            <Title className="Title__email" level={2}>
                Почта: {user?.email}
            </Title>
            <Button onClick={outUser} type="primary" danger>
                Выход
            </Button>
        </div>
    );
};

export default HomePage;
