import React from "react";
import {NavLink} from "react-router-dom";
import './NavbarLinksItems.css'
import {Icon} from 'rsuite';

export default function NavbarLinksItem(props) {
    const {link} = props;

    const [screen, setScreen] = React.useState({
        x : window.screen.width,
        y : window.screen.height
    })
    const [change,setChange] = React.useState(false);

    React.useEffect(function() {
        window.addEventListener('resize', function(){
          setScreen({ x : window.screen.width, y : window.screen.height});
        });
    },[change,setChange])

    return (
        <NavLink className="NavbarLinksItem" activeClassName="active" exact to={link.path}><Icon icon={link.icon} size="2x"/> {screen.x > 1024 ? link.name : "" }</NavLink>
    )
}
