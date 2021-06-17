import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserLayout from './component/UserLayout';
import { useTypeDispatch } from './hooks/useTypedDispatch';
import { useTypedSelector } from './hooks/useTypedSelector';

import RouterPage from './Router';

const App: React.FC = () => {
    const { isAuth, loading } = useTypedSelector((state) => state.UserReducer);
    const { userGetInfo } = useTypeDispatch();

    React.useEffect(() => {
        userGetInfo(localStorage.getItem('token')!);
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
