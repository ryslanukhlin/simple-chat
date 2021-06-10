import { ServerPort } from '../../config';
import { IRegisterForm } from '../../types/form/RegisterForm';
import { TResponseRegisterErrorValid, TResponseRegisterSuccess } from '../../types/RegisterStore';

export const registerFetchData = async (
    registerForm: IRegisterForm,
): Promise<TResponseRegisterErrorValid | TResponseRegisterSuccess> => {
    const response = await fetch(ServerPort + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerForm),
    });
    const data: TResponseRegisterErrorValid = await response.json();
    return data;
};
