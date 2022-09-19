import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { clientId } from '../../utils/constants';

const Login = () => {
	const responseGoogle = (response) => {
		console.log('responseGoogle: ', response);
	};
	return (
		<div>
			<GoogleLogin
				clientId={clientId}
				buttonText="Sign in with Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
			/>
		</div>
	);
};

export default Login;
