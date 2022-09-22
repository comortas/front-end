import API_CALL from '..';
import { GET_USER_DETAILS } from './action-types';

export function getUserDetails() {
	return API_CALL('post', 'user', null, GET_USER_DETAILS);
}
