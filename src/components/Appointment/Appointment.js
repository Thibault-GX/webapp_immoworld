import React from 'react'
import {Link} from 'react-router-dom';
import Img  from '../../assets/img/faces/avatar_default.png'

const Appointment = ({appointment}) => {
    return (
        <div className="Appointment">
            <img src={Img}></img>
            <h2>{appointment.contactName}</h2>
            <p>{appointment.dateTime}</p>
            <Link to={{pathname: `/appointment/${appointment.id}`}} className="ButtonAppointmentsDetails">Détails</Link>
        </div>
    )
}

export default Appointment
