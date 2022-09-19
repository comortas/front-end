import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import store from './store';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('app');
const Root = createRoot(container);
Root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
