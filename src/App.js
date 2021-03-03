import React from "react";
import logo from './logo.svg';
import './App.css';
import {createBrowserHistory} from "history";
import {Route, Router, Switch, useLocation} from "react-router-dom";

import Home from "./views/Home/Home.js";

import Navbar from "./components/Navbar/Navbar";
import Login from "./views/Login/Login";


const hist = createBrowserHistory();

const navbarView = () => {
  const location = useLocation();
  console.log(location.pathname);
}
function App() {
  return (
    <div className="App">
      <header>
          {navbarView}
          <Navbar />
      </header>
      <Router history={hist}>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
