import { useFormik } from 'formik';
import React from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Calendar from 'react-widgets/Calendar';
import TimeKeeper from 'react-timekeeper';
import './style.scss';
import formImg from './../../assets/images/form.svg';
import { NavLink } from 'react-router-dom';

const SeekForHelp = () => {
	const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
		initialValues: {
			type: 'help',
			location: '',
			name: '',
			description: '',
			date: new Date(),
			time: '12:00',
			duration: '',
			poc: '',
			noOfVolunteers: '',
			preferredGender: ''
		},
		onSubmit: (values) => {
			console.log(values);
		}
	});
	return (
		<Container className="seek-for-help">
			<Row>
				<Col className="my-5">
					<Row>
						<Col xs={12} md={12} lg={6} className="sticky">
							<div className="mb-4">
								<h1 className="title">
									Seek<br />
									<small className="text-muted">For</small>
									<br />Help
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
											<Input name="location" onChange={handleChange} value={values.location} />
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

export default SeekForHelp;
