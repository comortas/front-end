import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Col, Container, Row } from 'reactstrap';
import API_CALL from '../../../services';
import EventCard from '../../../components/event-card/event-card';
import { NavLink } from 'react-router-dom';

const ViewCommunity = () => {
	const { id } = useParams();
	const [ details, setDetails ] = useState({});
	const [ events, setEvents ] = useState([]);
	useEffect(
		() => {
			API_CALL('get', `community?id=${id}`, null, null, ({ data, status }) => {
				if (status === 200) {
					setDetails(data);
				}
			});
			API_CALL('get', `activity/list?communityid=${id}`, null, null, ({ data, status }) => {
				if (status === 200) {
					setEvents(data);
				}
			});
		},
		[ id ]
	);
	return (
		<Container fluid="xl">
			<Row>
				<Col className="mt-3">
					<h1 className="kt-title">{details.name}</h1>
					<h2 className="mt-3 text-muted">{details.description}</h2>
					<p>{details.location}</p>
				</Col>
			</Row>
			<Row>
				<Col className="mt-3">
					<h3 className="d-flex align-items-center justify-content-between">
						Events
						<NavLink to={`/createevent/${id}`}>
							<Button color="primary">Create</Button>
						</NavLink>
					</h3>
				</Col>
			</Row>
			<Row>{events.map((data, index) => <EventCard key={index} data={data} />)}</Row>
		</Container>
	);
};

export default ViewCommunity;
