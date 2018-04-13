import React, { Component } from 'react';

import MapView from './mapview.container';
import ListView from './listview.container';
import './style.css';

/** */
class ResultPage extends Component {
	/**
	 * Called before component is mounted
	 */
	componentWillMount() {
	}

	/** */
	render() {
		return (
			<div>
				<div className="mapview">
					<MapView />
				</div>
				<div className="listview">
					<ListView className="listview" />
				</div>
			</div>
		);
	}
}

export default ResultPage;
