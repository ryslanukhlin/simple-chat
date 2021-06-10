import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useTypeDispatch } from './hooks/useTypedDispatch';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
    const { userGetInfo } = useTypeDispatch();

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            userGetInfo(localStorage.getItem('token')!);
        }
    }, [userGetInfo]);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route path="*" component={() => <h1>404</h1>} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
