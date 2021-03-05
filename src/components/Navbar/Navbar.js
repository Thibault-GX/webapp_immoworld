import React, {useState} from "react";
import './Navbar.css';
import NavbarLinks from "./Navbar-links/Navbar-links";

export default function Navbar(props) {
    const [links] = useState([{
        name: 'Accueil',
        path: '/',
    }, {
        name: 'Login',
        path: '/login',
    },{
        name:'Agenda',
        path:'/appointments'
    }]);

    return (
        <div className="Navbar">
            <NavbarLinks links={links} />
        </div>
    )
}
