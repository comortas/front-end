import { COMMUNITY_TYPES } from './action-types';

export const communityReducer = (state = { requesting: false, response: [] }, { type, payload }) => {
	switch (type) {
		case COMMUNITY_TYPES.REQ:
			return {
				...state,
				requesting: true
			};
		case COMMUNITY_TYPES.RES:
			return {
				...state,
				response: payload.data,
				requesting: false
			};
		case COMMUNITY_TYPES.FAIL:
			return {
				...state,
				err_response: payload.data,
				requesting: false
			};
		default:
			return state;
	}
};
