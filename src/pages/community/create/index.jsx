import { useFormik } from 'formik';
import React, { useState } from 'react';
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
	ModalBody,
	FormFeedback
} from 'reactstrap';
import './style.scss';
import formImg from './../../../assets/images/add.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import Maps from '../../../components/maps';
import API_CALL from '../../../services';
import { useSelector } from 'react-redux';
import _get from 'lodash/get';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CreateCommunity = () => {
	const navigate = useNavigate();
	const { userInfo } = useSelector(({ userDetailsReducer }) => {
		return {
			userInfo: _get(userDetailsReducer, 'response.user', false)
		};
	});
	const [ locationModal, setLocationModal ] = useState(false);
	const { handleChange, handleSubmit, setFieldValue, values, errors } = useFormik({
		initialValues: {
			location: '',
			name: '',
			description: '',
			latitude: '',
			longitude: '',
			createdBy: userInfo._id,
			admin: userInfo._id
		},
		validate: (values) => {
			let errors = {};
			if (!values.name) {
				errors.name = true;
			}
			if (!values.description) {
				errors.description = true;
			}
			if (!values.location) {
				errors.location = true;
			}
			return errors;
		},
		onSubmit: (values) => {
			API_CALL('post', 'community', values, null, ({ data, status }) => {
				console.log('data: ', data);
				if (status === 200) {
					navigate('community');
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
		<Container className="create-community">
			<Row>
				<Col className="my-5">
					<Row>
						<Col xs={12} md={12} lg={6} className="sticky">
							<div className="mb-4">
								<h1 className="kt-title">
									Create<br />
									<small className="text-muted">Community</small>
								</h1>
							</div>
							<img src={formImg} width="100%" />
						</Col>
						<Col xs={12} md={12} lg={6}>
							<Card>
								<CardBody>
									<Form onSubmit={handleSubmit}>
										<FormGroup>
											<Label>Title</Label>
											<Input
												name="name"
												onChange={handleChange}
												value={values.name}
												invalid={errors.name}
											/>
											{errors.name && <FormFeedback>Required</FormFeedback>}
										</FormGroup>
										<FormGroup>
											<Label>Description</Label>
											<Input
												type="textarea"
												name="description"
												onChange={handleChange}
												value={values.description}
												invalid={errors.description}
											/>
											{errors.description && <FormFeedback>Required</FormFeedback>}
										</FormGroup>
										<FormGroup>
											<Label>Location</Label>
											<Input
												name="location"
												disabled
												onChange={handleChange}
												value={values.location}
												invalid={errors.location}
											/>
											<Button onClick={toggle} className="mt-2">
												<FontAwesomeIcon icon={('fas', 'location-dot')} /> Add Location
											</Button>
											{errors.location && <FormFeedback>Required</FormFeedback>}
											<Modal isOpen={locationModal} toggle={toggle} fullscreen>
												<ModalHeader toggle={toggle}>Add Location</ModalHeader>
												<ModalBody>
													<Maps callBack={(data) => parsedLocation(data)} />
												</ModalBody>
											</Modal>
										</FormGroup>
										<FormGroup className="d-flex justify-content-end">
											<NavLink to="/community">
												<Button type="button" outline className="me-2">
													Cancel
												</Button>
											</NavLink>
											<Button type="submit" color="primary">
												Submit
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

export default CreateCommunity;
