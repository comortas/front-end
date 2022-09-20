import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { Button, Col, Container, Row } from 'reactstrap';
import LogoBanner from '../../components/logo-banner';
import { setSession } from '../../services/session/action';
import { clientId } from '../../utils/constants';
import loginImg from './../../assets/images/login-illustration.svg';
import googleLogo from './../../assets/images/google-logo.svg';

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
			<Row>
				<Col>
					<LogoBanner />
				</Col>
			</Row>
			<Row className="my-5 align-items-center">
				<Col xs="6">
					<img src={loginImg} width="100%" />
				</Col>
				<Col xs="6">
					<h4>Getting Started</h4>
					<h5>
						<small className="text-muted fw-normal">
							We have integrated the single sign on feature to enable the user get into the application
							faster & use it on the first attempt
						</small>
					</h5>

					<GoogleLogin
						className="mt-2"
						clientId={clientId}
						buttonText="Sign in with Google"
						onSuccess={onSuccess}
						onFailure={onFailure}
						cookiePolicy={'single_host_origin'}
						render={(renderProps) => {
							return (
								<Button color="primary" onClick={renderProps.onClick}>
									<img src={googleLogo} width="19" className="me-1" /> Sign in with Google
								</Button>
							);
						}}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;
