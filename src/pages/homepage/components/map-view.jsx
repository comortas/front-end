import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'reactstrap';
import _isEmpty from 'lodash/isEmpty';

const MapView = ({ config }) => {
	const { events, selectedEventCallBack } = config;
	const mapRef = useRef(null);
	const [ location, setLocation ] = useState();
	useEffect(() => {
		handlePermission();
	}, []);
	const handlePermission = async () => {
		if (navigator.geolocation) {
			try {
				const permission = await navigator.permissions.query({ name: 'geolocation' });
				if (permission.state != 'denied') return getCurrentPosition();
				toast.error('Access to Location denied');
			} catch (error) {
				console.log('error: ', error);
			}
		}
	};
	const getCurrentPosition = () => {
		navigator.geolocation.getCurrentPosition((location) => {
			const { coords } = location;
			setLocation({ lat: coords.latitude, lng: coords.longitude });
		});
	};

	const [ map, setMap ] = useState();
	const [ markers, setMarkers ] = useState([]);

	useEffect(
		() => {
			if (location && mapRef && mapRef.current) {
				setMap(
					new google.maps.Map(mapRef.current, {
						center: location,
						zoom: 15,
						mapTypeControlOptions: {
							mapTypeIds: []
						}
					})
				);
			}
		},
		[ location, mapRef ]
	);

	useEffect(
		() => {
			if (!_isEmpty(events) && !_isEmpty(map)) {
				events.map((event) => {
					const { latitude, longitude, location, _id } = event;
					addMarker({ lat: parseFloat(latitude), lng: parseFloat(longitude) }, location, _id);
				});
			}
		},
		[ events, map ]
	);

	const addMarker = (latlng, place, _id) => {
		const marker = new google.maps.Marker({
			position: latlng,
			title: place,
			map
		});
		marker.addListener('click', () => {
			selectedEventCallBack(_id);
		});
		setMarkers([ ...markers, marker ]);
	};

	return (
		<div className="kt-map-view-container">
			<div ref={mapRef} className="kt-map" />
		</div>
	);
};

export default MapView;
