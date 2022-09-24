import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, UncontrolledPopover, PopoverBody, Button } from 'reactstrap';
import logo from './../../assets/images/logo.png';
import _get from 'lodash/get';
import { GoogleLogout } from 'react-google-login';
import { clientId } from '../../utils/constants';
import './style.scss';
import { removeSession } from '../../services/session/action';
import _isEmpty from 'lodash/isEmpty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector(({ userDetailsReducer }) => {
		return {
			userInfo: _get(userDetailsReducer, 'response.user', false)
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

	if (_isEmpty(userInfo)) return null;
	return (
		<div className="kt-header">
			<Navbar expand="md" fixed="top" color="light" className="shadow-sm animated fadeIn">
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
							<NavLink className="nav-link" to="/community">
								Community
							</NavLink>
						</NavItem>
						<NavItem>
							<UncontrolledPopover placement="bottom" target="PopoverLegacy" trigger="legacy">
								<PopoverBody className="kt-profile-popover">
									<div className="kt-profile-body">
										<div className="kt-logo-section">
											<img
												alt="User Logo"
												className="kt-user-logo my-2"
												src={userInfo.profilePicture}
											/>
										</div>
										<span className="fs-5">{userInfo.name}</span>
										<span className="fs-6 text-muted">{userInfo.email}</span>
										<span>
											<FontAwesomeIcon icon={[ 'fas', 'wallet' ]} /> Time Wallet :{' '}
											{userInfo.wallet} hr(s)
										</span>
										<GoogleLogout
											clientId={clientId}
											render={(renderProps) => (
												<Button className="mt-3" onClick={renderProps.onClick}>
													<FontAwesomeIcon icon={[ 'fas', 'sign-out-alt' ]} /> Logout
												</Button>
											)}
											buttonText="Logout"
											onLogoutSuccess={logout}
											onFailure={onFailure}
										/>
									</div>
								</PopoverBody>
							</UncontrolledPopover>
							<div className="kt-media">
								<div className="kt-body">
									<div className="mr-2">{userInfo.name}</div>
								</div>
								<div className="kt-right" id="PopoverLegacy">
									<img
										src={userInfo.profilePicture}
										className="rounded-circle shadow-sm kt-user-logo"
										alt="Avatar"
										referrerPolicy="no-referrer"
									/>
								</div>
							</div>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
