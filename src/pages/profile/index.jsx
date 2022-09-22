import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row } from 'reactstrap';
import _get from 'lodash/get';
import './style.scss';

const Profile = () => {
	const { userInfo } = useSelector(({ userDetailsReducer }) => {
		return {
			userInfo: _get(userDetailsReducer, 'response.user', false)
		};
	});
	console.log('userInfo: ', userInfo);

	return (
		<div className="kt-profile-section">
			<Row className="p-2">
				<Col md={4}>
					<Card>
						<div className="kt-logo-section">
							<img alt="Sample" className="kt-user-logo my-2 shadow-sm" src={userInfo.profilePicture} />
						</div>
						<CardBody>
							<CardTitle tag="h5">{userInfo.name}</CardTitle>
							<CardSubtitle className="mb-2 text-muted" tag="h6">
								{userInfo.email}
							</CardSubtitle>
							<CardSubtitle className="mb-2 text-muted" tag="h6">
								Time Wallet : {userInfo.wallet} hr(s)
							</CardSubtitle>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Profile;
