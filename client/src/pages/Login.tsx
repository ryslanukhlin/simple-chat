import React from 'react';
import { Button, Form, Input, Checkbox, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import '../scss/Login.scss';
import { ILoginForm } from '../types/form/LoginForm';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';

const Login: React.FC = () => {
    const { error } = useTypedSelector((state) => state.AuthReducer);
    const { authRequest, closeAlertError } = useTypeDispatch();
    const [isRememmer, setIsRemember] = React.useState<boolean>(false);
    const [logForm, setLogForm] = React.useState<ILoginForm>({
        email: '',
        password: '',
    });

    const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLogForm({ ...logForm, [e.target.name]: e.target.value });
    };

    const onSubmitForm = (): void => {
        authRequest(logForm, isRememmer);
    };

    return (
        <div className="wrapper">
            <Form className="form">
                {error ? (
                    <Alert
                        message="Неверрно введена почта или пароль"
                        type="error"
                        banner={true}
                        closable={true}
                        onClose={closeAlertError}></Alert>
                ) : null}
                <Form.Item>
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="Почта"
                        name="email"
                        value={logForm.email}
                        onChange={onChangeForm}
                    />
                </Form.Item>
                <Form.Item>
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Пароль"
                        name="password"
                        value={logForm.password}
                        onChange={onChangeForm}
                    />
                </Form.Item>
                <Form.Item>
                    <Checkbox onChange={setIsRemember.bind(null, (prev) => !prev)}>
                        Запомнить меня
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button className="btn" type="primary" onClick={onSubmitForm}>
                        Войти
                    </Button>
                    Or <Link to="/register">Зарегестрироваться</Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
