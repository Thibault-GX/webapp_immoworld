import API from 'api';
import React from 'react';
import UsersItems from './UsersItems';
import { Col } from 'rsuite';
import './Users.css';
import AddUserForm from './AddUserForm';

function UsersList() {

    const [data,setData] = React.useState([]);
    const [agencies,setAgencies] = React.useState([]);
    const [selectagencies,setSelectAgencies] = React.useState({value:0});

    React.useEffect(function(){
        API.get('users', {})

        .then(function (response) {
            const {User:data} = response.data;
            setData(data);
            console.log(data);
        })
        .catch(function (error) {
            if (error.response) {
                // if (error.response.status === 401) {
                //     setError('Identifiants incorrects');
                // }
            }
        });    
    },[selectagencies])
// agencies
    React.useEffect(function(){
        API.get('agencies', {})

        .then(function (response) {
            const {agencies:data} = response.data;
            setAgencies(data);
            console.log(data);
        })
        .catch(function (error) {
            if (error.response) {
                // if (error.response.status === 401) {
                //     setError('Identifiants incorrects');
                // }
            }
        });    
    },[])

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setSelectAgencies({...selectagencies, [name]: value})
        console.log(currentTarget);
    }

    console.log(selectagencies);

    return (
        <div id="userList">
            <Col md={24} sm={24}>
            <h1 style={{fontSize:'1.2rem', lineHeight : '30px'}}>Annuaire du personnel</h1>
            
            <select className="SelectAgencie"  onChange={handleChange} name="value">
                <option value="0">Filtrer par agence</option>
                {agencies.map((agencie, i) => {
                    return(<option key={i} value={agencie.id}>{agencie.name}</option>)
                })}
            </select>
            </Col>
            
            {data.map((user, i) => {
                if (user.role != 'Admin' && user.agencie_id == selectagencies.value) {
                    return(
                        <UsersItems user={user} key={i}/>
                    )
                }
            })}
            <AddUserForm/>
        </div>
    )
}

export default UsersList
