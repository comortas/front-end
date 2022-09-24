import React from 'react';
import { Col, Row } from 'reactstrap';
import ContentLoader from 'react-content-loader';

const CardLoader = () => {
	return (
		<Row>
			<Col>
				<ContentLoader viewBox="0 0 450 400" backgroundColor="#f0f0f0" foregroundColor="#dedede">
					<rect x="0" y="284" rx="4" ry="4" width="271" height="9" />
					<rect x="0" y="313" rx="3" ry="3" width="119" height="6" />
					<rect x="0" y="0" rx="10" ry="10" width="450" height="260" />
				</ContentLoader>
			</Col>
			<Col>
				<ContentLoader viewBox="0 0 450 400" backgroundColor="#f0f0f0" foregroundColor="#dedede">
					<rect x="0" y="284" rx="4" ry="4" width="271" height="9" />
					<rect x="0" y="313" rx="3" ry="3" width="119" height="6" />
					<rect x="0" y="0" rx="10" ry="10" width="450" height="260" />
				</ContentLoader>
			</Col>
			<Col>
				<ContentLoader viewBox="0 0 450 400" backgroundColor="#f0f0f0" foregroundColor="#dedede">
					<rect x="0" y="284" rx="4" ry="4" width="271" height="9" />
					<rect x="0" y="313" rx="3" ry="3" width="119" height="6" />
					<rect x="0" y="0" rx="10" ry="10" width="450" height="260" />
				</ContentLoader>
			</Col>
		</Row>
	);
};

export default CardLoader;
