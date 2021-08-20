import React from 'react';
import {Route, Redirect} from "react-router-dom";
// import {useAuth} from "../../context/auth";
import { useSelector} from 'react-redux';

export default function PrivateRoute({component: Component, ...rest}) {
    // const {isUserAuth} = useAuth();
    const state = useSelector(state => state);
    const isUserAuth = state.islogged;   

    const route = <Route {...rest} render={(props) => (
        <Component {...props} />
    )}/>;
    return (
        isUserAuth ? route : <Redirect to="/login" />
    )
}
