import React from 'react';
import { Button, Form, Input, Checkbox } from 'antd';
import '../scss/Login.scss';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login: React.FC = () => {
    return (
        <div className="wrapper">
            <Form className="form">
                <Form.Item>
                    <Input prefix={<UserOutlined />} placeholder="Логин" />
                </Form.Item>
                <Form.Item>
                    <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
                </Form.Item>
                <Form.Item>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button className="btn" type="primary">
                        Войти
                    </Button>
                    Or <Link to="/register">Зарегестрироваться</Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
