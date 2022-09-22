import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import './style.scss';

const Homepage = () => {
	return (
		<Container className="homepage" fluid="xl">
			<Row>
				<Col>
					<div className="my-3 text-center">
						<h1>Popular Events</h1>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Homepage;
