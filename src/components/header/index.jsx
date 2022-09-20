import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Media,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';
import logo from './../../assets/images/logo.png';
import _get from 'lodash/get';
import { GoogleLogout } from 'react-google-login';
import { clientId } from '../../utils/constants';
import './style.scss';
import { removeSession } from '../../services/session/action';

const Header = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector(({ sessionReducer }) => {
		return {
			userInfo: _get(sessionReducer, 'userInfo', false)
		};
	});

	const [ isOpen, setIsOpen ] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	const logout = () => {
		dispatch(removeSession());
	};
	const onFailure = (res) => {
		console.log('onFailure: ', res);
	};

	return (
		<div className="kt-header">
			<Navbar expand="md" fixed="top" color="light">
				<NavLink className={'navbar-brand'} to="/">
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
						<NavItem>
							<div className="kt-media">
								<div className="kt-body">
									<div className="mr-2">{userInfo.name}</div>
								</div>
								<UncontrolledDropdown setActiveFromChild>
									<DropdownToggle className="nav-link p-0" tag="a">
										<div className="kt-right">
											<img
												src={userInfo.imageUrl}
												className="rounded-circle shadow-sm kt-user-logo"
												alt="Avatar"
											/>
										</div>
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem tag="a">
											<GoogleLogout
												clientId={clientId}
												render={(renderProps) => (
													<div onClick={renderProps.onClick}>Logout</div>
												)}
												buttonText="Logout"
												onLogoutSuccess={logout}
												onFailure={onFailure}
											/>
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							</div>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
