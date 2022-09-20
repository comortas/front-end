import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import serviceImg from './../../assets/images/service.png';

const LandingPage = () => {
	return (
		<Container fluid="xl">
			<Row>
				<Col>
					<img src={serviceImg} width="400" />
				</Col>
				<Col>
					<h4>KarmaTheory</h4>
					<p>
						Karmatheory is not about any kind of theory.<br />
						It is a platform to connect the people whos' hands are always up for the community or social
						service.<br />
						This theory may be common for you but we stand out with the concept of <stong>Time Bank</stong>.
					</p>
					<div className="mt-3">
						<NavLink to="/login">
							<Button color="primary">Getting Started</Button>
						</NavLink>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default LandingPage;
