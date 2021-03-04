import React , {useState} from "react";
import axios from 'axios';
import styles from './Login.css';
import Logo from '../../assets/img/examples/clem-onojegaw.jpg'
import { SettingsSystemDaydreamTwoTone } from "@material-ui/icons";
import ReactDatetimeClass from "react-datetime";

 
export default function Login() {

    const [user, setUser] = useState({
        username :"",
        password :""
    })

    const handleChange  = ({currentTarget}) => {
        const {name , value} = currentTarget;
        setUser({...user, [name] :value})
    }

    const handleSubmit = e =>{
        e.preventDefault();
        var body ={
            email:user.username,
            password:user.password
        }
        axios({
            method: 'post',
            url: 'http://immoworld.manusien-ecolelamanu.fr/api/v1/auth',
            data: body
        })
        
        .then(function (response) {
            var data = response.data;
            console.log(data.token);
        })
        .catch(function (error) {
            console.log(error);
        });   
    }

    return (
        <div className="Login">
            <img src={Logo} className="LogoConnection"></img>
            <div className="Connection">
                <h2 className="Titlelogin">Immoworld Connexion</h2>
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
