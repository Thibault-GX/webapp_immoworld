import React, {useState} from 'react';
import "react-datetime/css/react-datetime.css";
import 'moment/locale/fr';
import API from 'api';
import Alert from "../../components/Alert/Alert";
import './AddAppointment.css';

const AddAppointment = ({setAppointments = null, appointments = null}) => {
    // L'état par défaut des valeurs de ton formulaire
    // 2. Mettre les différentes valeurs aux inputs ET un id correspondant à l'attribut dans le state
    // 3. Créer une fonction onChange
    const [formValues, setFormValues] = React.useState({
        contactName: "",
        date: formatDate(),
        time: "",
        appointmentAddress: "",
        usersId:"",
        description:"",
        appointmentAddressError :"",
        contactNameError : "",
        usersIdError : "",
        dateError : "",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


    const handleChange = (e) => {
        formValues[e.target.id] = e.target.value;
        setFormValues({...formValues});
    }

    const Validator = () =>{
        let appointmentAddressError = "";
        let contactNameError = "";
        let usersIdError = "";
        let dateError = "";
        let descriptionError ="";
        let errors = false;  

        if (!formValues.contactName) {
            contactNameError = "Le nom du client est requis.";
            errors = true;
        }else{
            contactNameError ="";
        }
        if (!formValues.date) {
            dateError = "La date du rendez-vous est requise.";
            errors = true;
        }else{
            dateError ="";
        }
        if (!formValues.appointmentAddress) {
            appointmentAddressError = "L'adresse du rendez-vous est requise.";
            errors = true;
        }else{
            appointmentAddressError ="";
        }
        if (!formValues.usersId) {
            usersIdError = "Le nom du commercial est requis.";
            errors = true;
        }else{
            usersIdError="";
        }
        if (!formValues.description) {
            descriptionError =  "Une description est requise.";
            errors = true;
        }else{
            descriptionError=""
        }
        formValues.contactNameError = contactNameError
        formValues.dateError = dateError;
        formValues.appointmentAddressError = appointmentAddressError
        formValues.usersIdError  = usersIdError;
        formValues.descriptionError = descriptionError;
        setFormValues({...formValues});
        if (errors) {
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
        // Validation du formulaire
        const isValid = Validator();
        if (isValid) {
            // envoie à l'API
            API.post(`appointments`, {
                dateTime: formValues.date+" "+formValues.time,
                appointmentAddress: formValues.appointmentAddress,
                contactName : formValues.contactName,
                description: formValues.description,
                id_user : formValues.usersId
            })
                .then(function (response) {
                    const {appointment} = response.data;
                    if (setAppointments && appointments) {
                        appointments.push(appointment);
                        console.log([...appointments]);
                        setAppointments([...appointments ])
                    }
                    setSuccess('Votre rendez-vous a été ajouté avec succès');
                })
                .catch(function (error) {
                    if (error.response) {
                        if (error.response.status === 422) {
                            setError('Un ou plusieurs champs sont incorrects');
                        }
                    }
                });
        }

    }

    return (
        <div className="AddAppointment">
            <h3 className="light-title">Ajouter un rendez-vous</h3>
            {error ? <Alert message={error} impact='danger'/> : null}
            {success ? <Alert message={success} impact='success'/> : null}
            <form onSubmit={(e) => { handleSubmit(e) }} className="AddAppointmentForm"> 
                <label className="LabelAddAppointment">Nom du client</label>
                <input
                    className="InputAddAppointment"
                    id="contactName"
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={formValues.contactName}
                />
                <div className="Alert danger">{formValues.contactNameError}</div>
                <div id="dateAndHour">
                    <label className="LabelAddAppointment">Date du rendez-vous</label>
                    <input 
                        type="date"
                        id="date"
                        className="InputDate"
                        onChange={(e) => handleChange(e)}
                        value={formValues.date}
                    />
                    <label className="LabelAddAppointment">Heure du rendez-vous</label>
                    <input 
                        type="time"
                        id="time"
                        className="InputTime"
                        onChange={(e) => handleChange(e)}
                        value={formValues.time}
                    />
                </div>
                <div className="Alert danger">{formValues.dateError}</div>
                <label className="LabelAddAppointment">Adresse du rendez-vous</label>
                <input
                    className="InputAddAppointment"
                    type="text"
                    id="appointmentAddress"
                    onChange={(e) => handleChange(e)}
                    value={formValues.appointmentAddress}
                />
                <div className="Alert danger">{formValues.appointmentAddressError}</div>
                <label className="LabelAddAppointment">Commercial</label>
                <input
                    className="InputAddAppointment"
                    type="text"
                    id="usersId"
                    onChange={(e) => handleChange(e)}
                    value={formValues.usersId}
                />
                <div className="Alert danger">{formValues.usersIdError}</div>
                <label className="LabelAddAppointment">Description</label>
                <textarea
                    className="InputAddAppointment"
                    id="description"
                    onChange={(e) => handleChange(e)}
                    value={formValues.description}
                />
                <div className="Alert danger">{formValues.descriptionError}</div>
                <input
                    type="submit"
                    value="Ajouter le rendez-vous"
                    className="InputConnectionSend"
                />
            </form>
        </div>
    )
}

export default AddAppointment
