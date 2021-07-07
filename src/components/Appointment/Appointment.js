import React from 'react';
import './Appointment.css';
import AppointmentsDetails from '../AppointmentsDetails/AppointmentsDetails'

const Appointment = ({appointment, id}) => {
    return (
        <div className="Appointment">
            <h2>{appointment.contactName}</h2>
            <p>{appointment.dateTime}</p>
            <AppointmentsDetails id={id}/>
        </div>
    )
}

export default Appointment
