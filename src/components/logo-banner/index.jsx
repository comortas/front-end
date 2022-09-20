import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../../assets/images/logo.png';
import './style.scss';

const LogoBanner = () => {
	return (
		<NavLink to="/">
			<div className="logo-banner d-flex justify-content-center py-3 bg-light shadow-sm">
				<img src={logo} width="350" />
			</div>
		</NavLink>
	);
};

export default LogoBanner;
