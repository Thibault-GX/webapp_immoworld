import React from "react";
import {Link} from 'react-router-dom';

export default function Home(props) {
    return (
            <Link to={{pathname: '/login'}}>Go To Login</Link>
    )
}
