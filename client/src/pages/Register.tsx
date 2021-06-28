import React from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { IRegisterForm } from '../types/form/RegisterForm';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import '../scss/Register.scss';

const Register: React.FC = () => {
    const { errors, success } = useTypedSelector((state) => state.RegisterReducer);
    const { registerRequest, closeAlertSuccess } = useTypeDispatch();
    const [regForm, setRegForm] = React.useState<IRegisterForm>({
        nicname: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRegForm({ ...regForm, [e.target.name]: e.target.value });
    };

    const onSubmitForm = (): void => {
        registerRequest(regForm);
    };

    return (
        <div className="wrapper">
            <Form className="form">
                {success ? (
                    <Alert
                        message="Регистраия прошла успешно"
                        type="success"
                        banner={true}
                        closable={true}
                        onClose={() => {
                            closeAlertSuccess();
                        }}></Alert>
                ) : null}
                <Form.Item
                    validateStatus={errors?.nicname ? 'error' : 'success'}
                    help={errors?.nicname}>
                    <Input
                        name="nicname"
                        value={regForm.nicname}
                        onChange={onChangeForm}
                        prefix={<UserOutlined />}
                        placeholder="Логин"
                    />
                </Form.Item>
                <Form.Item
                    validateStatus={errors?.email ? 'error' : 'success'}
                    help={errors?.email}>
                    <Input
                        name="email"
                        value={regForm.email}
                        onChange={onChangeForm}
                        prefix={<MailOutlined />}
                        placeholder="Почта"
                    />
                </Form.Item>
                <Form.Item
                    validateStatus={errors?.password ? 'error' : 'success'}
                    help={errors?.password}>
                    <Input.Password
                        name="password"
                        value={regForm.password}
                        onChange={onChangeForm}
                        prefix={<LockOutlined />}
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item
                    validateStatus={errors?.repeatPassword ? 'error' : 'success'}
                    help={errors?.repeatPassword}>
                    <Input.Password
                        name="repeatPassword"
                        value={regForm.repeatPassword}
                        onChange={onChangeForm}
                        prefix={<LockOutlined />}
                        placeholder="Повторите Пароль"
                    />
                </Form.Item>
                <Form.Item>
                    <Button className="btn" type="primary" onClick={onSubmitForm}>
                        Зарегестрироваться
                    </Button>
                    Или <Link to="/login">Войти</Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
