import API_CALL from '..';
import { EVENTS_TYPES } from './action-types';

export const getActivities = () => {
	return API_CALL('get', 'activity/list', null, EVENTS_TYPES);
};
