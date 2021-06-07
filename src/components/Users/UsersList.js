import API from 'api'
import React from 'react'
import UsersItems from './UsersItems'
import { Pagination,SelectPicker,InputNumber,Toggle,TagPicker,Col } from 'rsuite';
import { Select } from '@material-ui/core';
import './Users.css'

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
    },[])
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
        <div>
            <Col md={24} sm={24}>
            <h1 style={{fontSize:'1.2rem', lineHeight : '30px'}}>Carnets d'adresses du personnels</h1>
            
            <select className="SelectAgencie"  onChange={handleChange} name="value">
                <option value="0">Afficher par agence</option>
                {agencies.map((agencie, i) => {
                    return(<option key={i} value={agencie.id}>{agencie.name}</option>)
                })}
            </select>
            </Col>
            
            {data.map((user, i) => {
                if (user.role != 'Admin' && user.agencie != 'Immoworld Paris') {
                    return(<UsersItems user={user} key={i}/>)
                }
            })}
        </div>
    )
}

export default UsersList
