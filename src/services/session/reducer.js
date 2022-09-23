import { SESSION_DETAILS } from './action-type';

export const sessionReducer = (state = { session: {} }, { type, payload }) => {
	switch (type) {
		case SESSION_DETAILS.SET:
			return {
				...state,
				session: payload
			};
		case SESSION_DETAILS.REMOVE:
			return {
				session: {}
			};
		default:
			return state;
	}
};
