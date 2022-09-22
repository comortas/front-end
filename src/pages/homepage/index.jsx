import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { getActivities } from '../../services/events/action';
import EventCard from './components/event-card';
import './style.scss';
import _isEmpty from 'lodash/isEmpty';
import Empty from '../../components/no-data';

const Homepage = () => {
	const dispatch = useDispatch();
	const { events, eventsLoader } = useSelector(({ eventReducer }) => ({
		events: eventReducer.response,
		eventsLoader: eventReducer.requesting
	}));
	useEffect(() => {
		dispatch(getActivities());
	}, []);
	console.log('events: ', events);
	if (eventsLoader) return 'loading...';
	return (
		<Container className="homepage" fluid="xl">
			<Row>
				<Col className="mt-5 mb-3">
					<h1 className="kt-title">Popular Events</h1>
				</Col>
			</Row>
			<Row>
				{_isEmpty(events) ? (
					<Empty />
				) : (
					events
						.filter(({ status }) => status === 'open')
						.map((data, index) => <EventCard key={index} data={data} />)
				)}
			</Row>
		</Container>
	);
};

export default Homepage;
