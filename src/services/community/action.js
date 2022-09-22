import API_CALL from '..';
import { COMMUNITY_TYPES } from './action-types';

export const getCommunities = () => {
	return API_CALL('get', 'community/list', null, COMMUNITY_TYPES);
};
