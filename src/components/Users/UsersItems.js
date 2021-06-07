import React from 'react'
import { Panel,Col} from 'rsuite';


function UsersItems({user}) {
    return (
        <div>
            <Col md={6} sm={12}>
                <Panel style={{marginTop:10}} header={user.lastname+ ' ' + user.firstname} collapsible bordered>
                    <div>
                        <p>Agence : {user.agencie}</p>
                        <p>Téléphone : <a href={"tel:"+user.phone}>{user.phone}</a></p>
                        <p>Email : <a href={"mailto:"+user.email}>{user.email}</a></p>
                        <p>Role : {user.role}</p>
                    </div>
                </Panel>
            </Col>
        </div>
    )
}

export default UsersItems
