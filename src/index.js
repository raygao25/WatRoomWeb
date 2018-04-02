import React from 'react';
import ReactDOM from 'react-dom';
import 'rxjs';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
import HomePage from './homepage/homepage';
import registerServiceWorker from './registerServiceWorker';
// import rootReducer from '';
// import rootEpic from '';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const epicMiddleware = createEpicMiddleware(rootEpic);

const store = 0;// = createStore(
// 	rootReducer,
// 	composeEnhancers(applyMiddleware(epicMiddleware)),
// );

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			<HomePage />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
