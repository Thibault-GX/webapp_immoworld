import React from "react";
import Cookies from 'js-cookie';
import {Redirect} from "react-router-dom";

export default function Home(props) {

    var activeCookie = Cookies.get('Active');

    if (activeCookie == 0 || activeCookie == undefined) {
        return (<Redirect to="/logout"/>);
    }

    return (
        <h1 className="light-title">Bienvenue sur la page d'accueil d'Immoworld</h1>
    );
}
