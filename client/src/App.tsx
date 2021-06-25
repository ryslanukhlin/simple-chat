import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserLayout from './component/UserLayout';
import { useTypeDispatch } from './hooks/useTypedDispatch';
import { useTypedSelector } from './hooks/useTypedSelector';

import RouterPage from './Router';
import io from './Socket';
import { IUser } from './types/UserStore';

const App: React.FC = () => {
    const { isAuth, loading, user } = useTypedSelector((state) => state.UserReducer);
    const { token } = useTypedSelector((state) => state.AuthReducer);
    const toketRef = React.useRef<string | null>(token);
    const { userGetInfo, addNotification, addNewFrendNotification, addMessageNotification } =
        useTypeDispatch();

    if (token) toketRef.current = token;

    React.useEffect(() => {
        userGetInfo(token || localStorage.getItem('token')!);
        return () => {
            io.emit('USER:LEAVR_USER', user?._id);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        io.on('USER:Notification_ADD_FREND', () => {
            addNotification();
            userGetInfo(toketRef.current || localStorage.getItem('token')!, false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        io.on('USER:USER:ADD_FREND_SUCCESS', (frend: IUser) => {
            addNotification();
            addNewFrendNotification(frend);
            userGetInfo(toketRef.current || localStorage.getItem('token')!, false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        io.on('MESSAGE:ADD_NOTIFICATIOM_NEW_MESSAGE', (roomId: string) => {
            addMessageNotification(roomId);
            userGetInfo(toketRef.current || localStorage.getItem('token')!, false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // страничка не будет отображена до тех пор пока не получить ответ от сервера
    if (loading) return <></>;

    return (
        <BrowserRouter>
            {isAuth ? (
                <UserLayout>
                    <RouterPage />
                </UserLayout>
            ) : (
                <RouterPage />
            )}
        </BrowserRouter>
    );
};

export default App;
