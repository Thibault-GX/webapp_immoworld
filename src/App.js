import React, {useEffect, useState} from "react";
import './App.css';
import {createBrowserHistory} from "history";
import {Route, Router, Switch, useLocation} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import Home from "./views/Home/Home.js";
import Login from "./views/Login/Login";
import Header from "./components/Header/Header";
import Appointments from "./views/Appointments/Appointments";
import {AuthContext} from "./context/auth";
import {AuthProvider} from "./context/auth";
import Logout from "./components/Logout/Logout";
import API from './api';
import {useAuth} from "./context/auth";

const hist = createBrowserHistory();

const Routes = () => {
    const [showHeader, setShowHeader] = useState(false);

    const {pathname} = useLocation();
    const hiddenInRoutes = ['/login'];

    useEffect(() => {
        setShowHeader(!hiddenInRoutes.includes(pathname));
    }, [hiddenInRoutes, pathname]);


    // Retourne les différentes routes et le header.
    return (
        <div>
            {showHeader ? (<Header/>) : null}
            <main className={!showHeader ? ("no-padding") : null}>
                <Switch>
                    <PrivateRoute exact path="/" component={Home}/>
                    <PrivateRoute path="/logout" component={Logout}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/appointments" component={Appointments}/>
                </Switch>
            </main>
        </div>
    );
}

const WithAxios = ({children}) => {
    const {isUserAuth, logout} = useAuth();
    API.interceptors.request.use(req => {
        if (isUserAuth) {
            const token = localStorage.getItem('token');
            req.headers.authorization = `Bearer ${token}`;
        }
        return req;
    });

    API.interceptors.response.use(res => res,
        error => {
            if (error.response.status === 401) {
                logout();
            }
            return Promise.reject(error);
        }
    );

    return children;
}

/**
 * Elément Root
 *
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    return (
        <AuthProvider>
            <WithAxios>
                <div className="App">
                    <Router history={hist}>
                        <Routes/>
                    </Router>
                </div>
            </WithAxios>
        </AuthProvider>
    );
}

export default App;
