import React from 'react'

const AppointmentList = ({children}) => {
    return (
        <div className="AppointmentList">
            <h1>Liste des rendez-vous </h1>
            {children}
        </div>
    )
}

export default AppointmentList
