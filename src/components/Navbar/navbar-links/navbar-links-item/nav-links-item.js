import React from "react";

export default function NavbarLinksItem(props) {
    const {link} = props;

    return (
        <li style={{marginRight: '20px'}}><a href={link.link} target="_blank">{link.name}</a></li>
    )
}
