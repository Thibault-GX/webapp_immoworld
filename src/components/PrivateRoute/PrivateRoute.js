import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {useAuth} from "../../context/auth";

export default function PrivateRoute({component: Component, ...rest}) {
    const route = <Route {...rest} render={(props) => (
        <Component {...props} />
    )}/>;
    return (
        useAuth() ? route : <Redirect to="/login" />
    )
}
