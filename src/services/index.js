import axios from 'axios';
import { load } from 'react-cookies';
// import './axios-auth-refresh-token';
// import { Toast } from './common-action';
import store from '../store';
import _get from 'lodash/get';
import { removeSession } from './session/action';
// import { constants } from '../utils/constants';

const ROOT_URL = import.meta.env.VITE_API_URL;

export const getToken = () => {
	return load('session') && `Bearer ${load('session').id_token}`;
};
function API_CALL(method, url, data, type, callback, headerConfig, errCallback, file, onUploadProgress, cancelToken) {
	import.meta.env.VITE_IS_LOCAL == '1' &&
		console.log('Calling API for the method of ' + method + ' : ' + ROOT_URL + url);

	axios.interceptors.request.use(
		(config) => {
			let header = {
				'Cache-Control': 'no-cache'
			};
			headerConfig ? (header = { ...header, ...headerConfig }) : (header = header);
			if (getToken()) {
				header['Authorization'] = getToken();
			}
			config.headers = { ...config.headers, ...header };
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	axios.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			const { config, response: { status } } = error;
			if (status === 401) {
				store.dispatch(removeSession());
			}
		}
	);

	if (callback) {
		axios({
			method,
			url: ROOT_URL + url,
			data,
			responseType: file ? 'arraybuffer' : 'json',
			onUploadProgress: ({ loaded, total }) => {
				let percent = Math.floor(loaded * 100 / total);
				return onUploadProgress ? onUploadProgress(percent) : false;
				// Do whatever you want with the native progress event
			},
			cancelToken
		}).then((data) => {
			return callback(data);
		});
	} else {
		return function(dispatch) {
			dispatch({
				type: type.REQ
			});
			axios({
				method,
				url: ROOT_URL + url,
				data
			}).then((response) => {
				if (response.status === 500 || response.status === 400) {
					// Toast.add({ type: 'error', message: response.data.message });
					dispatch({
						type: type.FAIL,
						payload: response
					});
				} else {
					dispatch({
						type: type.RES,
						payload: response
					});
				}
			});
		};
	}
}

export default API_CALL;
