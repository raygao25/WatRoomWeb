import React from 'react';
import ReactDOM from 'react-dom';
import 'rxjs';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
import RootRouter from './router';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/search.reducer';
import rootEpic from './middleware/root.epics';
import history from './history';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware(rootEpic);


const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(epicMiddleware)),
);


ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<MuiThemeProvider>
				<RootRouter />
			</MuiThemeProvider>
		</Router>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
