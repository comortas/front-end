import { useFormik } from 'formik';
import React from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import './style.scss';
import formImg from './../../assets/images/form.svg';

const SeekForHelp = () => {
	const { handleChange, handleSubmit, values } = useFormik({
		initialValues: {
			location: ''
		}
	});
	return (
		<Container className="seek-for-help">
			<Row>
				<Col className="my-5">
					<Row>
						<Col xs={6}>
							<h4 className="text-center mb-4">Seek for help</h4>
							<img src={formImg} width="100%" />
						</Col>
						<Col xs={6}>
							<Card>
								<CardBody>
									<Form onSubmit={handleSubmit}>
										<FormGroup>
											<Label>Location</Label>
											<Input name="location" onChange={handleChange} value={values.location} />
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
