import React, { Component } from 'react';

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
		return (
			<div>
				<h1>
					Result Page
				</h1>
			</div>
		);
	}
}

export default ResultPage;
