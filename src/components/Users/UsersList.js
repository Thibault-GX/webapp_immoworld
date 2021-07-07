import API from 'api';
import React, {useState} from 'react';
import UsersItems from './UsersItems';
import { Col, Button, Modal } from 'rsuite';
import './Users.css';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';


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

    const [showAddUser, showModalAddUser] = useState(false);

    const toggleModalAddUser = () => {
        showModalAddUser(!showAddUser);
    }

    const AddUserSchema = Yup.object().shape({
        firstname: Yup.string().trim().required('Ce champ doit être complété.'),
        lastname: Yup.string().trim().required('Ce champ doit être complété.'),
        email: Yup.string().email('Votre addresse email n\'est pas valide.').trim().required('Ce champ doit être complété.'),
        password: Yup.string().trim().required('Ce champ doit être complété.'),
        phone: Yup.string().trim().matches(/^((\+)33|0)[1-9](\d{2}){4}$/, 'Votre numéro de téléphone n\'est pas valide.').required('Ce champ doit être complété.'),
        pictureName: Yup.string().trim().required('Ce champ doit être complété.'),
        id_userRoles: Yup.number().required('Ce champ doit être complété.'),
        id_agencies: Yup.number().required('Ce champ doit être complété.'),

    });

    return (
        <div id="userList">
            <Col md={24} sm={24}>
            <h1 style={{fontSize:'1.2rem', lineHeight : '30px'}}>Annuaire du personnel</h1>
            
            <select className="SelectAgencie"  onChange={handleChange} name="value">
                <option value="0">Filtrer par agence</option>
                {agencies.map((agencie, i) => {
                    return(<option key={i} value={agencie.id} id={agencie.name}>{agencie.name}</option>)
                })}
            </select>
            </Col>
            
            {data.map((user, i) => {
                if (user.role != 'Admin' && user.agencie == {selectagencies}) {
                    return(<UsersItems user={user} key={i}/>)
                }
            })}

            <Button onClick={toggleModalAddUser} id="addUser" title="Ajouter un membre du personnel">+</Button>

            <Modal show={showAddUser}>
                <Modal.Header closeButton={false}>
                    <Modal.Title>Ajouter un membre du personnel</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                <Formik
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        email: '',
                        password: '',
                        phone: '',
                        pictureName: '',
                        'id_userRoles': '',
                        'id_agencies': '',
                    }}
                    validationSchema={AddUserSchema}
                    onSubmit={ values => {
                        console.log(values);
                    }}
                >
                    {({ errors, touched }) => (
                    <Form id="addUserForm">
                        <div className="formGroup">
                            <div className="formGroupItem">
                                <label htmlFor="firstname">Prénom</label>
                                <Field type="text" id="firstname" name="firstname" placeholder="ex : Pierre" />
                                {errors.firstname && touched.firstname ? (
                                    <div class="addUserFormErrors">{errors.firstname}</div>
                                ) : null}
                            </div>
                            <div className="formGroupItem">
                                <label htmlFor="lastname">Nom</label>
                                <Field type="text" id="lastname" name="lastname" placeholder="ex : DUPONT" />
                                {errors.lastname && touched.lastname ? (
                                    <div class="addUserFormErrors">{errors.lastname}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="formGroup">
                            <div className="formGroupItem">
                                <label htmlFor="email">Adresse email</label>
                                <Field type="text" id="email" name="email" placeholder="pierre.dupont@immoworld.fr" />
                                {errors.email && touched.email ? (
                                    <div class="addUserFormErrors">{errors.email}</div>
                                ) : null}
                            </div>
                            <div className="formGroupItem">
                                <label htmlFor="password">Mot de passe</label>
                                <Field type="password" id="password" name="password" placeholder="mot de passe" />
                                {errors.password && touched.password ? (
                                    <div class="addUserFormErrors">{errors.password}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="formItem">
                            <label htmlFor="phone">Numéro de téléphone</label>
                            <Field type="tel" id="phone" name="phone" placeholder="+33 65 66 67 68" />
                            {errors.phone && touched.phone ? (
                                    <div class="addUserFormErrors">{errors.phone}</div>
                            ) : null}
                        </div>
                        <div className="formItem">
                            <label htmlFor="pictureName">Image de profil</label>
                            <Field id="pictureName" name="pictureName" placeholder="Sélectionnez une image de profil..." />
                            {errors.pictureName && touched.pictureName ? (
                                    <div class="addUserFormErrors">{errors.pictureName}</div>
                            ) : null}
                        </div>
                        <div className="formItem">
                            <label htmlFor="id_userRoles">Rôle de l'utilisateur</label>
                            <Field as="select" id="id_userRoles" name="id_userRoles" placeholder="Rôle du nouvel utilisateur..." >
                                <option value="">Sélectionnez le rôle du nouvel utilisateur</option>
                                {data.map((userRole, i) => {
                                    return(<option key={i} value={userRole.id}>{userRole.role}</option>)
                                })}
                            {errors.id_userRoles && touched.id_userRoles ? (
                                    <div class="addUserFormErrors">{errors.id_userRoles}</div>
                            ) : null}
                            </Field>
                        </div>
                        <div className="formItem">
                            <label htmlFor="id_agencies">Agence de rattachement</label>
                            <Field as="select" id="id_agencies" name="id_agencies">
                                <option value="">Sélectionnez l'agence de rattachement</option>
                                {agencies.map((agencie, i) => {
                                    return(<option key={i} value={agencie.id}>{agencie.name}</option>)
                                })}
                                {errors.id_agencies && touched.id_agencies ? (
                                    <div class="addUserFormErrors">{errors.id_agencies}</div>
                                ) : null}
                            </Field>
                        </div>
                    </Form>
                    )}
                </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={toggleModalAddUser} appearance="primary">Annuler</Button>
                    <Button type="submit" color="green">Ajouter</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UsersList
