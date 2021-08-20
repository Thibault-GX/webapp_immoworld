import React, { useState } from 'react';
import { Button, Modal } from 'rsuite';

function DeleteUser({user}) {

    const [showAddUser, showModalAddUser] = useState(false);

    const toggleModalAddUser = () => {
        showModalAddUser(!showAddUser);
    }

    return (
        <div>
            <Button appearance="primary" color="red" onClick={toggleModalAddUser} title="Ajouter un membre du personnel">Supprimer</Button>

            <Modal show={showAddUser}>
                <Modal.Header closeButton={false}>
                    <Modal.Title>Êtes-vous sûr de vouloir retirer<br/>{user.firstname+' '+user.lastname}<br/>de la liste du personnel ?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>L'utilisateur sera désactivé, les données y étant associées ne seront pas supprimées, mais il ne pourra plus effectuer d'opérations sur Immoworld et ne pourra plus accéder à ses données à moins d'être réactivé par un utilisateur ayant les droits nécessaires.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={toggleModalAddUser} appearance="primary" color="red">Annuler</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DeleteUser
