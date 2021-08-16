import React, { useState } from 'react';
import { Button, Modal, SelectPicker } from 'rsuite';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import API from 'api';

const AddUserForm = () => {

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

    const [showAddUser, showModalAddUser] = useState(false);

    const toggleModalAddUser = () => {
        showModalAddUser(!showAddUser);
    }

    const AddUserSchema = Yup.object().shape({
        firstname: Yup.string()
            .trim()
            .min(2, 'Le prénom est trop court.')
            .max(50, 'Le prénom est trop long.')
            .matches(/^([A-ZÀ-ÿa-z][-,a-z. ']+[ ]*)+$/, 'Votre prénom comporte des caractères invalides.')
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
                        'id_userRoles': '',
                        'id_agencies': '',
                    }}
                    validationSchema={AddUserSchema}
                    onSubmit={ async (values) => {
                        alert(JSON.stringify(values, null, 2));
                    }}
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
                                    <div class="addUserFormErrors">{errors.firstname}</div>
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
                                    <div class="addUserFormErrors">{errors.lastname}</div>
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
                                    <div class="addUserFormErrors">{errors.email}</div>
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
                                    <div class="addUserFormErrors">{errors.password}</div>
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
                                    <div class="addUserFormErrors">{errors.phone}</div>
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
                                {data.map((userRole, i) => {
                                    return(<option key={i} value={userRole.role_id}>{userRole.role}</option>)
                                })}
                            {errors.id_userRoles && touched.id_userRoles ? (
                                    <div class="addUserFormErrors">{errors.id_userRoles}</div>
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
                                {errors.id_agencies && touched.id_agencies || touched.value == "" ? (
                                    <div class="addUserFormErrors">{errors.id_agencies}</div>
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
