import React, {useState} from 'react'
import Alert from "../../components/Alert/Alert";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Appointments.css';
import '../CustomReactCalendar/customReactCalendar.css';
import API from '../../api';
import AppointmentList from '../../components/AppointmentList/AppointmentList';
import Appointment from '../../components/Appointment/Appointment';
import AddAppointment from '../../components/AddAppointment/AddAppointment';
import Cookies from 'js-cookie';

const Appointments = () => {
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date(new Date().setHours(0,0,0,0)).getTime())
    const authorization = Cookies.get('Authorisation');
    // changer l'url selon le role id 
    if(authorization != 24 ){
        var url = `appointments?filter[where_date]=${currentDate}`;
    }else{
        url = `appointments/my?filter[where_date]=${currentDate}`;
    }

    React.useEffect(function(){
        API.get(`${url}`)
            .then(function (response) {
                const {appointments:data} = response.data;
                setAppointments(data);
            })
            .catch(function (error) {
                console.log(error);
                if (error.response) {
                    if (error.response.status === 403) {
                        setError("Vous n'êtes pas connecté");
                    }
                }
            });
    },[currentDate,setCurrentDate])

    const onChange = (date,event) =>{
        var change = event.target;
        setDate(date,change);
    }

    function OnclickDay(date,event){
        var change = event.target;
        setCurrentDate(new Date(date.setHours(0,0,0,0)).getTime(), change);
    }

    return (
        <div className="Appointments">
            {error ? <Alert error={error} impact='danger'/> : null}
            <Calendar onChange={onChange} onClickDay={OnclickDay} value={date} />
            <AppointmentList>
                {appointments.map( function(appointment){
                    return <Appointment appointment={appointment} key={appointment.id} id={appointment.id}></Appointment>
                } )}
            </AppointmentList>
            <AddAppointment setAppointments={setAppointments} appointments={appointments}></AddAppointment>
        </div>
    )
}

export default Appointments

