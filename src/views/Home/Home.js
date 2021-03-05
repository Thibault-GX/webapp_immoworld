import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import API from '../../api';

export default function Home(props) {

    useEffect(() => {
        API.get(`appointments`).then(response => {
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <Link to={{pathname: '/login'}}>Go To Login</Link>
    )
}
