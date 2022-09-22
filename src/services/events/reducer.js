import { EVENTS_TYPES } from './action-types';

export const communityReducer = (state = { requesting: false, response: [] }, { type, payload }) => {
	switch (type) {
		case EVENTS_TYPES.REQ:
			return {
				...state,
				requesting: true
			};
		case EVENTS_TYPES.RES:
			return {
				...state,
				response: payload.data,
				requesting: false
			};
		case EVENTS_TYPES.FAIL:
			return {
				...state,
				err_response: payload.data,
				requesting: false
			};
		default:
			return state;
	}
};
