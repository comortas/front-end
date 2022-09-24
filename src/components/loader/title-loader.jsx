import React from 'react';
import ContentLoader from 'react-content-loader';

const TitleLoader = () => {
	return (
		<ContentLoader speed={1} viewBox="0 0 340 40" backgroundColor="#f6f6ef" foregroundColor="#e8e8e3">
			<rect x="0" y="4" rx="0" ry="0" width="320" height="22" />
			<rect x="0" y="33" rx="0" ry="0" width="108" height="13" />
			<rect x="118" y="33" rx="0" ry="0" width="60" height="13" />
			<rect x="187" y="33" rx="0" ry="0" width="60" height="13" />
		</ContentLoader>
	);
};

export default TitleLoader;
