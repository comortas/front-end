import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Col, Container, Row } from 'reactstrap';
import { clientId } from '../../utils/constants';
import loginImg from './../../assets/images/login-illustration.svg';

const Login = () => {
	const responseGoogle = (response) => {
		console.log('responseGoogle: ', response);
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
