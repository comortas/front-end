import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import image from './../../../assets/images/community-poster.jpg';

const CommunityCard = ({ name, description, _id, location }) => {
	return (
		<Col key={_id} xs={12} md={6} lg={4} className="mb-3">
			<Card className="kt-community-card">
				<img src={image} style={{ borderRadius: '20px 20px 0px 0px' }} />
				<CardBody>
					<NavLink to={`/community/view/${_id}`}>
						<h4>{name}</h4>
					</NavLink>
					<p className="text-muted">{description}</p>
					{location}
				</CardBody>
			</Card>
		</Col>
	);
};

export default CommunityCard;
