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

const Appointments = () => {
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date(new Date().setHours(0,0,0,0)).getTime())

    React.useEffect(function(){
        API.get(`appointments/?filter[where_date]=${currentDate}`, {
        })
            .then(function (response) {
                const {appointments:data} = response.data;
                setAppointments(data);
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 404) {
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
        setCurrentDate(new Date(date.setHours(0,0,0,0)).getTime());
    }

    return (
        <div className="Appointments">
            {/* <h1>{date.toLocaleDateString()}</h1> */}
            {error ? <Alert error={error} impact='danger'/> : null}
            <Calendar onChange={onChange} onClickDay={OnclickDay} value={date} />
            <AppointmentList>
                {appointments.map( function(appointment){
                    return <Appointment appointment={appointment} key={appointment.id}></Appointment>
                } )}
            </AppointmentList>
            <AddAppointment setAppointments={setAppointments} appointments={appointments}></AddAppointment>
        </div>
    )
}

export default Appointments
