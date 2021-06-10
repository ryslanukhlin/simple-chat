import { ServerPort } from '../../config';
import { IUser } from '../../types/UserStore';

export const userGetInfoFetch = async (token: string): Promise<IUser> => {
    const response = await fetch(ServerPort + '/user', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
    const data: IUser = await response.json();
    return data;
};
