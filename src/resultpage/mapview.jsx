import React, { PureComponent } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';

/** */
class InnerMap extends PureComponent {
	/** */
	constructor() {
		super();
		this.state = {
			focus: null,
		};
	}

	/**
	 * Method to handle marker click
	 */
	handleMarkerClick = (building) => {
		this.setState({ focus: building });
	};

	/**
	 * Render method
	 */
	render() {
		const { availableRooms } = this.props;
		return (
			<GoogleMap
				defaultZoom={16}
				defaultCenter={{ lat: 43.47100, lng: -80.54438 }}
			>
				{availableRooms && availableRooms.map((building) => (
					<Marker
						position={{ lat: building.latitude, lng: building.longitude }}
						label={building.code}
						key={`map${building.code}`}
						clickable
						opacity={0.8}
						zIndex={this.state.focus === building.code ? 1 : 0}
						animation="google.maps.Animation.DROP"
						onClick={() => this.handleMarkerClick(building.code)}
					/>
				))}
			</GoogleMap>
		);
	}
}


const Map = compose(
	withProps({
		googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAe0tfbWgCRhTgY5ffByTHr4xDzBb4K9W8&v=3.exp&libraries=geometry,drawing,places',
		loadingElement: <div style={{ height: '100%' }} />,
		containerElement: <div style={{ height: '100%', width: '100%' }} />,
		mapElement: <div style={{ height: '100%' }} />,
	}),
	withScriptjs,
	withGoogleMap
)(InnerMap);

InnerMap.propTypes = {
	availableRooms: PropTypes.arrayOf(PropTypes.shape()),
};

/**
 * Map view component
 */
class MapView extends PureComponent {
	handleMarkerClick = () => {
		null;
	};

	/**
	 * Render method
	 */
	render() {
		const { availableRooms } = this.props;
		return (<Map availableRooms={availableRooms} />);
	}
}

MapView.propTypes = {
	availableRooms: PropTypes.arrayOf(PropTypes.shape()),
};

export default MapView;
