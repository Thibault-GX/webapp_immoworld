import React from "react";
import logo from './logo.svg';
import './App.css';
import {createBrowserHistory} from "history";
import {Route, Router, Switch} from "react-router-dom";

import Home from "./views/Home/Home.js";

import Navbar from "./components/Navbar/Navbar";


const hist = createBrowserHistory();

function App() {
  return (
    <div className="App">
        <header>
            <Navbar />
        </header>
      <Router history={hist}>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
