import React from "react";
import NavbarLinksItem from "./Navbar-links-item/Nav-links-item";
import './NavbarLinks.css';

export default function NavbarLinks(props) {
    const {links} = props;

    return (
        <nav className="NavbarLinks">
            {links.map((link, i) => {
                return (<NavbarLinksItem link={link} key={i}/>);
            })}
        </nav>
    )
}
