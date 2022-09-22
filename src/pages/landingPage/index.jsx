import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import LogoBanner from '../../components/logo-banner';
import serviceImg from './../../assets/images/service.png';
import communityImg from './../../assets/images/community.jpg';
import './style.scss';

const LandingPage = () => {
	return (
		<Container className="landing-page" fluid="xl">
			<Row>
				<Col>
					<LogoBanner />
				</Col>
			</Row>
			<Row className="my-5 align-items-center">
				<Col xs="6">
					<img src={serviceImg} width="100%" />
				</Col>
				<Col xs="6">
					<h4>KarmaTheory</h4>
					<h5>
						<small className="text-muted fw-normal">
							This is not about any kind of theory.<br />
							It is a platform to connect the people whose hands are always up for the community or social
							service.<br />
							This theory may be common for you but we stand out with the concept of{' '}
							<strong>Time Bank</strong>.
						</small>
					</h5>
					<div className="mt-3">
						<NavLink to="/login">
							<Button color="primary">Getting Started</Button>
						</NavLink>
					</div>
				</Col>
			</Row>

			<Row className="my-5 align-items-center">
				<Col xs="6">
					<h4>Event by NGO</h4>
					<h5>
						<small className="text-muted fw-normal">
							An individual can opt-in to manage the NGO.<br />
							Event is created by the manager of the NGO/Community, can give the time to the helpers.<br
							/>
							The approved time is added to the participated helper's account as time.<br />
							The credited time can be redeemed by the individuals' when-ever it is needed. This is how
							the <strong>Karma</strong> works.
						</small>
					</h5>
					<div className="mt-3">
						<NavLink to="/login">
							<Button color="primary">Create Event</Button>
						</NavLink>
					</div>
				</Col>
				<Col xs="6">
					<img src={communityImg} width="100%" />
				</Col>
			</Row>
		</Container>
	);
};

export default LandingPage;
