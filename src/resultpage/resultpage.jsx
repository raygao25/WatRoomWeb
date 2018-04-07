import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MapView from './mapview';

/** */
class ResultPage extends Component {
	/**
	 * Called before component is mounted
	 */
	componentWillMount() {
		console.log('ResultPage', this.props);
	}

	/** */
	shouldComponentUpdate() {
		console.log('ResultPage update', this.props);
	}

	/** */
	render() {
		const { availableRooms } = this.props;
		return (
			<div>
				<MapView availableRooms={availableRooms} />
			</div>
		);
	}
}

ResultPage.propTypes = {
	availableRooms: PropTypes.shape(),
};

export default ResultPage;
