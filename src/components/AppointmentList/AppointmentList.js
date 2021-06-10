import React from 'react';
import './AppointmentList.css';

const AppointmentList = ({children}) => {
    return (
        <div className="AppointmentList">
            <h1>Liste des rendez-vous </h1>
            {children}
        </div>
    )
}

export default AppointmentList;