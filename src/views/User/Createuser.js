import React, {useEffect, useState} from "react";
import axios from 'axios';
import styles from './Createuser.css';

export default function Createuser() {
    
    axios({
        method: 'post',
        url: 'http://immoworld.manusien-ecolelamanu.fr/api/v1/auth',
        data: {
            email: user.username,
            password: user.password
        },
    })

}