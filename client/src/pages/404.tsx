import React from 'react';

import UserLayout from '../component/UserLayout';
import { useTypedSelector } from '../hooks/useTypedSelector';

const NotePage: React.FC = () => {
    const { isAuth } = useTypedSelector((state) => state.UserReducer);

    return isAuth ? (
        <h1>404</h1>
    ) : (
        <UserLayout>
            <h1>404</h1>
        </UserLayout>
    );
};

export default NotePage;
