import React, {useState} from "react";
import './Navbar.css';

export default function Navbar(props) {
    const [links] = useState([{
        name: 'Accueil',
        link: '#',
    }, {
        name: 'Agenda',
        link: '#',
    }]);

    return (
        <div className="Navbar">

        </div>
    )
}
