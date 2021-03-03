import React from "react";
import styles from './Login.css';
import Logo from '../../assets/img/examples/clem-onojegaw.jpg'
export default function Login(props) {
    return (
        <div className="Login">
            <img src={Logo} className="LogoConnection"></img>
            <div className="Connection">
                <h2 className="Titlelogin">Immoworld Connexion</h2>
                <form className="FormConnection">
                <label className="LabelConnection">
                    Nom d'utilisateur :
                    <input type="text" name="name" className="InputConnection"/>
                </label>
                <label className="LabelConnection">
                    Mot de passe :
                    <input type="password" name="password" className="InputConnection" />
                </label>
                <input type="submit" value="Connexion" className="InputConnectionSend"/>
                </form>
            </div>
        </div>
    )
}
