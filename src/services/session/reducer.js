import { SESSION_DETAILS } from './action-type';

export const sessionReducer = (state = { session: {}, userInfo: {} }, { type, payload }) => {
	switch (type) {
		case SESSION_DETAILS.SET:
			return {
				...state,
				session: payload.tokenObj,
				userInfo: payload.profileObj
			};
		case SESSION_DETAILS.REMOVE:
			return {
				session: {},
				userInfo: {}
			};
		default:
			return state;
	}
};
