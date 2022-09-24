import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import _isEmpty from 'lodash/isEmpty';
import Empty from '../../components/no-data';
import API_CALL from '../../services';
import MapView from '../../components/map-view/map-view';
import TitleLoader from '../../components/loader/title-loader';
import './style.scss';

const Event = () => {
	const { id } = useParams();
	const [ details, setDetails ] = useState({});
	const [ titleLoader, setTitleLoader ] = useState(true);
	useEffect(
		() => {
			API_CALL('get', `activity?id=${id}`, null, null, ({ data, status }) => {
				setTitleLoader(false);
				if (status === 200) {
					setDetails(data);
				}
			});
		},
		[ id ]
	);
	return (
		<Container fluid="xl" className="view-event">
			<Row>
				{titleLoader ? (
					<TitleLoader />
				) : (
					<Col className="my-4">
						<h1 className="kt-title">{details.name}</h1>
						<h2 className="mt-3 text-muted">{details.description}</h2>
					</Col>
				)}
			</Row>
			{/* <h4 className="mt-2">Manage</h4> */}
			<Row>
				<Col>{!titleLoader && <MapView config={{ events: [ details ], singleView: true }} />}</Col>
				<Col>{!_isEmpty(details.volunteers) ? null : <Empty message={'Nobody applied'} />}</Col>
			</Row>
		</Container>
	);
};

export default Event;
