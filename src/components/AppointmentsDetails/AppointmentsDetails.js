import React ,{useState} from 'react';
import API from 'api';
import Alert from "../Alert/Alert";
import {Modal, ButtonToolbar, Button} from 'rsuite';
import './AppointmentsDetails.css';

function AppointmentsDetails({id}) {
    const [appointment, setAppointment] = useState([]);
    let [currentId , setCurrentId] = useState(id);
    const [error, setError] = useState(null);

    const [showAppointmentDetails, showModalAppointmentDetails] = useState(false);

    const toggleModalAppointmentsDetails = () => {
        showModalAppointmentDetails(!showAppointmentDetails);
    }

    React.useEffect(function(){
        API.get(`appointments/${currentId}`, {
        })
            .then(function (response) {
                const {appointment:data} = response.data;
                setAppointment(data)
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        setError("Oups ! La ressource demandée n'est pas disponible.");
                    }
                }
            })
    },[currentId,setCurrentId])

    const uri = 'https://www.google.com/maps/place/'+appointment.appointmentAddress;
    const encodedUri = encodeURI(uri);
    console.log(encodedUri);

    return (
        <div>
            <ButtonToolbar>
                <Button onClick={toggleModalAppointmentsDetails} className="ButtonAppointmentsDetails" title="Détails du rendez-vous">Détails</Button>
            </ButtonToolbar>

            <Modal show={showAppointmentDetails}>
                <Modal.Header closeButton={false}>
                    <Modal.Title>
                        <h1>Rendez-vous N°Immo-214{currentId}</h1>
                        {error ? <Alert message={error} impact='danger'/> : null}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Nom : {appointment.contactName}</p>
                    <p>Adresse :  <a href={encodedUri} target="_blank" rel="noopener noreferrer">{appointment.appointmentAddress}</a></p>
                    <p>Date du rendez-vous : {appointment.dateTime}</p>
                    <p>Description :  {appointment.description}</p>
                    <p>Commercial : {appointment.id_user}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={toggleModalAppointmentsDetails} appearance="primary">Fermer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AppointmentsDetails
