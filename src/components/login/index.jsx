import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { setSession } from '../../services/session/action';
import { clientId } from '../../utils/constants';

const Login = () => {
	const dispatch = useDispatch();
	const onSuccess = (response) => {
		console.log('onSuccess: ', response);
		dispatch(setSession({ profileObj: response.profileObj, tokenObj: response.tokenObj }));
	};
	const onFailure = (response) => {
		console.log('onFailure: ', response);
	};
	return (
		<div className="kt_content">
			<GoogleLogin
				clientId={clientId}
				buttonText="Sign in with Google"
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={'single_host_origin'}
			/>
		</div>
	);
};

export default Login;
