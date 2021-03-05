import React, {useEffect} from 'react';
import {useAuth} from "../../context/auth";
import {Redirect} from "react-router-dom";

export default function Logout() {
    const {logout} = useAuth();
    useEffect(() => {
        logout();
    });
    return (<Redirect to="/login" />);
}
