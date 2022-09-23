import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	Modal,
	ModalHeader,
	ModalBody
} from 'reactstrap';
import Calendar from 'react-widgets/Calendar';
import TimeKeeper from 'react-timekeeper';
import './style.scss';
import formImg from './../../assets/images/event-create.svg';
import { format, set } from 'date-fns';
import { useSelector } from 'react-redux';
import _get from 'lodash/get';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import API_CALL from '../../services';
import Maps from '../../components/maps';
import { toast } from 'react-toastify';

const CreateEvent = () => {
	const { id } = useParams();
	const [ details, setDetails ] = useState({});
	const { userInfo } = useSelector(({ userDetailsReducer }) => {
		return {
			userInfo: _get(userDetailsReducer, 'response.user', false)
		};
	});
	const navigate = useNavigate();
	useEffect(
		() => {
			API_CALL('get', `community?id=${id}`, null, null, ({ data, status }) => {
				if (status === 200) {
					setDetails(data);
				}
			});
		},
		[ id ]
	);
	const [ locationModal, setLocationModal ] = useState(false);
	const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
		initialValues: {
			type: 'event',
			location: '',
			latitude: '',
			longitude: '',
			name: '',
			description: '',
			date: new Date(),
			time: '12:00',
			duration: '',
			poc: '',
			noOfVolunteers: '',
			createdBy: userInfo._id,
			admin: userInfo._id,
			communityId: id
		},
		onSubmit: (values) => {
			let payload = Object.assign({}, values);
			payload.date = set(payload.date, {
				hours: payload.time.split(':')[0],
				minutes: payload.time.split(':')[1]
			});
			API_CALL('post', 'activity', payload, null, ({ data, status }) => {
				if (status === 200) {
					toast.success(data.message);
					navigate(`community/view/${id}`);
				} else {
					toast.error(data.message);
				}
			});
		}
	});

	const toggle = () => {
		setLocationModal(!locationModal);
	};
	const parsedLocation = (data) => {
		toggle();
		console.log('parsedLocation data: ', data);
		if (data) {
			const { latitude, longitude, location } = data;
			setFieldValue('location', location);
			setFieldValue('latitude', latitude);
			setFieldValue('longitude', longitude);
		}
	};

	return (
		<Container className="seek-for-help">
			<Row>
				<Col className="my-5">
					<Row>
						<Col xs={12} md={12} lg={6} className="sticky">
							<div className="mb-4">
								<h1 className="kt-title">
									Create<br />
									<small className="text-muted">Event</small>
								</h1>
							</div>
							<img src={formImg} width="100%" />
						</Col>
						<Col xs={12} md={12} lg={6}>
							<Card>
								<CardBody>
									<p className="text-muted">
										Note: This event is created under <strong>{details.name}</strong> community
									</p>
									<Form onSubmit={handleSubmit}>
										<FormGroup>
											<Label>Title</Label>
											<Input name="name" onChange={handleChange} value={values.name} />
										</FormGroup>
										<FormGroup>
											<Label>Description</Label>
											<Input
												type="textarea"
												name="description"
												onChange={handleChange}
												value={values.description}
											/>
										</FormGroup>
										<FormGroup>
											<Label>Date</Label>
											<Row>
												<Col xs={12} md={6}>
													<Calendar
														value={values.date}
														onChange={(value) => setFieldValue('date', value)}
														defaultValue={new Date()}
														min={new Date()}
													/>
												</Col>
												<Col xs={12} md={6}>
													<TimeKeeper
														time={values.time}
														onChange={(value) => setFieldValue('time', value.formatted24)}
													/>
												</Col>
											</Row>
										</FormGroup>
										<FormGroup>
											<Label>Duration</Label>
											<Input
												type="number"
												name="duration"
												onChange={handleChange}
												value={values.duration}
											/>
										</FormGroup>
										<FormGroup>
											<Label>Location</Label>
											<Input
												name="location"
												disabled
												onChange={handleChange}
												value={values.location}
											/>
											<Button onClick={toggle} className="mt-2">
												Add Location
											</Button>
											<Modal isOpen={locationModal} toggle={toggle} fullscreen>
												<ModalHeader toggle={toggle}>Add Location</ModalHeader>
												<ModalBody>
													<Maps callBack={(data) => parsedLocation(data)} />
												</ModalBody>
											</Modal>
										</FormGroup>
										<FormGroup>
											<Label>Point of Contact</Label>
											<Input
												type="number"
												name="poc"
												onChange={handleChange}
												value={values.poc}
											/>
										</FormGroup>
										<FormGroup>
											<Label>No of Volunteer(s)</Label>
											<Input
												type="number"
												name="noOfVolunteers"
												onChange={handleChange}
												value={values.noOfVolunteers}
											/>
										</FormGroup>
										<FormGroup>
											<Label>
												Preferred Gender <small className="text-muted">(Optional)</small>
											</Label>
											<br />
											<Input
												type="radio"
												name="preferredGender"
												onChange={handleChange}
												value={'Male'}
											/>{' '}
											Male{' '}
											<Input
												type="radio"
												name="preferredGender"
												onChange={handleChange}
												value={'Female'}
											/>{' '}
											Female
										</FormGroup>
										<FormGroup className="d-flex justify-content-end">
											<NavLink to="/">
												<Button type="button" outline className="me-2">
													Cancel
												</Button>
											</NavLink>
											<Button type="submit" color="primary">
												Post
											</Button>
										</FormGroup>
									</Form>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default CreateEvent;
