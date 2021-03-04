import React, { useState } from 'react';
import './LoggedUser.css';
import '../Avatar/Avatar.js';
import { Link } from 'react-router-dom';

export default function LoggedUser(props) {
    return (
        <div>
            <Link to={{pathname: '/account'}} ><Avatar/></Link>
            <p className="text-light">Bonjour, {props.firstname}.</p>
        </div>
    );
}