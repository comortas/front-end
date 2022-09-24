import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane, CardBody, Button, Card } from 'reactstrap';
import { getActivities } from '../../services/events/action';
import EventCard from '../../components/event-card/event-card';
import './style.scss';
import _isEmpty from 'lodash/isEmpty';
import Empty from '../../components/no-data';
import { format } from 'date-fns';
import poster from '../../assets/images/event-poster.jpg';
import MapView from '../../components/map-view/map-view';
import CardLoader from '../../components/loader/card-loader';
const Homepage = () => {
	const dispatch = useDispatch();
	const { events, eventsLoader } = useSelector(({ eventReducer }) => ({
		events: eventReducer.response,
		eventsLoader: eventReducer.requesting
	}));
	const [ activeTab, setActive ] = useState(1);
	useEffect(() => {
		dispatch(getActivities());
	}, []);
	const [ selectedEvent, setSelectedEvent ] = useState();

	const setEvent = (eventId) => {
		let selectedEventDetails = events.find(({ _id }) => _id == eventId);
		setSelectedEvent(selectedEventDetails);
	};
	const renderSelectedEvent = () => {
		if (selectedEvent) {
			return (
				<Col xs={12} md={4} lg={4} className="animated fadeIn">
					<EventCard data={selectedEvent} outsideCommunity={true} />
				</Col>
			);
		}
	};
	useEffect(
		() => {
			if (activeTab == 1) {
				setSelectedEvent(undefined);
			}
		},
		[ activeTab ]
	);

	return (
		<Container className="homepage" fluid="xl">
			<Row>
				<Col className="mt-5 mb-3">
					<h1 className="kt-title">Popular Events</h1>
				</Col>
			</Row>
			<Nav pills>
				<NavItem>
					<NavLink className={activeTab == 1 ? 'active' : ''} onClick={() => setActive(1)}>
						Card
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink className={activeTab == 2 ? 'active' : ''} onClick={() => setActive(2)}>
						Map
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={activeTab} className="py-3">
				<TabPane tabId={1}>
					{eventsLoader ? (
						<CardLoader />
					) : (
						<Row>
							{_isEmpty(events) ? (
								<Empty />
							) : (
								events.filter(({ status }) => status === 'open').map((data, index) => (
									<Col key={index} xs={12} md={6} lg={4} className="mb-3">
										<EventCard data={data} outsideCommunity={true} />
									</Col>
								))
							)}
						</Row>
					)}
				</TabPane>
				<TabPane tabId={2}>
					<Row>
						<Col xs={12} md={selectedEvent ? 8 : 12} lg={selectedEvent ? 8 : 12}>
							<MapView config={{ events, selectedEventCallBack: (data) => setEvent(data) }} />
						</Col>
						{renderSelectedEvent()}
					</Row>
				</TabPane>
			</TabContent>
		</Container>
	);
};

export default Homepage;
