import React, { useState } from 'react'
import {Modal, ButtonToolbar, Button} from 'rsuite';
import DeleteUser from './../DeleteUser/DeleteUser';
import Avatar from './../../Avatar/Avatar';

function UsersItems({user}) {
    
    const [show, showModal] = useState(false);

    const toggleModal = () => {
        showModal(!show);
    }

    return (
        <div className="modal-container">
            <ButtonToolbar>
                <Button appearance="primary" className="modal-trigger-button user-button" onClick={toggleModal} title={'Cliquez ici pour voir les informations de '+user.lastname+ ' ' + user.firstname}>
                    <Avatar firstname={user.firstname} lastname={user.lastname} />
                    {user.lastname+ ' ' + user.firstname}
                </Button>
            </ButtonToolbar>

            <Modal show={show}>
                <Modal.Header closeButton={false}>
                    <Modal.Title>{user.lastname+ ' ' + user.firstname}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>Agence : {user.agencie_name}</p>
                        <p>Téléphone : <a href={"tel:"+user.phone}>{user.phone}</a></p>
                        <p>Email : <a href={"mailto:"+user.email}>{user.email}</a></p>
                        <p>Role : {user.role_name}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <DeleteUser user={user}/>
                    <Button onClick={toggleModal} appearance="primary">Fermer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UsersItems
