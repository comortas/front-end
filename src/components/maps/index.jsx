// import React from 'react';
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// const containerStyle = {
// 	width: '400px',
// 	height: '400px'
// };

// const center = {
// 	lat: -3.745,
// 	lng: -38.523
// };

// const Maps = () => {
// 	const { isLoaded } = useJsApiLoader({
// 		id: 'google-map-script',
// 		googleMapsApiKey: 'YOUR_API_KEY'
// 	});

// 	const [ map, setMap ] = React.useState(null);

// 	const onLoad = React.useCallback(function callback(map) {
// 		const bounds = new window.google.maps.LatLngBounds(center);
// 		map.fitBounds(bounds);
// 		setMap(map);
// 	}, []);

// 	const onUnmount = React.useCallback(function callback(map) {
// 		setMap(null);
// 	}, []);

// 	return isLoaded ? (
// 		<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
// 			{/* Child components, such as markers, info windows, etc. */}
// 		</GoogleMap>
// 	) : null;
// };

// export default React.memo(Maps);
import React, { useEffect } from 'react';
import API_CALL from '../../services';
import './style.scss';

const Maps = () => {
	useEffect(() => {
		communityApi();
	}, []);
	const communityApi = () => {
		API_CALL(
			'post',
			'community',
			{
				name: 'Feed The Needy',
				description: 'description',
				category: 'Social',
				location: 'chennai',
				latitude: '13.067439',
				longitude: '80.237617',
				createdBy: 'kishore'
			},
			null,
			({ data, status }) => {
				console.log('status: ', status);
				console.log('data: ', data);
			}
		);
	};
	return <div id="mapdiv" />;
};

export default Maps;
