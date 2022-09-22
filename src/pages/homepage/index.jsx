import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import API_CALL from '../../services';
import './style.scss';

const Homepage = () => {
	const [ state, setState ] = useState([]);
	useEffect(() => {
		communityApi();
	}, []);
	const communityApi = () => {
		API_CALL('get', 'community/list', null, null, ({ data, status }) => {
			console.log('data: ', data);
			setState(data);
		});
	};
	return (
		<Container className="homepage" fluid="xl">
			<Row>
				<Col>
					<div className="my-3 text-center">
						<h1>Popular Events</h1>
					</div>
				</Col>
			</Row>
			<Row>
				{state.map(({ name, description, _id }) => (
					<Col key={_id} xs={12} md={6} lg={4} className="mb-3">
						<Card>
							<CardBody>
								<h4>{name}</h4>
								<p>{description}</p>
							</CardBody>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default Homepage;
