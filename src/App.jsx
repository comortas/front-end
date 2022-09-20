import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
import './assets/css/kt.scss';
import Header from './components/header';
import Login from './pages/login';
import { clientId } from './utils/constants';
import LandingPage from './pages/landingPage';
import { useSelector } from 'react-redux';
import _get from 'lodash/get';

const App = () => {
	const { isSignedIn } = useSelector(({ sessionReducer }) => {
		return {
			isSignedIn: _get(sessionReducer, 'session.id_token', false)
		};
	});
	console.log('isSignedIn: ', isSignedIn);

	useEffect(() => {
		gapi.load('client:auth2', start);
	}, []);

	const start = () => {
		gapi.client.init({
			clientId,
			scope: ''
		});
	};

	const renderSection = () => {
		if (isSignedIn) {
			return (
				<React.Fragment>
					<Header />
					<div className="mt-5">
						<Routes>
							<Route path="/" element={<div>ula vanten</div>} />
							<Route path="*" element={<Navigate to={'/'} replace />} />
						</Routes>
					</div>
				</React.Fragment>
			);
		} else {
			return (
				<div style={{ marginTop: '168px' }}>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/" element={<LandingPage />} />
						<Route path="*" element={<Navigate to={'/'} replace />} />
					</Routes>
				</div>
			);
		}
	};
	return <div>{renderSection()}</div>;
};

export default App;
