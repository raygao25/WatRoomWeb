import React, { Component } from 'react';
import './homepage.css';


/**
 * Home page
 */
class HomePage extends Component {
	/**
	 * Called before component is mounted
	 */
	componentWillMount() {

	}
	/**
	 * Render method
	 */
	render() {
		return (
			<div className="HomePage">
				<header className="HomePage-header">
					<h1 className="HomePage-title">Welcome to React</h1>
				</header>
				<p className="HomePage-intro">
					To get started, edit <code>src/HomePage.jsx</code> and save to reload.
				</p>
			</div>
		);
	}
}

export default HomePage;
