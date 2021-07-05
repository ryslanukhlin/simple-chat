import { ServerPort } from '../../config';
import { IUser } from '../../types/UserStore';

export const userDownloadAvatarFetch = async (formData: FormData, token: string) => {
    const response = await fetch(ServerPort + '/downloadIcon', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
        },
        body: formData,
    });
    if (response.status !== 200) throw new Error();
    const data: IUser = await response.json();
    return data;
};
