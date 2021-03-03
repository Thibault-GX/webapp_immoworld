import React from "react";
import {NavLink} from "react-router-dom";
import './NavbarLinksItems.css'

export default function NavbarLinksItem(props) {
    const {link} = props;

    return (
        <NavLink className="NavbarLinksItem" activeClassName="active" exact to={link.path}>{link.name}</NavLink>
    )
}
