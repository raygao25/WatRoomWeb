import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import FontIcon from 'material-ui/FontIcon';
import Button from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import './homepage.css';


/**
 * Home page
 */
class HomePage extends Component {
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
		this.props.setStartTime(date);
	}

	/**
	 * Method to handle end time change
	 */
	handleEndTimeChange = (event, date) => {
		this.props.setEndTime(date);
	}

	/**
	 * Render method
	 */
	render() {
		const {
			today, startTime, endTime, isReadyToSearch, search, loading,
		} = this.props;
		return (
			<div className="HomePage">
				<DatePicker
					hintText="Date"
					autoOk
					defaultDate={today}
					style={{ textAlign: 'center' }}
					shouldDisableDate={(date) => date.getDay() === 0 || date.getDay() === 6} // Disable weekends
					onChange={this.handleDateChange}
				/>
				<div className="TimePicker">
					<TimePicker
						hintText="Start time"
						autoOk
						defaultTime={startTime}
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
						defaultTime={endTime}
						format="24hr"
						minutesStep={10}
						onChange={this.handleEndTimeChange}
						style={{
							display: 'inline-block',
						}}
					/>
				</div>
				<Button
					label="Search"
					labelPosition="before"
					primary
					onClick={() => search()}
					disabled={!isReadyToSearch || loading}
					disabledBackgroundColor="#80DEEA"
					overlayStyle={{
						paddingLeft: loading ? 34 : 0,
					}}
					style={{
						width: 200,
						marginTop: 30,
					}}
				>
					{loading && <CircularProgress
						size={25}
						color="#E0F7FA"
						style={{
							marginTop: 5,
							marginRight: 10,
							float: 'right',
						}}
					/>}
				</Button>
			</div>
		);
	}
}

HomePage.propTypes = {
	today: PropTypes.shape({
		getHours: PropTypes.func,
		getMinutes: PropTypes.func,
	}),
	startTime: PropTypes.shape({
		getHours: PropTypes.func,
		getMinutes: PropTypes.func,
	}),
	endTime: PropTypes.shape({
		getHours: PropTypes.func,
		getMinutes: PropTypes.func,
	}),
	isReadyToSearch: PropTypes.bool.isRequired,
	setDate: PropTypes.func.isRequired,
	setStartTime: PropTypes.func.isRequired,
	setEndTime: PropTypes.func.isRequired,
	search: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default HomePage;
