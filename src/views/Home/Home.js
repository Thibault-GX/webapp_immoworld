import React, {useEffect} from "react";
import API from '../../api';

export default function Home(props) {

    useEffect(() => {
        API.get(`appointments`).then(response => {
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <h1>Bienvenue sur la page d'accueil d'Immoworld</h1>
    )
}
