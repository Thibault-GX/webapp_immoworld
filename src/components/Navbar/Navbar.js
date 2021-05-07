import React, {useState} from "react";
import './Navbar.css';
import NavbarLinks from "./Navbar-links/Navbar-links";


export default function Navbar(props) {
    const [links] = useState([{
        name: 'Accueil',
        path: '/',
        icon : 'home'
    }, {
        name: 'Biens',
        path: '/estates',
        icon :'home'
    },{
        name:'Agenda',
        path:'/appointments',
        icon : 'calendar'
    },{
        name: 'Déconexion',
        path: '/logout',
        icon : 'exit'
    }]);

    return (
        <div className="Navbar">
            <NavbarLinks links={links} />
        </div>
    )
}
