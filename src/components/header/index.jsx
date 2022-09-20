import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import logo from './../../assets/images/logo.png';
import _get from 'lodash/get';

const Header = () => {
	const { userInfo } = useSelector(({ sessionReducer }) => {
		return {
			userInfo: _get(sessionReducer, 'userInfo', false)
		};
	});
	console.log('userInfo: ', userInfo);

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
