import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './style.css';

const paperStyle = {
	margin: '20px',
	borderRadius: '5px',
};

/**
 * List view component
 */
class ListView extends PureComponent {
	/**
	 * Method to update state when new props come in
	*/
	static getDerivedStateFromProps(nextProps, prevState) {
		const listOpenState = [];
		nextProps.availableRooms.forEach(() => { listOpenState.push(true); });
		return {
			...prevState,
			listOpenState,
		};
	}

	/**
	 * Constructor
	*/
	constructor() {
		super();
		this.state = {
			orderBy: 1,
			toggled: true,
		};
	}

	handleToggleAll = () => {
		const newListOpenState = [...this.state.listOpenState];
		if (this.state.toggled) {
			this.setState({
				toggled: false,
				listOpenState: newListOpenState.map(() => false),
			});
		} else {
			this.setState({
				toggled: true,
				listOpenState: newListOpenState.map(() => true),
			});
		}
	};

	handleToggleList = (index) => {
		const newListOpenState = [...this.state.listOpenState];
		newListOpenState[index] = !newListOpenState[index];
		const isAllOpened = newListOpenState.reduce((acc, cur) => acc && cur, true);
		const isAllClosed = newListOpenState.reduce((acc, cur) => acc && !cur, true);
		if (isAllOpened || isAllClosed) {
			this.setState({
				toggled: isAllOpened ? true : false, // eslint-disable-line
				listOpenState: newListOpenState,
			});
		} else {
			this.setState({ listOpenState: newListOpenState });
		}
	}

	handleOrderByChange = (event, index, value) => {
		this.setState({ orderBy: value });
	};

	/**
	 * Render method
	 */
	render() {
		let { availableRooms } = this.props;
		if (this.state.orderBy === 1) {
			availableRooms = availableRooms.sort((first, second) => second.numberOfRooms - first.numberOfRooms);
		} else if (this.state.orderBy === 3) {
			availableRooms = availableRooms.sort((first, second) => first.code.localeCompare(second.code));
		}
		return (
			<div className="listview-container">
				<Paper className="listview-header">
					<SelectField
						floatingLabelText="Order By"
						value={this.state.orderBy}
						onChange={this.handleOrderByChange}
						style={{ width: 150 }}
					>
						<MenuItem value={1} primaryText="Rooms" />
						<MenuItem value={2} primaryText="Distance" />
						<MenuItem value={3} primaryText="Alphabetically" />
					</SelectField>
					<SelectField
						floatingLabelText="Filters"
						value={1}
						onChange={this.handleChange}
						style={{ width: 150, marginLeft: 30 }}
					>
						<MenuItem value={1} primaryText="Todo" />
					</SelectField>
					<Toggle
						className="listview-toggle"
						toggled={this.state.toggled}
						onToggle={() => this.handleToggleAll()}
						style={{
							display: 'inline-block',
							width: '46px',
							transform: 'translateY(-50%)',
							marginLeft: 123,
						}}
					/>
				</Paper>

				<div className="listview-body">
					<List className="listview-list">
						{availableRooms.map((building, index) => (
							<Paper
								style={paperStyle}
								key={`paper${building.code}`}
							>
								<ListItem
									key={`list${building.code}`}
									primaryText={building.code}
									initiallyOpen
									open={this.state.listOpenState[index]}
									onNestedListToggle={() => this.handleToggleList(index)}
									nestedItems={building.rooms.map((room) => (
										<ListItem
											key={`list${building.code}${room}`}
											primaryText={room}
										/>
									))}
								/>
							</Paper>
						))}
					</List>
				</div>
			</div>);
	}
}

ListView.propTypes = {
	availableRooms: PropTypes.arrayOf(PropTypes.shape()),
};

export default ListView;
