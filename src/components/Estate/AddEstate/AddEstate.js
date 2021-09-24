import React, { useState, useEffect } from 'react';
import { Button, Modal, Notification } from 'rsuite';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import API from 'api';
import './AddEstate.css';
import Cookies from 'js-cookie';

const AddEstate = () => {

    const [showAddEstate, showModalAddEstate] = useState(false);
    const [estateTypes, setEstateTypes] = useState([]);
    const [wayTypes, setWayTypes] = useState([]);
    const [cities, setCities] = useState([]);
    const [zipCode, setZipCode] = useState(["00000"]);

    const toggleModalAddEstate = () => {
        showModalAddEstate(!showAddEstate);
    }

    function open(funcName) {
        Notification[funcName] ({
            title: 'SUCCÈS',
            description: <p style={{ width: 320 }} rows={3}>Votre bien a été ajouté avec succès.</p>
        });
    }

    // estateTypes
    useEffect(function(){
        API.get('estatestype', {})

        .then(function (response) {
            const {estatetype:data} = response.data;
            setEstateTypes(data);
        })
        .catch(function (error) {
            if (error.response) {
            }
        });    
    },[])

    // wayTypes
    useEffect(function(){
        API.get('waytypes', {})
        .then(function (response) {
            const {waytypes:data} = response.data;
            setWayTypes(data);
        })
        .catch(function (error) {
            if (error.response) {
            }
        });    
    },[])

    //cities filter
    useEffect(function() {
        API.get(`cities?filter[zipcode]=${zipCode}`)
        .then(function(response){
            const {cities:data} = response.data;
            setCities(data);
        })
    },[zipCode]);

    const AddEstateSchema = Yup.object().shape({
        new_label: Yup.string()
            .trim()
            .matches(/^([A-ZÀ-ÿa-z][-,a-zà-ÿ. ']+[ ]*)+$/, 'Le nom du bien comporte des caractères invalides.')
            .max(50, 'L\'intitulé ne doit pas dépasser 50 caractères.')
            .required('Ce champ doit être complété.'),
        new_livingSurface: Yup.number()
            .min(1, 'La surface du bien est trop faible.')
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('La surface doit être un nombre entier.')
            .round()
            .required('Ce champ doit être complété.'),
        new_rawSurface: Yup.number()
            .min(1, 'La surface du bien est trop faible.')
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('La surface doit être un nombre entier.')
            .round(),
            new_constructionDate: Yup.date()
            .max(new Date(new Date().setFullYear(new Date().getFullYear() + 2))), // permet de proposer un projet immobilier se terminant dans deux ans
        new_roomNumber: Yup.number()
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('La surface doit être un nombre entier.')
            .round(),
        new_ges: Yup.string()
            .trim()
            .length(1, 'La classe GES ne peut comporter qu\'une seule lettre.')
            .matches(/^[A-Ia-i]$/, 'La classe GES ne peut être notée que de A à I.')
            .uppercase(),
        new_energyRatiing: Yup.string()
            .trim()
            .length(1, 'La classe énergétique ne peut comporter qu\'une seule lettre.')
            .matches(/^[A-Ga-g]$/, 'La classe énergétique ne peut être notée que de A à G.')
            .uppercase(),
        new_price: Yup.number()
            .min(1, 'Le prix du bien est trop faible.')
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('Le prix doit être un nombre entier.')
            .round()
            .required('Ce champ doit être complété.'),
        new_parking: Yup.boolean(),
        new_swimmingpool: Yup.boolean(),
        new_terrace: Yup.boolean(),
        new_garden: Yup.boolean(),
        new_garage: Yup.boolean(),
        new_gardenSurface: Yup.number()
            .min(1, 'La surface du jardin est trop faible.')
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('La surface doit être un nombre entier.')
            .round(),
        new_bathroomsNumber: Yup.number()
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('Vous devez utiliser être un nombre entier.')
            .round(),
        new_bedroomsNumber: Yup.number()
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('Vous devez utiliser être un nombre entier.')
            .round(),
        new_basement: Yup.boolean(),
        new_basementSurface: Yup.number()
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('La surface doit être un nombre entier.')
            .round(),
        new_innerFloors: Yup.number()
            .integer('La valeur doit être un nombre entier.')
            .round(),
        new_description: Yup.string()
            .max(2000, 'Votre description ne peut pas dépasser les 2000 caractères.')
            .trim()
            .required('Ce champ doit être complété.'),
        new_sold: Yup.boolean(),
        new_id_estateTypes: Yup.number()
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('La valeur doit être un nombre entier.')
            .required('Ce champ doit être complété.'),
        new_id_addresses: Yup.number()
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('La valeur doit être un nombre entier.'),
        new_id_customer: Yup.number()
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('La valeur doit être un nombre entier.'),
        new_id_buyer: Yup.number()
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('La valeur doit être un nombre entier.'),
        new_id_agencies: Yup.number()
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('La valeur doit être un nombre entier.'),
        new_wayNumber: Yup.number()
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('Vous devez utiliser être un nombre entier.')
            .round()
            .required('Ce champ doit être complété.'),
        new_id_wayTypes: Yup.number()
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('Vous devez utiliser être un nombre entier.')
            .round()
            .required('Ce champ doit être complété.'),
        new_wayName: Yup.string()
            .trim()
            .required('Ce champ doit être complété.'),
        new_addressComplement: Yup.string()
            .max(2000, 'Votre description ne peut pas dépasser les 2000 caractères.')
            .trim(),
        new_zipCode: Yup.string()
            .min(5, 'Le code postal doit comporter 5 caractères.')
            .max(5, 'Le code postal doit comporter 5 caractères.')
            .trim()
            .required('Ce champ doit être complété.'),
        new_id_cities: Yup.number()
            .positive('Vous ne pouvez pas utiliser de valeurs négatives.')
            .integer('Vous devez utiliser être un nombre entier.')
            .round()
            .required('Ce champ doit être complété.'),
        new_floor: Yup.number()
            .integer()
            .round(),
    });

    const submitNewEstate = values => {
        API.post('addresses', {
            wayNumber: parseInt(values.new_wayNumber, 10),
            wayName: values.new_wayName,
            floor: parseInt(values.new_floor,10),
            zipCode: parseInt(values.new_zipCode, 10),
            id_wayTypes: parseInt(values.new_id_wayTypes, 10),
            id_cities: parseInt(values.new_id_cities, 10)
        }).then(function(res) {
            const {address} = res.data
            var newAddressId = address.id;
            API.post('estates', {
                label: values.new_label,
                livingSurface: parseInt(values.new_livingSurface, 10),
                rawSurface: parseInt(values.new_rawSurface, 10),
                constructionDate: values.new_constructionDate,
                roomNumber: parseInt(values.new_roomNumber, 10),
                GES: values.new_ges,
                energyRating: values.new_energyRating,
                price: parseInt(values.new_price, 10),
                parking: values.new_parking,
                swimmingpool: values.new_swimmingpool,
                terrace: values.new_terrace,
                garden: values.new_garden,
                garage: values.new_garage,
                gardenSurface: parseInt(values.new_gardenSurface,10),
                bathroomsNumber: parseInt(values.new_bathroomsNumber, 10),
                bedroomsNumber: parseInt(values.new_bedroomsNumber, 10),
                basement: values.new_basement,
                basementSurface: parseInt(values.new_basementSurface,10),
                innerFloors: parseInt(values.new_innerFloors, 10),
                description: values.new_description,
                sold : false,
                id_estateTypes: parseInt(values.new_id_estateTypes, 10),
                id_addresses: parseInt(newAddressId, 10),
                id_customer: parseInt(values.new_id_customer, 10),
                id_buyer: parseInt(values.new_id_buyer, 10),
                id_agencies: parseInt(Cookies.get('Agence'), 10)
            })
            .then(function (response) {
                open('success');
                toggleModalAddEstate();
            })
        })
    }

    return (
        <div>
            <Button onClick={toggleModalAddEstate} id="addEstate" title="Ajouter un bien">+</Button>

            <Modal show={showAddEstate} size="md" overflow="true">
                <Modal.Header closeButton={false}>
                    <Modal.Title>Ajouter un bien</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                <Formik
                    initialValues={{
                        'new_label': '',
                        'new_livingSurface': '',
                        'new_rawSurface': '',
                        'new_constructionDate': '',
                        'new_roomNumber': '',
                        'new_ges': '',
                        'new_energyRating': '',
                        'new_price': '',
                        'new_parking': false,
                        'new_swimmingpool': false,
                        'new_terrace': false,
                        'new_garden': false,
                        'new_garage': false,
                        'new_gardenSurface': '',
                        'new_bathroomsNumber': '',
                        'new_bedroomsNumber': '',
                        'new_basement': false,
                        'new_basementSurface': '',
                        'new_innerFloors': '',
                        'new_description': '',
                        'sold' : false,
                        'new_id_estateTypes': '',
                        'new_id_addresses': '',
                        'new_id_customer': '',
                        'new_id_buyer': '',
                        'new_id_agencies': '',
                        'new_wayNumber': '',
                        'new_id_wayTypes': '',
                        'new_wayName': '',
                        'new_addressComplement': '',
                        'new_zipCode': '',
                        'new_id_cities': '',
                        'new_floor': '',
                        'id_agencies': ''
                    }}
                    validationSchema={AddEstateSchema}
                    onSubmit={ values => submitNewEstate(values)}
                >
                    {({ handleSubmit, handleChange, isSubmitting, errors, touched, values, setFieldValue }) => (
                    <Form id="addEstateForm" onSubmit={handleSubmit}>
                        <h3>Détails du bien</h3>
                            <div className="formItem">
                                <label htmlFor="new_label">Intitulé</label>
                                <Field
                                    type="text"
                                    id="new_label"
                                    name="new_label"
                                    onChange={handleChange}
                                    value={values.new_label}
                                    placeholder="ex : Maison de charme à Montauban"
                                />
                                {errors.new_label && touched.new_label ? (
                                    <div className="addEstateFormErrors">{errors.new_label}</div>
                                ) : null}
                            </div>

                            <div className="formItem">
                                <label htmlFor="new_id_estateTypes">Type de bien</label>
                                <Field
                                    as="select" 
                                    id="new_id_estateTypes"
                                    name="new_id_estateTypes"
                                    onChange={handleChange}
                                    value={values.new_id_estateTypes}
                                >
                                    <option>Sélectionnez le type de bien</option>
                                    {estateTypes.map((estateType, i) => {
                                        return(<option key={i} value={estateType.id}>{estateType.name}</option>)
                                    })}
                                </Field>
                                {errors.new_id_estateTypes && touched.new_id_estateTypes ? (
                                    <div className="addEstateFormErrors">{errors.new_id_estateTypes}</div>
                                ) : null}
                            </div>

                            <div className="formGroup">
                                <div className="formGroupItem">
                                    <label htmlFor="new_livingSurface">Surface nette (en m²)</label>
                                    <Field
                                        type="number"
                                        id="new_livingSurface"
                                        name="new_livingSurface"
                                        onChange={handleChange}
                                        value={values.new_livingSurface}
                                        placeholder="ex : 50"
                                    />
                                    {errors.new_livingSurface && touched.new_livingSurface ? (
                                        <div className="addEstateFormErrors">{errors.new_livingSurface}</div>
                                    ) : null}
                                </div>
                                <div className="formGroupItem">
                                    <label htmlFor="new_rawSurface">Surface brute (en m²)</label>
                                    <Field
                                        type="number" 
                                        id="new_rawSurface"
                                        name="new_rawSurface"
                                        onChange={handleChange}
                                        value={values.new_rawSurface}
                                        placeholder="ex : 55"
                                    />
                                    {errors.new_rawSurface && touched.new_rawSurface ? (
                                        <div className="addEstateFormErrors">{errors.new_rawSurface}</div>
                                    ) : null}
                                </div>
                            </div>
                            
                            <div className="formItem">
                                <label htmlFor="new_description">Description</label>
                                <Field
                                    as="textarea" 
                                    id="new_description"
                                    name="new_description"
                                    onChange={handleChange}
                                    value={values.new_description}
                                    placeholder="Veuillez renseigner une description pour le nouveau bien"
                                    className="form-textarea"
                                />
                                {errors.new_description && touched.new_description ? (
                                    <div className="addEstateFormErrors">{errors.new_description}</div>
                                ) : null}
                            </div>

                            <div className="formItem">
                                <label htmlFor="new_price">Prix (en €)</label>
                                <Field
                                    type="number"
                                    id="new_price"
                                    name="new_price"
                                    onChange={handleChange}
                                    value={values.new_price }
                                    placeholder="Veuillez indiquer le prix."
                                />
                                {errors.new_price && touched.new_price ? (
                                        <div className="addEstateFormErrors">{errors.new_price}</div>
                                ) : null}
                            </div>

                            <div className="formItem">
                                <label htmlFor="new_constructionDate">Date de construction</label>
                                <Field
                                    type="date"
                                    id="new_constructionDate"
                                    name="new_constructionDate"
                                    onChange={handleChange}
                                    value={values.new_constructionDate}
                                    placeholder="choisissez une date"
                                />
                                {errors.new_constructionDate && touched.new_constructionDate? (
                                    <div className="addEstateFormErrors">{errors.new_constructionDate}</div>
                                ) : null}
                            </div>
                            <div className="formItem">
                                <label htmlFor="new_roomNumber">Nombre de pièces</label>
                                <Field
                                    type="number"
                                    id="new_roomNumber"
                                    name="new_roomNumber"
                                    onChange={handleChange}
                                    value={values.new_roomNumber}
                                    placeholder="ex : 3"
                                />
                                {errors.new_roomNumber && touched.new_roomNumber ? (
                                        <div className="addEstateFormErrors">{errors.new_roomNumber}</div>
                                ) : null}
                            </div>
                            <div className="formItem">
                                <label htmlFor="new_bedroomsNumber">Nombre de salles de chambres</label>
                                <Field
                                    type="number"
                                    id="new_bedroomsNumber"
                                    name="new_bedroomsNumber"
                                    onChange={handleChange}
                                    value={values.new_bedroomsNumber}
                                    placeholder="ex : 3"
                                />
                                {errors.new_bedroomsNumber && touched.new_bedroomsNumber ? (
                                        <div className="addEstateFormErrors">{errors.new_bedroomsNumber}</div>
                                ) : null}
                            </div>
                            <div className="formItem">
                                <label htmlFor="new_bathroomsNumber">Nombre de salles de bain</label>
                                <Field
                                    type="number"
                                    id="new_bathroomsNumber"
                                    name="new_bathroomsNumber"
                                    onChange={handleChange}
                                    value={values.new_bathroomsNumber}
                                    placeholder="ex : 3"
                                />
                                {errors.new_bathroomsNumber && touched.new_bathroomsNumber ? (
                                        <div className="addEstateFormErrors">{errors.new_bathroomsNumber}</div>
                                ) : null}
                            </div>

                            <div className="formItem">
                                <label htmlFor="new_ges">Classe GES</label>
                                <Field
                                    type="text"
                                    id="new_ges"
                                    name="new_ges" 
                                    onChange={handleChange}
                                    value={values.new_ges}
                                    placeholder="Veuillez indiquer la lettre correspondante."
                                />
                                {errors.new_ges && touched.new_ges ? (
                                        <div className="addEstateFormErrors">{errors.new_ges}</div>
                                ) : null}
                            </div>
                            <div className="formItem">
                                <label htmlFor="new_energyRating">Classe énergétique</label>
                                <Field
                                    type="text"
                                    id="new_energyRating"
                                    name="new_energyRating"
                                    onChange={handleChange}
                                    value={values.new_energyRating}
                                    placeholder="Veuillez indiquer la lettre correspondante."
                                />
                                {errors.new_energyRating && touched.new_energyRating ? (
                                        <div className="addEstateFormErrors">{errors.new_energyRating}</div>
                                ) : null}
                            </div>

                            <div className="formItem formCheckbox">
                                <label htmlFor="new_parking">
                                <Field
                                    type="checkbox"
                                    id="new_parking"
                                    name="new_parking"
                                    onChange={handleChange}
                                /> Parking</label>
                                {errors.new_parking && touched.new_parking ? (
                                        <div className="addEstateFormErrors">{errors.new_parking}</div>
                                ) : null}
                            </div>

                            <div className="formItem formCheckbox">
                                <label htmlFor="new_swimmingpool">
                                <Field
                                    type="checkbox"
                                    id="new_swimmingpool"
                                    name="new_swimmingpool"
                                    onChange={handleChange}
                                    // value={values.new_swimmingpool }
                                /> Piscine</label>
                                {errors.new_swimmingpool && touched.new_swimmingpool ? (
                                        <div className="addEstateFormErrors">{errors.new_swimmingpool}</div>
                                ) : null}
                            </div>

                            <div className="formItem formCheckbox">
                                <label htmlFor="new_terrace">
                                <Field
                                    type="checkbox"
                                    id="new_terrace"
                                    name="new_terrace"
                                    onChange={handleChange}
                                    // value={values.new_terrace }
                                /> Terrasse</label>
                                {errors.new_terrace && touched.new_terrace ? (
                                        <div className="addEstateFormErrors">{errors.new_terrace}</div>
                                ) : null}
                            </div>

                            <div className="formItem formCheckbox">
                                <label htmlFor="new_garden">
                                <Field
                                    type="checkbox"
                                    id="new_garden"
                                    name="new_garden"
                                    onChange={handleChange}
                                    // value={values.new_garden }
                                /> Jardin et/ou terrain</label>
                                {errors.new_garden && touched.new_garden ? (
                                        <div className="addEstateFormErrors">{errors.new_garden}</div>
                                ) : null}
                            </div>

                            <div className="formItem">
                                <label htmlFor="new_gardenSurface">Surface du terrain/jardin (en m²)</label>
                                <Field
                                    type="number" 
                                    id="new_gardenSurface"
                                    name="new_gardenSurface"
                                    onChange={handleChange}
                                    value={values.new_gardenSurface}
                                    placeholder="ex : 55"
                                />
                                {errors.new_gardenSurface && touched.new_gardenSurface ? (
                                    <div className="addEstateFormErrors">{errors.new_gardenSurface}</div>
                                ) : null}
                            </div>

                            <div className="formItem formCheckbox">
                                <label htmlFor="new_garage">
                                <Field
                                    type="checkbox"
                                    id="new_garage"
                                    name="new_garage"
                                    onChange={handleChange}
                                    // value={values.new_garage }
                                /> Garage</label>
                                {errors.new_garage && touched.new_garage ? (
                                        <div className="addEstateFormErrors">{errors.new_garage}</div>
                                ) : null}
                            </div>

                            <div className="formItem formCheckbox">
                                <label htmlFor="new_basement">
                                <Field
                                    type="checkbox"
                                    id="new_basement"
                                    name="new_basement"
                                    onChange={handleChange}
                                    // value={values.new_basement }
                                /> Sous-sol</label>
                                {errors.new_basement && touched.new_basement ? (
                                        <div className="addEstateFormErrors">{errors.new_basement}</div>
                                ) : null}
                            </div>

                            <div className="formItem">
                                <label htmlFor="new_basementSurface">Surface du sous-sol (en m²)</label>
                                <Field
                                    type="number" 
                                    id="new_basementSurface"
                                    name="new_basementSurface"
                                    onChange={handleChange}
                                    value={values.new_basementSurface}
                                    placeholder="ex : 55"
                                />
                                {errors.new_basementSurface && touched.new_basementSurface ? (
                                    <div className="addEstateFormErrors">{errors.new_basementSurface}</div>
                                ) : null}
                            </div>

                            <div className="formItem">
                                <label htmlFor="new_innerFloors">Nombre d'étages</label>
                                <Field
                                    type="number" 
                                    id="new_innerFloors"
                                    name="new_innerFloors"
                                    onChange={handleChange}
                                    value={values.new_innerFloors}
                                    placeholder="ex : 55"
                                />
                                {errors.new_innerFloors && touched.new_innerFloors ? (
                                    <div className="addEstateFormErrors">{errors.new_innerFloors}</div>
                                ) : null}
                            </div>
                        
                            <h3>Adresse du bien</h3>
                            <div className="formGroup">
                                <div className="formGroupItem">
                                    <label htmlFor="new_wayNumber">Numéro de voie</label>
                                    <Field
                                        name="new_wayNumber"
                                        type="number"
                                        value={values.new_wayNumber}
                                        onChange={handleChange}
                                    />
                                    {errors.new_wayNumber && touched.new_wayNumber ? (
                                        <div className="addEstateFormErrors">{errors.new_wayNumber}</div>
                                    ) : null}
                                </div>
                                <div className="formGroupItem">
                                    <label htmlFor="new_id_wayTypes">Type de la voie</label>
                                    <Field
                                        name="new_id_wayTypes"
                                        as="select"
                                        value={values.new_id_wayTypes}
                                        onChange={handleChange}
                                    >
                                        <option>Sélectionnez le type de voie</option>
                                        {wayTypes.map((wayType, i) => {
                                            return(<option key={i} value={wayType.id}>{wayType.label}</option>)
                                        })}
                                    </Field>
                                    {errors.new_id_wayTypes && touched.new_id_wayTypes ? (
                                        <div className="addEstateFormErrors">{errors.new_id_wayTypes}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="formItem">
                                <label htmlFor="new_wayName">Nom de la voie</label>
                                <Field
                                    name="new_wayName"
                                    type="text"
                                    value={values.new_wayName}
                                    onChange={handleChange}
                                />
                                {errors.new_wayName && touched.new_wayName ? (
                                    <div className="addEstateFormErrors">{errors.new_wayName}</div>
                                ) : null}
                            </div>

                            <div className="formItem">
                                <label htmlFor="new_floor">Étage</label>
                                <Field
                                    type="number" 
                                    id="new_floor"
                                    name="new_floor"
                                    onChange={handleChange}
                                    value={values.new_floor}
                                    placeholder="ex : 55"
                                />
                                {errors.new_floor && touched.new_floor ? (
                                    <div className="addEstateFormErrors">{errors.new_floor}</div>
                                ) : null}
                            </div>

                            <div className="formItem">
                                <label htmlFor="new_addressComplement">Complément d'adresse</label>
                                <Field
                                    name="new_addressComplement"
                                    type="texarea"
                                    value={values.new_addressComplement}
                                    onChange={handleChange}
                                />
                                {errors.new_addressComplement && touched.new_addressComplement ? (
                                        <div className="addEstateFormErrors">{errors.new_addressComplement}</div>
                                ) : null}
                            </div>

                            <div className="formGroup">
                                <div className="formGroupItem">
                                    <label htmlFor="new_zipCode">Code postal</label>
                                    <Field
                                        name="new_zipCode"
                                        type="text"
                                        value={values.new_zipCode}
                                        onChange={(e) => {
                                            var value = e.currentTarget.value;

                                            setFieldValue('new_zipCode',value);
                                            if (value.length <= 5 && value.length >= 2) {
                                                setZipCode(value);
                                            }
                                        }}
                                    />
                                    {errors.new_zipCode && touched.new_zipCode ? (
                                        <div className="addEstateFormErrors">{errors.new_zipCode}</div>
                                    ) : null}
                                </div>
                                <div className="formGroupItem">
                                    <label htmlFor="new_id_cities">Ville</label>
                                    <Field
                                        name="new_id_cities"
                                        as="select"
                                        value={values.new_id_cities}
                                        onChange={handleChange}
                                    >
                                        <option>Sélectionnez la ville</option>
                                        {cities.map((city, i) => {
                                            return(<option key={i} value={city.id}>{city.name}</option>)
                                        })}
                                    </Field>
                                    {errors.new_id_cities && touched.new_id_cities ? (
                                        <div className="addEstateFormErrors">{errors.new_id_cities}</div>
                                    ) : null}
                                </div>
                            </div>

                        <div>
                            <Button type="submit" appearance="primary" color="green" disabled={isSubmitting}>Ajouter</Button>
                        </div>
                    </Form>
                    )}
                </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={toggleModalAddEstate} appearance="primary" color="red">Annuler</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddEstate;
