import React, {useState} from "react";
import './Navbar.css';
import NavbarLinks from "./Navbar-links/Navbar-links";


export default function Navbar(props) {
    const [screen, setScreen] = React.useState({
        x : window.screen.width,
        y : window.screen.height
    })
    const [change,setChange] = React.useState(false);

    const [links] = useState([{
        name: 'Accueil',
        path: '/',
        icon : 'globe'
    }, {
        name: 'Biens',
        path: '/estates',
        icon :'home'
    },{
        name:'Agenda',
        path:'/appointments',
        icon : 'calendar'
    },{
        name : 'Annuaire',
        path: '/users',
        icon : 'user-info'
    },{
        name: 'Clients',
        path: '/customers',
        icon : 'user-circle'
    },{
        name: 'Déconnexion',
        path: '/logout',
        icon : 'exit'
    }]);
    
    
    React.useEffect(function() {
        window.addEventListener('resize', function(){
          setScreen({ x : window.screen.width, y : window.screen.height});
        });
    },[change,setChange])

    
    return (
        <div className={screen.x > 1024 ? "Navbar" : "NavbarMobile" }>
            <NavbarLinks links={links} />
        </div>
    )
}
