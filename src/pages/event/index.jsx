import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import _isEmpty from 'lodash/isEmpty';
import Empty from '../../components/no-data';
import API_CALL from '../../services';

const Event = () => {
	const { id } = useParams();
	const [ details, setDetails ] = useState({});
	useEffect(
		() => {
			API_CALL('get', `activity?id=${id}`, null, null, ({ data, status }) => {
				if (status === 200) {
					setDetails(data);
				}
			});
		},
		[ id ]
	);
	return (
		<Container fluid="xl">
			<Row>
				<Col className="my-4">
					<h1 className="kt-title">{details.name}</h1>
					<h2 className="mt-3 text-muted">{details.description}</h2>
				</Col>
			</Row>
			{/* <h4 className="mt-2">Manage</h4> */}
			<Row>
				<Col>{!_isEmpty(details.volunteers) ? null : <Empty message={'Nobody applied'} />}</Col>
				<Col>Maps Block</Col>
			</Row>
		</Container>
	);
};

export default Event;
