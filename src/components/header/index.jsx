import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import logo from './../../assets/images/logo.png';

const Header = () => {
	const [ isOpen, setIsOpen ] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar expand="md" fixed="top" color="light">
				<NavLink className={'navbar-brand'} href="/">
					<img src={logo} width="120" />
				</NavLink>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar className="justify-content-end">
					<Nav navbar>
						<NavItem>
							<NavLink className="nav-link" to="/createHelp">
								Seek for Help
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink className="nav-link" to="/createEvent">
								Create Event
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
