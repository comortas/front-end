import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';

const CommunityCard = ({ name, description, _id, location }) => {
	const navigate = useNavigate();
	return (
		<Col
			key={_id}
			xs={12}
			md={6}
			lg={4}
			className="mb-3"
			onClick={() => {
				navigate(`/community/view/${_id}`);
			}}
		>
			<Card className="kt-community-card">
				<CardBody>
					<h4>{name}</h4>
					<p>{description}</p>
				</CardBody>
			</Card>
		</Col>
	);
};

export default CommunityCard;
