import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger'
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers/reducers.js';
import App from './App';

const store = createStore(reducers, applyMiddleware(promise(), thunk, createLogger()));

ReactDOM.render(
    <Provider store={store}>
		<BrowserRouter>
			<App/>	
        </BrowserRouter>
	</Provider>
	, document.getElementById('root'));

registerServiceWorker();
