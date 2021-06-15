import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserLayout from './component/UserLayout';
import { useTypeDispatch } from './hooks/useTypedDispatch';
import { useTypedSelector } from './hooks/useTypedSelector';

import RouterPage from './Router';

const App: React.FC = () => {
    const { isAuth } = useTypedSelector((state) => state.UserReducer);
    const { userGetInfo } = useTypeDispatch();

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            userGetInfo(localStorage.getItem('token')!);
        }
    }, []);

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
