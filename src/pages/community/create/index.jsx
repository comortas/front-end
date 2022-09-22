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
	ModalBody
} from 'reactstrap';
import './style.scss';
import formImg from './../../../assets/images/add.svg';
import { NavLink } from 'react-router-dom';
import Maps from '../../../components/maps';
import API_CALL from '../../../services';
import { useSelector } from 'react-redux';
import _get from 'lodash/get';

const CreateCommunity = () => {
	const { userInfo } = useSelector(({ userDetailsReducer }) => {
		return {
			userInfo: _get(userDetailsReducer, 'response.user', false)
		};
	});
	const [ locationModal, setLocationModal ] = useState(false);
	const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
		initialValues: {
			type: 'event', // event | help
			location: '',
			name: '',
			description: '',
			latitude: '',
			longitude: '',
			createdBy: userInfo._id,
			admin: userInfo._id
		},
		onSubmit: (values) => {
			console.log(values);
			API_CALL('post', 'community', values, null, ({ data, status }) => {
				console.log('data: ', data);
				if (status === 200) {
					console.log('status: ', status);
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
											<Label>Location</Label>
											<Input name="location" onChange={handleChange} value={values.location} />
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
