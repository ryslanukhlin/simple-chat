import { ServerPort } from '../../config';
import { IUser } from '../../types/UserStore';

export const searchUser = async (userId: string, text: string = '') => {
    const response = await fetch(ServerPort + '/searchUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, userId }),
    });
    const data: IUser[] = await response.json();
    return data;
};
