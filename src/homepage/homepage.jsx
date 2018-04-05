import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

import './homepage.css';


/**
 * Home page
 */
class HomePage extends Component {
	/**
	 * Called before component is mounted
	 */
	componentWillMount() {
		console.log(this.props);
	}

	/**
	 * Method to handle date change
	 */
	handleDateChange = (unused, date) => {
		this.props.setDate(date);
	}

	/**
	 * Method to handle start time change
	 */
	handleStartTimeChange = (event, date) => {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		this.props.setStartTime({ hours, minutes });
	}

	/**
	 * Method to handle end time change
	 */
	handleEndTimeChange = (event, date) => {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		this.props.setEndTime({ hours, minutes });
	}

	/**
	 * Render method
	 */
	render() {
		return (
			<div className="HomePage">
				<DatePicker
					hintText="Date"
					autoOk
					defaultDate={this.props.today}
					style={{ textAlign: 'center' }}
					shouldDisableDate={(date) => date.getDay() === 0 || date.getDay() === 6} // Disable weekends
					onChange={this.handleDateChange}
				/>
				<div className="TimePicker">
					<TimePicker
						hintText="Start time"
						autoOk
						format="24hr"
						minutesStep={10}
						onChange={this.handleStartTimeChange}
						style={{
							display: 'inline-block',
						}}
					/>
					<FontIcon className="material-icons" style={{ paddingLeft: 30, paddingRight: 30 }}>arrow_forward</FontIcon>
					<TimePicker
						hintText="End time"
						autoOk
						format="24hr"
						minutesStep={10}
						onChange={this.handleEndTimeChange}
						style={{
							display: 'inline-block',
						}}
					/>
				</div>
				<RaisedButton
					label="Search"
					primary
					onClick={() => this.props.search()}
					disabled={!this.props.isReadyToSearch}
					style={{
						width: 200,
						marginTop: 30,
					}}
				/>
			</div>
		);
	}
}

HomePage.propTypes = {
	isReadyToSearch: PropTypes.bool,
	setDate: PropTypes.func,
	setStartTime: PropTypes.func,
	setEndTime: PropTypes.func,
	search: PropTypes.func,
};

export default HomePage;
