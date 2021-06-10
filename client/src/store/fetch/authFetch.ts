import { ServerPort } from '../../config';
import { TAuthResponseError } from '../../types/AuthStore';
import { ILoginForm } from '../../types/form/LoginForm';

export const authFetchData = async (authForm: ILoginForm) => {
    const response = await fetch(ServerPort + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authForm),
    });
    const data: TAuthResponseError = await response.json();
    return data;
};
