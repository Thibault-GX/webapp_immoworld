import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';
import { Sidenav, Nav, Icon, Button } from 'rsuite';
import './Header.css';
import Links from './Links/Links';
import Avatar from './../Avatar/Avatar';
import UsersItems from 'components/Users/UserItems/UsersItems';

function Header({lastname, firstname}) {
    const [expend, setExpand] = useState(false)


    return (
        <div>
        <Sidenav
          expanded={expend}
          className="Immo_sideNav"
        >
          <Sidenav.Body style={{ backgroundColor: "#3a3838"}}>
          <Avatar className="nav-avatar" firstname={firstname} lastname={lastname} />
          <Button onClick={() => setExpand(!expend)} value={expend} className="immo-buttonNav"><Icon icon={!expend ? "angle-double-right" : "angle-double-left"} /></Button>
            <Nav>
              {Links.map((link, i) => {
                return (
                  <NavLink exact to={link.path}>   
                    <Nav.Item eventKey="1" icon={<Icon icon={link.icon} />} className="immo-link">
                      {link.name}
                    </Nav.Item>
                </NavLink>);
              })}
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    )
}

export default Header
