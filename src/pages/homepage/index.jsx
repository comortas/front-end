import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { getActivities } from '../../services/events/action';
import EventCard from './components/event-card';
import './style.scss';

const Homepage = () => {
	const dispatch = useDispatch();
	const { events } = useSelector(({ eventReducer }) => ({ events: eventReducer.response }));
	useEffect(() => {
		dispatch(getActivities());
	}, []);
	return (
		<Container className="homepage" fluid="xl">
			<Row>
				<Col className="mt-5 mb-3">
					<h1 className="kt-title">Popular Events</h1>
				</Col>
			</Row>
			<Row>{events.filter(({ status }) => status === 'open').map((data) => <EventCard {...data} />)}</Row>
		</Container>
	);
};

export default Homepage;
