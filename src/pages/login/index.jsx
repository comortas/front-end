import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Col, Container, Row } from 'reactstrap';
import LogoBanner from '../../components/logo-banner';
import { clientId } from '../../utils/constants';
import loginImg from './../../assets/images/login-illustration.svg';

const Login = () => {
	const responseGoogle = (response) => {
		console.log('responseGoogle: ', response);
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
						onSuccess={responseGoogle}
						onFailure={responseGoogle}
						cookiePolicy={'single_host_origin'}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;
