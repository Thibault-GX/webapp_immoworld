import React from "react";
import './App.css';
import {createBrowserHistory} from "history";
import {Route, Router, Switch, withRouter} from "react-router-dom";

import Home from "./views/Home/Home.js";
import Login from "./views/Login/Login";
import Header from "./components/Header/Header";
const hist = createBrowserHistory();
const Routes = withRouter((props) => {
    // Permet d'afficher le header si la route actuelle n'est pas dans le tableau.
    const showHeader = () => {
        const hiddenInRoutes = ['/login'];
        const {pathname} = props.location;
        if (!hiddenInRoutes.includes(pathname)) {
            return (<Header/>);
        }
    }

    // Retourne les différentes routes et le header.
    return (
        <div>
            {showHeader()}
            <main>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </main>
        </div>
    );
})

/**
 * Elément Root
 *
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    return (
        <div className="App">
            <Router history={hist}>
                <Routes/>
            </Router>
        </div>
    );
}

export default App;
