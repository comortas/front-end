import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Col, Container, Row } from 'reactstrap';
import API_CALL from '../../../services';
import EventCard from '../../../components/event-card/event-card';
import { NavLink } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';
import Empty from '../../../components/no-data';
import CardLoader from '../../../components/loader/card-loader';
import TitleLoader from '../../../components/loader/title-loader';
import './style.scss';
import { useSelector } from 'react-redux';

const ViewCommunity = () => {
	const { id } = useParams();
	const [ details, setDetails ] = useState({});
	const [ titleLoader, setTitleLoader ] = useState(true);
	const [ events, setEvents ] = useState([]);
	const [ loader, setLoader ] = useState(true);
	const { userInfo } = useSelector(({ userDetailsReducer }) => {
		return {
			userInfo: _get(userDetailsReducer, 'response.user', false)
		};
	});
	useEffect(
		() => {
			API_CALL('get', `community?id=${id}`, null, null, ({ data, status }) => {
				setTitleLoader(false);
				if (status === 200) {
					setDetails(data);
				}
			});
			API_CALL('get', `activity/list?communityid=${id}`, null, null, ({ data, status }) => {
				setLoader(false);
				if (status === 200) {
					setEvents(data);
				}
			});
		},
		[ id ]
	);
	return (
		<Container fluid="xl" className="view-community">
			<Row>
				{titleLoader ? (
					<TitleLoader />
				) : (
					<Col className="mt-3">
						<h1 className="kt-title">{details.name}</h1>
						<h2 className="mt-3 text-muted">{details.description}</h2>
						<p>{details.location}</p>
					</Col>
				)}
			</Row>
			<Row>
				<Col className="mt-3">
					<h3 className="d-flex align-items-center justify-content-between">
						Events
						{details.admin === userInfo._id && (
							<NavLink to={`/createevent/${id}`}>
								<Button color="primary">Create</Button>
							</NavLink>
						)}
					</h3>
				</Col>
			</Row>
			{loader ? (
				<CardLoader />
			) : (
				<Row>
					{_isEmpty(events) ? (
						<Empty message={'No events'} />
					) : (
						events.map((data, index) => (
							<Col key={index} xs={12} md={6} lg={4} className="mb-3">
								<EventCard data={data} />
							</Col>
						))
					)}
				</Row>
			)}
		</Container>
	);
};

export default ViewCommunity;
