import React, {useState} from 'react'
import Alert from "../../components/Alert/Alert";
import Calendar from 'react-calendar';
import './Appointments.css';
import API from '../../api';


const Appointments = () => {
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState(null);

    const onChange = (date,event) =>{
        var change = event.target;
        setDate(date,change);
        console.log(change);
        change.classList.add("Active");
    }

    function OnclickDay(date,event){
        var change = event.target;
        console.log(date);
        setDate(date,change);
        var month = date.getUTCMonth() + 1; //months from 1-12
        var day = date.getUTCDate()  +1  ;
        var year = date.getUTCFullYear();
        var newdate = year + "-" + month + "-" + day;

        API.get(`appointments`, {
            dateTime: newdate
        })
            .then(function (response) {
                const {data} = response;
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        setError("Vous n'est pas connecter");
                    }
                }
            });
    }

    return (
        <div>
            <h1>{date.toLocaleDateString()}</h1>
            {error ? <Alert error={error} impact='danger'/> : null}
            <Calendar onChange={onChange} onClickDay={OnclickDay} value={date} />
        </div>
    )
}

export default Appointments
