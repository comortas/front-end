import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { setSession } from '../../services/session/action';
import { clientId } from '../../utils/constants';
import loginImg from './../../assets/images/login-illustration.svg';

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
		<Container fluid="xl">
			<Row className="mt-5 pt-5 align-items-center">
				<Col>
					<img src={loginImg} width="400" />
				</Col>
				<Col>
					<h4>
						Getting Started<br />
						<small className="text-muted">
							We have integrated the single sign on feature to enable the user get into the application
							faster & use it on the first attempt
						</small>
					</h4>
					<GoogleLogin
						clientId={clientId}
						buttonText="Sign in with Google"
						onSuccess={onSuccess}
						onFailure={onFailure}
						cookiePolicy={'single_host_origin'}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;
