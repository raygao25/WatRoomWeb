import React from 'react';
import ReactDOM from 'react-dom';
import 'rxjs';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Router } from 'react-router-dom';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
import RootRouter from './router';
import registerServiceWorker from './registerServiceWorker';
import app from './reducers/root.reducer';
import rootEpic from './middleware/root.epics';

const history = createHistory();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware(rootEpic);

const reactRouterMiddleware = routerMiddleware(history);


const store = createStore(
	combineReducers({
		app,
		routing: routerReducer,
	}),
	composeEnhancers(applyMiddleware(epicMiddleware), applyMiddleware(reactRouterMiddleware)),
);

const syncHistory = syncHistoryWithStore(history, store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={syncHistory}>
			<MuiThemeProvider>
				<RootRouter />
			</MuiThemeProvider>
		</Router>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
