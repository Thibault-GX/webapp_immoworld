import React, {useState } from 'react'
import {Modal, ButtonToolbar, Button} from 'rsuite';
import tap from '../../assets/img/tap.png';


function UsersItems({user}) {
    
    const [show, showModal] = useState(false);

    const toggleModal = () => {
        showModal(!show);
    }

    return (
        <div className="modal-container">
            <ButtonToolbar>
                <Button className="modal-trigger-button" onClick={toggleModal} title={'Cliquez ici pour voir les informations de '+user.lastname+ ' ' + user.firstname}>{user.lastname+ ' ' + user.firstname}<img src={tap}/></Button>
            </ButtonToolbar>

            <Modal show={show}>
                <Modal.Header closeButton={false}>
                    <Modal.Title>{user.lastname+ ' ' + user.firstname}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>Agence : {user.agencie}</p>
                        <p>Téléphone : <a href={"tel:"+user.phone}>{user.phone}</a></p>
                        <p>Email : <a href={"mailto:"+user.email}>{user.email}</a></p>
                        <p>Role : {user.role}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={toggleModal} appearance="primary">Fermer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UsersItems
