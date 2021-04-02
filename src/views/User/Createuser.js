import React from "react";
import './Createuser.css';
import API from '../../api';

export default function CreateUser() {
    


    const [formValues, setFormValues] = React.useState({
        lastname: '',
        firstname : '',
        email : '',
        phone : '',
        userRole : '',
        agency : '',
        password : '',
    });

    const handleChange = (e) => {
        formValues[e.target.id] = e.target.value;
        setFormValues({...formValues});
    }

    return (
        <div className="createUserForm">
            <form>
                <div>
                    <label for="lastname">Nom</label>
                    <input id="lastname" type="text" placeholder="MARTIN"></input>
                </div>
                <div>
                    <label for="firstname">Prénom</label>
                    <input id="firstname" type="text" placeholder="Pierre"></input>
                </div>
                <div>
                    <label for="email">Adresse email</label>
                    <input id="email" type="email"></input>
                </div>
                <div>
                    <label for="phone">Numéro de téléphone</label>
                    <input id="phone" type="tel"></input>
                </div>
                <div>
                    <label for="userRole">Rôle utilisateur</label>
                    <select id="userRole">
                        <option>Veuillez sélectionner le rôle de votre futur utilisateur...</option>
                        <Userroles/>
                    </select>
                </div>
                <div>
                    <label for="agency">Agence de rattachement</label>
                    <select id="agency">
                        <option>Veuillez choisir à quelle agence sera rattaché votre futur utilisateur...</option>
                        <Agencies/>
                    </select>
                </div>
                <div>
                    <label for="newUserPassword">Mot de passe du nouvel utilisateur</label>
                    <input id="newUserPassword" type="text"></input>
                </div>
                <input type="submit">Créer le nouvel utilisateur</input>
            </form>
        </div>
    )

}