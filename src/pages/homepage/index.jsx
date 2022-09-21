import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import API_CALL from '../../services';
import './style.scss';

const Homepage = () => {
	useEffect(() => {
		communityApi();
	}, []);
	const communityApi = () => {
		API_CALL('get', 'community/list', null, null, ({ data, status }) => {
			console.log('data: ', data);
		});
	};
	return (
		<Container className="homepage" fluid="xl">
			<Row>
				<Col>
					<div className="my-3 text-center">
						<h1>List all the events & helps</h1>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Homepage;
