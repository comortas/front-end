import React from 'react';
import image from './../../assets/images/blank.svg';

const Empty = ({ message }) => {
	return (
		<div className="kt-empty d-flex justify-content-center">
			<div>
				<img src={image} width="240" />
				<h2 className="text-muted text-center mt-2">{message}</h2>
			</div>
		</div>
	);
};

export default Empty;

Empty.defaultProps = {
	message: 'No data found'
};
