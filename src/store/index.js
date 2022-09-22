import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { sessionReducer } from '../services/session/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { communityReducer } from '../services/community/reducer';
/**
 * combineReducers is simply a utility function to simplify the most common use case when writing Redux reducers.
 * It takes an object full of slice reducer functions, and returns a new reducer function
 */

const appReducer = combineReducers({
	sessionReducer,
	communityReducer
});

/**
 * Creates a Redux store that holds the complete state tree of your app.
 * There should only be a single store in your app.
 */
const rootReducer = (state, action) => {
	if (action.type === 'CLEAR_DATA') {
		storage.removeItem('persist:root');
		state = undefined;
	}
	return appReducer(state, action);
};

const persistConfig = {
	key: 'root',
	storage,
	whitelist: [ 'sessionReducer' ]
	// blacklist: [ 'videoChat', 'voipCallReducer' ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));

export const persistor = persistStore(store);

export default store;
