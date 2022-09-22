import React, { useEffect, useState, useRef } from 'react';
import { Container, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import './style.scss';
import axios from 'axios';
import { mapsApiKey } from '../../utils/constants';

const Maps = () => {
	const [ location, setLocation ] = useState(null);
	const mapRef = useRef(null);
	const locationInputRef = useRef(null);

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

	useEffect(
		() => {
			if (location) {
				// axios({
				// 	method: 'get',
				// 	url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${mapsApiKey}`
				// }).then((data) => {
				// 	console.log('data: ', data);
				// });
				// let map = new google.maps.Map(mapRef.current, { center: location, zoom: 15 });
				// let autocomplete = new google.maps.places.Autocomplete(locationInputRef.current);
				// map.addListener('click', (mapsMouseEvent) => {
				// 	console.log('mapsMouseEvent: ', mapsMouseEvent.latLng);
				// });
				// new google.maps.Marker({
				// 	position: location,
				// 	title: 'current location',
				// 	map
				// });
				// autocomplete.addListener('place_changed', () => {
				// 	const place = autocomplete.getPlace();
				// 	map = new google.maps.Map(mapRef.current, {
				// 		center: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
				// 		zoom: 15
				// 	});
				// 	new google.maps.Marker({
				// 		position: place.geometry.location,
				// 		title: place.name,
				// 		map
				// 	});
				// });
			}
		},
		[ location ]
	);
	return (
		<Container fluid>
			<Input innerRef={locationInputRef} />
			<div ref={mapRef} className="kt-map" />
		</Container>
	);
};

export default React.memo(Maps);
