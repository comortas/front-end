import React, { useEffect } from 'react';
import Login from './components/login';
import { clientId } from './utils/constants';
import { gapi } from 'gapi-script';

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
			<Login />
		</div>
	);
};

export default App;
