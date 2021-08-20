import React, {useCallback, useEffect, useState} from "react";
import './App.css';
import {createBrowserHistory} from "history";
import {Route, Router, Switch, useLocation} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./views/Home/Home.js";
import Header from "./components/Header/Header";
import Appointments from "./views/Appointments/Appointments";
import AppointmentsDetails from "./components/AppointmentsDetails/AppointmentsDetails";
import {AuthProvider} from "./context/auth";
import Logout from "./components/Logout/Logout";
import API from './api';
import {useAuth} from "./context/auth";
import Estates from "views/Estates/Estates";
import Login from "./views/Login/Login";
import UsersList from "components/Users/UsersList";
import 'rsuite/dist/styles/rsuite-default.css';
import Store from './Store/AuthReducer';
import {Provider} from 'react-redux';
import {logout} from './Store/AuthAction'
import { useDispatch, useSelector } from 'react-redux';
import AvatarGeneration from "components/Avatar/Avatar";

const hist = createBrowserHistory();

const Routes = () => {
    const state = useSelector(state => state);
    console.log(state);
    const lastname = state.islogged ? state.data.lastname : "" ;
    const firstname = state.islogged ? state.data.firstname : "";

    const [showHeader, setShowHeader] = useState(false);

    const {pathname} = useLocation();

    const hiddenInRoutes = ['/login'];


    const [screen, setScreen] = React.useState({
        x : window.screen.width,
        y : window.screen.height
    })
    const [change,setChange] = React.useState(false);

    useEffect(() => {
        setShowHeader(!hiddenInRoutes.includes(pathname));
    }, [hiddenInRoutes, pathname]);

    React.useEffect(function() {
        window.addEventListener('resize', function(){
          setScreen({ x : window.screen.width, y : window.screen.height});
        });
    },[change,setChange])

    // Retourne les différentes routes et le header.
    return (
        <div>
            {showHeader ? (<Header/>) : null}
            <main className={screen.x > 1024 ? !showHeader ? ("no-padding") : null : "mainMobile" } id="mainMobile">
                {showHeader ? <AvatarGeneration name="+" path="/addEstates" firstname={firstname} lastname={lastname}/> : null}
                <Switch>
                    <PrivateRoute exact path="/home" component={Home}/>
                    <PrivateRoute path="/logout" component={Logout}/>
                    <PrivateRoute path="/estates" component={Estates}/>
                    <PrivateRoute path="/appointments" component={Appointments}/>
                    <PrivateRoute path="/users" component={UsersList}/>
                    <Route path="/" component={Login}/> 
                    <PrivateRoute path="/appointment/:id" component={AppointmentsDetails} />
                </Switch>
            </main>
        </div>
    );
}

const WithAxios = ({children}) => {
    const state = useSelector(state => state);
    const isUserAuth = state.islogged;
    const dispatch = useDispatch();
  
    const handleLogout = useCallback(
      () => {
          dispatch(logout())
      },
      [dispatch],
    )

    API.interceptors.request.use(req => {
        if (isUserAuth) {
            const token = state.data.token;
            req.headers.authorization = `Bearer ${token}`;
        }
        return req;
    });

    API.interceptors.response.use(res => res,
        error => {
            if (error.response.status === 401) {
                handleLogout();
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
        <Provider store={Store}>
            <WithAxios>
                <div className="App">
                    <Router history={hist}>
                        <Routes/>
                    </Router>
                </div>
            </WithAxios>
        </Provider>
    );
}

export default App;
