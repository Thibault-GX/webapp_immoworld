import React, {useLayoutEffect, useState} from "react";
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
    const hiddenInRoutes = ['/login'];
    const {pathname} = useLocation();
    const [showHeader, setShowHeader] = useState(false);

    useLayoutEffect(() => {
        setShowHeader(!hiddenInRoutes.includes(pathname));
    }, [pathname]);

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
    return (
        <AuthContext.Provider value={true}>
            <div className="App">
                <Router history={hist}>
                    <Routes/>
                </Router>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
