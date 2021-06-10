import React from 'react'
import {Link} from 'react-router-dom';
import './Appointment.css';

const Appointment = ({appointment}) => {
    return (
        <div className="Appointment">
            <h2>{appointment.contactName}</h2>
            <p>{appointment.dateTime}</p>
            <Link to={{pathname: `/appointment/${appointment.id}`}} className="ButtonAppointmentsDetails">Détails</Link>
        </div>
    )
}

export default Appointment
