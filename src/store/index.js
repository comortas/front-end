import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

/**
 * combineReducers is simply a utility function to simplify the most common use case when writing Redux reducers.
 * It takes an object full of slice reducer functions, and returns a new reducer function
 */
const appReducer = combineReducers({});

/**
 * Creates a Redux store that holds the complete state tree of your app.
 * There should only be a single store in your app.
 */
const rootReducer = (state, action) => {
	if (action.type === 'CLEAR_DATA') {
		state = undefined;
	}
	return appReducer(state, action);
};

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
