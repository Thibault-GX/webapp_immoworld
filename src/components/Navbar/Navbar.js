import React, {useState} from "react";
import NavbarLinks from "./navbar-links/navbar-links";

export default function Navbar(props) {
    const [links] = useState([{
        name: 'Thibault',
        link: 'https://google.com',
    }, {
        name: 'Brian',
        link: 'https://soluclef.com',
    }]);

    return (
        <div style={{width: '100%', height: '50px', backgroundColor: '#FAFAFA'}}>
            <NavbarLinks links={links}/>
        </div>
    )
}
