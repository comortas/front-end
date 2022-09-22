import { GET_USER_DETAILS } from './action-types';

export const userDetailsReducer = (
	state = { requesting: false, errorResponse: {}, response: {} },
	{ type, payload }
) => {
	switch (type) {
		case GET_USER_DETAILS.REQ:
			return {
				...state,
				requesting: true
			};
		case GET_USER_DETAILS.RES:
			return {
				...state,
				response: payload.data,
				requesting: false
			};
		case GET_USER_DETAILS.FAIL:
			return {
				...state,
				errorResponse: payload.data,
				requesting: false
			};
		default:
			return state;
	}
};
