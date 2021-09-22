import React, { useState } from 'react';
import { Button, Modal, Form, Notification } from 'rsuite';
import './DeleteUser.css';
import API from 'api';

function DeleteUser({user}) {

    const [showDeactivateUser, showModalDeactivateUser] = useState(false);

    const toggleModalDeactivateUser = () => {
        showModalDeactivateUser(!showDeactivateUser);
    }

    function open(funcName) {
        Notification[funcName] ({
            title: 'SUCCÈS',
            description: <p style={{ width: 320 }} rows={3}>Votre utilisateur a été désactivé avec succès.</p>
        });
    }

    function deactivateSelectedUser() {
        API.put(`users/${user.id}`, {
            firstname: user.firstname,
            lastname: (user.lastname).toUpperCase(),
            password: user.password,
            email: user.email,
            phone: user.phone,
            activeUser: false,
            id_userRoles: user.id_userRoles,
            id_agencies: user.id_agencies
        })
        .then(function (response) {
            open('success');
            toggleModalDeactivateUser();
        })
    }

    return (
        <div>
            <Button appearance="primary" color="red" onClick={toggleModalDeactivateUser} title="Ajouter un membre du personnel">Supprimer</Button>

            <Modal show={showDeactivateUser}>
                <Modal.Header closeButton={false}>
                    <Modal.Title>Êtes-vous sûr de vouloir retirer {user.firstname+' '+user.lastname}<br/>de la liste du personnel ?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>L'utilisateur sera désactivé, les données y étant associées ne seront pas supprimées, mais il ne pourra plus effectuer d'opérations sur Immoworld et ne pourra plus accéder à ses données à moins d'être réactivé par un utilisateur ayant les droits nécessaires.</p>
                    <Form id="deactivateUserForm" onSubmit={deactivateSelectedUser}>
                        <Button appearance="primary" color="green" type="submit">Désactiver l'utilisateur</Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={toggleModalDeactivateUser} appearance="primary" color="red">Annuler</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DeleteUser
