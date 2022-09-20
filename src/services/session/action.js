import { remove, save } from 'react-cookies';
import { SESSION_DETAILS } from './action-type';
import store from '../../store';

export const setSession = (payload) => {
	save('session', JSON.stringify(payload));
	return {
		type: SESSION_DETAILS.SET,
		payload
	};
};

export const removeSession = () => {
	remove('session');
	store.dispatch({ type: 'CLEAR_DATA' });
	return {
		type: SESSION_DETAILS.REMOVE
	};
};
