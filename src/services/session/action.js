import { save } from 'react-cookies';
import { SESSION_DETAILS } from './action-type';

export function setSession(payload) {
	save('session', payload.tokenObj);
	return {
		type: SESSION_DETAILS.SET,
		payload
	};
}
