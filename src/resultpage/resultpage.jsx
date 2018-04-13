import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MapView from './mapview';
import ListView from './listview';
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
		const { availableRooms } = this.props;
		return (
			<div>
				<div className="mapview">
					<MapView availableRooms={availableRooms} />
				</div>
				<div className="listview">
					<ListView className="listview" availableRooms={availableRooms} />
				</div>
			</div>
		);
	}
}

ResultPage.propTypes = {
	availableRooms: PropTypes.arrayOf(PropTypes.shape()),
};

export default ResultPage;
