import React, { useEffect, useState, useRef } from 'react';
import { Button, Container, Input, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import './style.scss';
import axios from 'axios';
import { mapsApiKey } from '../../utils/constants';
import _get from 'lodash/get';

const Maps = (props) => {
	const [ location, setLocation ] = useState(null);
	const [ parsedLocation, setParsedLocation ] = useState(
		import.meta.env.VITE_IS_LOCAL == '1'
			? {
					location: 'OMR, Thiruporur, Tamil Nadu, India',
					latitude: 12.7297355,
					longitude: 80.1889406
				}
			: null
	);
	console.log('parsedLocation: ', parsedLocation);
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
				// initMap();
				//use it wisely
			}
		},
		[ location ]
	);
	let map;
	let autocomplete;
	let markers = [];
	const initMap = () => {
		map = new google.maps.Map(mapRef.current, { center: location, zoom: 15 });
		autocomplete = new google.maps.places.Autocomplete(locationInputRef.current);
		map.addListener('click', (mapsMouseEvent) => {
			console.log('mapsMouseEvent: ', mapsMouseEvent.latLng);
			axios({
				method: 'get',
				url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${mapsMouseEvent.latLng.lat()},${mapsMouseEvent.latLng.lng()}&key=${mapsApiKey}`,
				responseType: 'json'
			}).then(({ data, status }) => {
				console.log('data: ', data);
				if (status === 200) {
					let place = data.results[0].formatted_address;
					setMapOnAll(null);
					markers = [];
					let latlng = {
						lat: mapsMouseEvent.latLng.lat(),
						lng: mapsMouseEvent.latLng.lng()
					};
					addMarker(latlng, place);
				}
			});
		});
		// addMarker(location, 'current location');
		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();
			let latlng = {
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng()
			};
			console.log('map: ', map);
			map.setCenter(latlng);
			setMapOnAll(null);
			markers = [];
			addMarker(latlng, place.formatted_address);
		});
	};
	const addMarker = (latlng, place) => {
		setParsedLocation({
			location: place,
			latitude: latlng.lat,
			longitude: latlng.lng
		});
		const marker = new google.maps.Marker({
			position: latlng,
			title: place,
			map
		});

		markers.push(marker);
	};
	const setMapOnAll = (map) => {
		for (let i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
	};
	return (
		<div className="kt-map-conatiner">
			<Input innerRef={locationInputRef} className="mb-2" />
			<div ref={mapRef} className="kt-map" />
			<div className="kt-action">
				<Button
					color="primary"
					disabled={!parsedLocation}
					onClick={() => {
						props.callBack(parsedLocation);
					}}
				>
					Confirm Location
				</Button>
			</div>
		</div>
	);
};

export default Maps;
