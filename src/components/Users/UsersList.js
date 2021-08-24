import API from 'api';
import React from 'react';
import UsersItems from './UserItems/UsersItems';
import { Col } from 'rsuite';
import './Users.css';
import AddUserForm from './AddUserForm/AddUserForm';

function UsersList() {

    const [data,setData] = React.useState([]);
    const [agencies,setAgencies] = React.useState([]);
    const [selectagencies,setSelectAgencies] = React.useState({value:0});

    // var currentUserToken = localStorage.getItem('id_userRoles');
    // console.log(currentUserToken);

    // users
    React.useEffect(function(){
        API.get('users', {})

        .then(function (response) {
            const {User:data} = response.data;
            setData(data);
        })
        .catch(function (error) {
            if (error.response) {
            }
        });    
    },[selectagencies])
    
    // agencies
    React.useEffect(function(){
        API.get('agencies', {})

        .then(function (response) {
            const {agencies:data} = response.data;
            setAgencies(data);
        })
        .catch(function (error) {
            if (error.response) {
            }
        });    
    },[])

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setSelectAgencies({...selectagencies, [name]: value})
        console.log(currentTarget);
    }

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
                if (user.role_name != 'Admin' && selectagencies.value == 0 && user.activeUser == true) {
                    return(
                        <UsersItems user={user} key={i}/>
                    ) 
                } else if (user.role_name != 'Admin' && user.agencie_id == selectagencies.value && user.activeUser == true) {
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