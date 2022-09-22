import React from 'react';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { format } from 'date-fns';
import poster from './../../../assets/images/event-poster.jpg';
import { useDispatch, useSelector } from 'react-redux';
import _get from 'lodash/get';
import API_CALL from '../../../services';
import { toast } from 'react-toastify';
import { getActivities } from '../../../services/events/action';

const EventCard = ({ data }) => {
	console.log('data: ', data);
	const dispatch = useDispatch();
	const {
		name,
		description,
		_id,
		location,
		date,
		noOfVolunteers,
		duration,
		createdBy,
		status,
		communityId,
		volunteers
	} = data;
	const { userInfo } = useSelector(({ userDetailsReducer }) => {
		return {
			userInfo: _get(userDetailsReducer, 'response.user', false)
		};
	});
	const registerInterest = () => {
		API_CALL('post', 'activity/apply', { activityId: _id, volunteerId: userInfo._id }, null, ({ data, status }) => {
			if (status === 200) {
				toast.success(data.message);
				dispatch(getActivities());
			} else {
				toast.error(data.message);
			}
		});
	};
	const renderTextByStatus = () => {
		let self = volunteers.find(({ volunteerId }) => volunteerId == userInfo._id);
		if (!self) return 'I am Interested';
		console.log('self: ', self);
		if (self.requestStatus.toLowerCase() == 'open') return 'I am Interested';

		if (self.requestStatus.toLowerCase() == 'pending') return 'pending';
	};
	return (
		<Col key={_id} xs={12} md={6} lg={4} className="mb-3">
			<Card className="event-card">
				<img src={poster} style={{ borderRadius: '20px 20px 0px 0px' }} />
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
						<Col className="d-flex justify-content-end">
							{userInfo._id != createdBy ? (
								<Button color="primary" onClick={() => registerInterest()}>
									{renderTextByStatus()}
								</Button>
							) : (
								<Button disabled>Owner</Button>
							)}
						</Col>
					</Row>
				</CardBody>
			</Card>
		</Col>
	);
};

export default EventCard;
