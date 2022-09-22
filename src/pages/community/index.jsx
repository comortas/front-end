import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as RLink } from 'react-router-dom';
import _get from 'lodash/get';
import { Button, Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { getCommunities } from '../../services/community/action';
import CommunityCard from './components';
import './style.scss';

const Community = () => {
	const { communities, userInfo } = useSelector(({ communityReducer, userDetailsReducer }) => ({
		communities: communityReducer.response,
		loader: communityReducer.requesting,
		userInfo: _get(userDetailsReducer, 'response.user', false)
	}));
	const [ activeTab, setActive ] = useState(1);
	const dispatch = useDispatch();
	useEffect(
		() => {
			console.log(userInfo);
			activeTab == 1 ? dispatch(getCommunities()) : dispatch(getCommunities(userInfo._id));
		},
		[ activeTab ]
	);
	return (
		<Container className="community">
			<Row>
				<Col className="mt-5 mb-3">
					<h1 className="kt-title">Community</h1>
				</Col>
			</Row>
			<Nav pills>
				<NavItem>
					<NavLink className={activeTab == 1 ? 'active' : ''} onClick={() => setActive(1)}>
						All
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink className={activeTab == 2 ? 'active' : ''} onClick={() => setActive(2)}>
						Mine
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={activeTab} className="py-3">
				<TabPane tabId={1}>
					<Row>{communities.map((data, index) => <CommunityCard key={index} {...data} />)}</Row>
				</TabPane>
				<TabPane tabId={2}>
					<Row>
						<Col xs={12} md={6} lg={4} className="mb-3">
							<Card className="create-card">
								<CardBody>
									<div className="text-center">
										{communities.length > 0 ? (
											'New community can be created'
										) : (
											'Right now you are not part of any community'
										)}
										<br />
										<br />
										<RLink to="/community/create">
											<Button color="primary" outline>
												+ Create
											</Button>
										</RLink>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</TabPane>
			</TabContent>
		</Container>
	);
};

export default Community;
