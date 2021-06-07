import React from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../scss/Register.scss';

const Register: React.FC = () => {
    return (
        <div className="wrapper">
            <Form className="form">
                <Form.Item>
                    <Input prefix={<UserOutlined />} placeholder="Логин" />
                </Form.Item>
                <Form.Item>
                    <Input prefix={<MailOutlined />} placeholder="Почта" />
                </Form.Item>
                <Form.Item>
                    <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
                </Form.Item>
                <Form.Item>
                    <Input.Password prefix={<LockOutlined />} placeholder="Повторите Пароль" />
                </Form.Item>
                <Form.Item>
                    <Button className="btn" type="primary">
                        Зарегестрироваться
                    </Button>
                    Or <Link to="/login">Войти</Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
