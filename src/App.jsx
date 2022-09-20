import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { Button, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { gapi } from 'gapi-script';
import './assets/css/kt.scss';
import Header from './components/header';
import Login from './pages/login';
import { clientId } from './utils/constants';
import LandingPage from './pages/landingPage';

const App = () => {
	useEffect(() => {
		gapi.load('client:auth2', start);
	}, []);
	const start = () => {
		gapi.client.init({
			clientId,
			scope: ''
		});
	};
	return (
		<div>
			<Header />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<LandingPage />} />
			</Routes>
		</div>
	);
};

export default App;
