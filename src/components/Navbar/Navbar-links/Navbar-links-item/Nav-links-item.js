import React from "react";
import {NavLink} from "react-router-dom";
import './NavbarLinksItems.css'
import {Icon} from 'rsuite';

export default function NavbarLinksItem(props) {
    const {link} = props;

    return (
        <NavLink className="NavbarLinksItem" activeClassName="active" exact to={link.path}><Icon icon={link.icon} size="2x"/> {link.name}</NavLink>
    )
}
