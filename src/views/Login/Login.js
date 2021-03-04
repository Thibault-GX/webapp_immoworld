import React, {useEffect, useState} from "react";
import axios from 'axios';
import styles from './Login.css';
import Logo from '../../assets/img/examples/clem-onojegaw.jpg'
import Alert from "../../components/Alert/Alert";


export default function Login() {

    const [user, setUser] = useState({username: "", password: ""});
    const [error, setError] = useState(null);

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        setError(null);

        axios({
            method: 'post',
            url: 'http://immoworld.manusien-ecolelamanu.fr/api/v1/auth',
            data: {
                email: user.username,
                password: user.password
            },
        })

            .then(function (response) {
                const {data} = response;
                localStorage.setItem('token', data.token);
                localStorage.setItem('expiresIn', data.expires_in);
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        setError('Identifiants incorrects');
                    }
                }
            });
    }

    return (
        <div className="Login">
            <img src={Logo} className="LogoConnection"></img>
            <div className="Connection">
                <h2 className="Titlelogin">Immoworld Connexion</h2>
                {error ? <Alert error={error} impact='danger' /> : null}
                <form className="FormConnection" onSubmit={handleSubmit}>
                    <label className="LabelConnection">
                        Nom d'utilisateur :
                        <input
                            type="text"
                            name="username"
                            className="InputConnection"
                            onChange={handleChange}
                        />
                    </label>
                    <label className="LabelConnection">
                        Mot de passe :
                        <input
                            type="password"
                            name="password"
                            className="InputConnection"
                            onChange={handleChange}
                        />
                    </label>
                    <input
                        type="submit"
                        value="Connexion"
                        className="InputConnectionSend"
                    />
                </form>
            </div>
        </div>
    )
}
