import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './homepage/homepage.container';
import ResultPage from './resultpage/resultpage.container';


/**
 * Root router component
 */
const RootRouter = () => (
	<Switch>
		<Route exact path="/" component={HomePage} />
		<Route path="/results" component={ResultPage} />
	</Switch>
);

export default RootRouter;
