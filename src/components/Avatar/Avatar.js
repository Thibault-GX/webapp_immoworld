import React from 'react';
import './Avatar.css';

export default function Avatar(props) {

    // tableau des couleurs sélectionnées pour servir de fond pour les avatars des utilisateurs
    const colors = ['#E52B50', '#7BB661', '#2A52BE', '#FF8C00', '#00FF00', '#A2006D', '#FFDF00', '#355E3B', '#FF4F00', '#BDDA57', '#882D17', '#B57EDC', '#6050DC', '#727472', '#FF5349', '#1C39BB', '#436B95', '#FBAB60', '#87FF2A', '#FF6347', '#3F00FF', '#D9381E', '#D470A2', '#EEED09', '#30B21A', '#39A78E'];

    // récupération des initiales (prénom puis nom) d'un utilisateur connecté, puis concaténation en capitales
    function UserInitials(props) {
        let userFirstnameInitial = props.firstname.substring(0,1);
        let userLastnameInitial = props.lastname.substring(0,1);
        var UserInitials = (userLastnameInitial + userFirstnameInitial).toUpperCase();

        return UserInitials;
    }

    // conversion des initiales en nombre entier
    function numberFromInitials(UserInitials) {
        const charCodes = UserInitials
            .split('')
            .map(char => char.charCodeAt(0))
            .join('');

        return parseInt(charCodes, 10);
    }

    // récupération des éléménts possédant la classe .avatar
    const avatar = document.querySelectorAll('.avatar');

    // pour chaque éléments possédant la classe .avatar, on lui attribue un background-color en fonction d'un calcul renvoyant un index du tableau en fonction de ses initiales
    avatar.forEach(avatar => {
        const text = avatar.innerText;
        avatar.style.backgroundColor = colors[numberFromInitials(text) % colors.length];
        
    });
    
    return (
        <div
            className="avatar" 
            title={props.firstname+' '+props.lastname}
            >{ UserInitials(props) }
        </div>
    );
}
