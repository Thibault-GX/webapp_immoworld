import React, {useEffect, useState} from "react";
import './App.css';
import {createBrowserHistory} from "history";
import {Route, Router, Switch, useLocation} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import Home from "./views/Home/Home.js";
import Login from "./views/Login/Login";
import Header from "./components/Header/Header";
import {AuthContext} from "./context/auth";

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
                    <Route path="/login" component={Login}/>
                </Switch>
            </main>
        </div>
    );
}

/**
 * Elément Root
 *
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    const [isAuth, setIsAuth] = useState(null);

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
            <div className="App">
                <Router history={hist}>
                    <Routes/>
                </Router>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
