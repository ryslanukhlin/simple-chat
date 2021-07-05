import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useTypedSelector } from './hooks/useTypedSelector';
import HomePage from './pages';

import NotePage from './pages/404';
import Frends from './pages/Frends';
import Login from './pages/Login';
import Message from './pages/Message';
import Messages from './pages/Messages';
import Notification from './pages/Notification';
import Register from './pages/Register';
import PrviateRouter from './PrviateRouter';

const RouterPage: React.FC = () => {
    const { isAuth } = useTypedSelector((state) => state.UserReducer);

    return (
        <Switch>
            <PrviateRouter auth={isAuth} exact path="/" component={HomePage} />
            <PrviateRouter auth={isAuth} exact path="/frends" component={Frends} />
            <PrviateRouter auth={isAuth} exact path="/notification" component={Notification} />
            <PrviateRouter auth={isAuth} exact path="/messages" component={Messages} />
            <PrviateRouter
                auth={isAuth}
                exact
                path="/messages/:MessageRoomId"
                component={Message}
            />
            <Route
                exact
                path="/login"
                component={() => (isAuth ? <Redirect to="/" /> : <Login />)}
            />
            <Route
                exact
                path="/register"
                component={() => (isAuth ? <Redirect to="/" /> : <Register />)}
            />
            <Route path="*" component={NotePage} />
        </Switch>
    );
};

export default RouterPage;
