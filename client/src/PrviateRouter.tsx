import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface props {
    component: React.ComponentType<any>;
    path: string;
    auth: boolean;
    exact?: boolean;
}

const PrviateRouter: React.FC<props> = ({ component: Component, auth, ...props }) => (
    <Route render={() => (auth === false ? <Redirect to="/login" /> : <Component {...props} />)} />
);

export default PrviateRouter;
