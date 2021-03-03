import React from "react";
import NavbarLinksItem from "./navbar-links-item/nav-links-item";

export default function NavbarLinks(props) {
    const {links} = props;

    return (
        <nav style={{display: 'flex', alignItems: 'center'}}>
            <ul style={{display: 'flex', listStyleType: 'none'}}>
                {links.map((link) => {
                    return (<NavbarLinksItem link={link}/>);
                })}
            </ul>
        </nav>
    )
}
