import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane, CardBody, Button, Card } from 'reactstrap';
import { getActivities } from '../../services/events/action';
import EventCard from './components/event-card';
import './style.scss';
import _isEmpty from 'lodash/isEmpty';
import Empty from '../../components/no-data';
import MapView from './components/map-view';
import { format } from 'date-fns';
import poster from '../../assets/images/event-poster.jpg';

const Homepage = () => {
	const dispatch = useDispatch();
	const { events, eventsLoader } = useSelector(({ eventReducer }) => ({
		events: eventReducer.response,
		eventsLoader: eventReducer.requesting
	}));
	const [ activeTab, setActive ] = useState(2);
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
			console.log('selectedEvent: ', selectedEvent);
			const {
				communityId = false,
				description,
				location,
				duration,
				noOfVolunteers,
				createdBy,
				date
			} = selectedEvent;
			return (
				<Col xs={12} md={4} lg={4} className="animated fadeIn">
					<Card className="event-card">
						<img src={poster} style={{ borderRadius: '20px 20px 0px 0px', width: '100%' }} />
						<CardBody>
							<h4>{name}</h4>
							<Button outline size="sm">
								{communityId ? 'Community' : 'Individual'}
							</Button>
							<p>
								{description}
								<br />
								Location<br />
								<span className="text-muted">{location}</span>
							</p>
							<Row>
								<Col>
									Date<br />
									<span className="text-muted">
										{format(new Date(date), 'dd/MM/yyyy h:mm a')} {duration}Hr(s)
									</span>
								</Col>
								<Col>
									Volunteer(s)<br />
									<span className="text-muted">{noOfVolunteers}</span>
								</Col>
							</Row>
							<Row>
								{/* <Col className="d-flex justify-content-end">
									{userInfo._id != createdBy ? (
										<Button color="primary" onClick={() => registerInterest()}>
											{renderTextByStatus()}
										</Button>
									) : (
										<Button disabled>Owner</Button>
									)}
								</Col> */}
							</Row>
						</CardBody>
					</Card>
				</Col>
			);
		}
	};
	useEffect(
		() => {
			if (activeTab == '1') {
				setSelectedEvent(undefined);
			}
		},
		[ activeTab ]
	);
	if (eventsLoader) return 'loading...';
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
					<Row>
						{_isEmpty(events) ? (
							<Empty />
						) : (
							events
								.filter(({ status }) => status === 'open')
								.map((data, index) => <EventCard key={index} data={data} />)
						)}
					</Row>
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
