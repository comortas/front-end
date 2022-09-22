import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';

const CommunityCard = ({ name, description, _id, location }) => {
	return (
		<Col key={_id} xs={12} md={6} lg={4} className="mb-3">
			<Card>
				<CardBody>
					<h4>{name}</h4>
					<p>{description}</p>
				</CardBody>
			</Card>
		</Col>
	);
};

export default CommunityCard;
