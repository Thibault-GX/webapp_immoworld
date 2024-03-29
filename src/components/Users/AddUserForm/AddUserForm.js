import React, { useState } from 'react';
import { Button, Modal, Notification } from 'rsuite';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import API from 'api';
import Cookies from 'js-cookie';

const AddUserForm = () => {

    const [showAddUser, showModalAddUser] = useState(false);
    const [agencies,setAgencies] = React.useState([]);
    const [userRoles,setUserRoles] = React.useState([]);

    const toggleModalAddUser = () => {
        showModalAddUser(!showAddUser);
    }

    function open(funcName) {
        Notification[funcName] ({
            title: 'SUCCÈS',
            description: <p style={{ width: 320 }} rows={3}>Votre utilisateur a été ajouté avec succès.</p>
        });
    }

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
            }
        });    
    },[])

    // user roles
    React.useEffect(function(){
        API.get('userroles', {})

        .then(function (response) {
            const {userRoles:data} = response.data;
            setUserRoles(data);
            console.log(data);
        })
        .catch(function (error) {
            if (error.response) {
            }
        });    
    },[])

    const AddUserSchema = Yup.object().shape({
        firstname: Yup.string()
            .trim()
            .min(2, 'Le prénom est trop court.')
            .max(50, 'Le prénom est trop long.')
            .matches(/^([A-ZÀ-ÿa-z][-,a-zà-ÿ. ']+[ ]*)+$/, 'Votre prénom comporte des caractères invalides.')
            .required('Ce champ doit être complété.'),
        lastname: Yup.string()
            .trim()
            .min(2, 'Le nom est trop court.')
            .max(50, 'Le nom est trop long.')
            .matches(/^([-,a-zA-ZÀ-ÿ. ']+[ ]*)+$/, 'Votre nom comporte des caractères invalides.')
            .uppercase()
            .required('Ce champ doit être complété.'),
        email: Yup.string()
            .email('Votre addresse email n\'est pas valide.')
            .trim()
            .required('Ce champ doit être complété.'),
        password: Yup.string()
            .trim()
            .required('Ce champ doit être complété.'),
        phone: Yup.string()
            .trim()
            .matches(/^((\+)33|0)[1-9](\d{2}){4}$/, 'Votre numéro de téléphone n\'est pas valide.')
            .required('Ce champ doit être complété.'),
        id_userRoles: Yup.string()
            .required('Ce champ doit être complété.'),
        id_agencies: Yup.string()
            .required('Ce champ doit être complété.'),
    });

    const submitNewUser = values => {
        API.post('users', {
            firstname: values.firstname,
            lastname: (values.lastname).toUpperCase(),
            password: values.password,
            email: values.email,
            phone: values.phone,
            activeUser: true,
            id_userRoles: values.id_userRoles,
            id_agencies: values.id_agencies
        })
        .then(function (response) {
            open('success');
            toggleModalAddUser();
        })
    }

    return (
        <div>
            <Button onClick={toggleModalAddUser} id="addUser" title="Ajouter un membre du personnel">+</Button>

            <Modal show={showAddUser}>
                <Modal.Header closeButton={false}>
                    <Modal.Title>Ajouter un membre du personnel</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                <Formik
                    initialValues={{
                        'firstname': '',
                        'lastname': '',
                        'email': '',
                        'password': '',
                        'phone': '',
                        'activeUser': '',
                        'id_userRoles': '',
                        'id_agencies': '',
                    }}
                    validationSchema={AddUserSchema}
                    onSubmit={ values => submitNewUser(values)}
                >
                    {({ handleSubmit, handleChange, isSubmitting, errors, touched, values }) => (
                    <Form id="addUserForm" onSubmit={handleSubmit}>
                        <div className="formGroup">
                            <div className="formGroupItem">
                                <label htmlFor="firstname">Prénom</label>
                                <Field
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    onChange={handleChange}
                                    value={values.firstname}
                                    placeholder="ex : Pierre"
                                />
                                {errors.firstname && touched.firstname ? (
                                    <div className="addUserFormErrors">{errors.firstname}</div>
                                ) : null}
                            </div>
                            <div className="formGroupItem">
                                <label htmlFor="lastname">Nom</label>
                                <Field
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    onChange={handleChange}
                                    value={values.lastname}
                                    placeholder="ex : DUPONT"
                                />
                                {errors.lastname && touched.lastname ? (
                                    <div className="addUserFormErrors">{errors.lastname}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="formGroup">
                            <div className="formGroupItem">
                                <label htmlFor="email">Adresse email</label>
                                <Field
                                    type="text" 
                                    id="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={values.email}
                                    placeholder="pierre.dupont@immoworld.fr"
                                />
                                {errors.email && touched.email ? (
                                    <div className="addUserFormErrors">{errors.email}</div>
                                ) : null}
                            </div>
                            <div className="formGroupItem">
                                <label htmlFor="password">Mot de passe</label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={values.password}
                                    placeholder="mot de passe"
                                />
                                {errors.password && touched.password? (
                                    <div className="addUserFormErrors">{errors.password}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="formItem">
                            <label htmlFor="phone">Numéro de téléphone</label>
                            <Field
                                type="tel"
                                id="phone"
                                name="phone"
                                onChange={handleChange}
                                value={values.phone}
                                placeholder="+33 65 66 67 68"
                            />
                            {errors.phone && touched.phone ? (
                                    <div className="addUserFormErrors">{errors.phone}</div>
                            ) : null}
                        </div>
                        <div className="formItem">
                            <label htmlFor="id_userRoles">Rôle de l'utilisateur</label>
                            <Field
                                as="select"
                                id="id_userRoles"
                                name="id_userRoles" 
                                onChange={handleChange}
                                value={values.id_userRoles}
                            >
                                <option>Sélectionnez le rôle du nouvel utilisateur</option>
                                {userRoles.map((userRoles, i) => {
                                    if (userRoles.id > Cookies.get('Authorisation')) {
                                        return(<option key={i} value={userRoles.id}>{userRoles.name}</option>)
                                    }
                                })}
                                {errors.id_userRoles && touched.id_userRoles ? (
                                        <div className="addUserFormErrors">{errors.id_userRoles}</div>
                                ) : null}
                            </Field>
                        </div>
                        <div className="formItem">
                            <label htmlFor="id_agencies">Agence de rattachement</label>
                            <Field
                                as="select"
                                id="id_agencies"
                                name="id_agencies"
                                onChange={handleChange}
                                value={values.id_agencies}
                            >
                                <option>Sélectionnez l'agence de rattachement</option>
                                {agencies.map((agencie, i) => {
                                    return(<option key={i} value={agencie.id}>{agencie.name}</option>)
                                })}
                                {errors.id_agencies && (touched.id_agencies || touched.value) === "" ? (
                                    <div className="addUserFormErrors">{errors.id_agencies}</div>
                                ) : null}
                            </Field>
                        </div>
                        <div>
                            <Button type="submit" appearance="primary" color="green" disabled={isSubmitting}>Ajouter</Button>
                        </div>
                    </Form>
                    )}
                </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={toggleModalAddUser} appearance="primary" color="red">Annuler</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddUserForm;
