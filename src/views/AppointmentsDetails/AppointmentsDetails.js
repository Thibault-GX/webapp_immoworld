import React ,{useState}from 'react';
import API from 'api';
import Alert from "../../components/Alert/Alert";
import {Redirect} from "react-router-dom";

function AppointmentsDetails({match}) {
    const [appointment, setAppointment] = useState([]);
    let [currentId , setCurrentId] = useState(match.params.id);
    const [error, setError] = useState(null);
    const redirect = error ? <Redirect to="/appointments"/> : null;

    React.useEffect(function(){
        API.get(`appointments/${currentId}`, {
        })
            .then(function (response) {
                const {appointment:data} = response.data;
                setAppointment(data)
                // console.log(appointment);
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        setError("La resource demande n'est pas disponible");
                    }
                }
            })
    },[currentId,setCurrentId])

    return (
        <div>
            {redirect}
            <h1>Rendez-vous N°{currentId}</h1>
            {error ? <Alert message={error} impact='danger'/> : null}
            <p>Nom : {appointment.contactName}</p>
            <p>Adresse :  {appointment.appointmentAddress}</p>
            <p>Date du rendez-vous : {appointment.dateTime}</p>
            <p>Déscription :  {appointment.description}</p>
            <p>Commercial : {appointment.id_user}</p>
        </div>
    )
}

export default AppointmentsDetails
