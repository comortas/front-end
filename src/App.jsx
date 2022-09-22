import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
import { useDispatch, useSelector } from 'react-redux';
import _get from 'lodash/get';
import { load } from 'react-cookies';

// Utilis
import { clientId } from './utils/constants';
// Actions
import { setSession } from './services/session/action';
// Components
import Header from './components/header';
import Login from './pages/login';
import LandingPage from './pages/landingPage';
import SeekForHelp from './pages/seekForHelp';
import CreateEvent from './pages/createEvent';
import Maps from './components/maps';
import Homepage from './pages/homepage';
import { getUserDetails } from './services/user-details/action';
import Community from './pages/community';
import CreateCommunity from './pages/community/create';

// Styles
import 'react-widgets/scss/styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/kt.scss';
import Profile from './pages/profile';

const App = () => {
	const { isSignedIn, userId } = useSelector(({ sessionReducer, userDetailsReducer }) => {
		return {
			isSignedIn: _get(sessionReducer, 'session.id_token', false),
			userId: _get(userDetailsReducer, 'response.user._id', false)
		};
	});
	const dispatch = useDispatch();
	useEffect(() => {
		gapi.load('client:auth2', start);
		if (load('session')) {
			dispatch(setSession(load('session')));
		}
	}, []);

	const start = () => {
		gapi.client.init({
			clientId,
			scope: ''
		});
	};
	useEffect(
		() => {
			if (isSignedIn) {
				dispatch(getUserDetails());
			}
		},
		[ isSignedIn ]
	);
	const renderSection = () => {
		if (isSignedIn && userId) {
			return (
				<React.Fragment>
					<Header />
					<div className="kt-main-content">
						<Routes>
							<Route exact path="/" element={<Homepage />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/createHelp" element={<SeekForHelp />} />
							<Route path="/createEvent" element={<CreateEvent />} />
							<Route path="/community" element={<Community />} />
							<Route path="/community/create" element={<CreateCommunity />} />
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
