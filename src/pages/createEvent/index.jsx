import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import image from './../../assets/images/event-create.svg';
import './style.scss';

const CreateEvent = () => {
	return (
		<Container className="create-event">
			<Row>
				<Col>{/* <img src={image} width="100%" /> */}</Col>
			</Row>
		</Container>
	);
};

export default CreateEvent;
