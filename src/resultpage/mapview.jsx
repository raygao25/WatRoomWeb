import React, { PureComponent } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';


const Map = compose(
	withProps({
		googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAe0tfbWgCRhTgY5ffByTHr4xDzBb4K9W8&v=3.exp&libraries=geometry,drawing,places',
		loadingElement: <div style={{ height: '100%' }} />,
		containerElement: <div style={{ height: '737px', marginRight: '500px' }} />,
		mapElement: <div style={{ height: '100%' }} />,
	}),
	withScriptjs,
	withGoogleMap
)((props) =>
	(
		<GoogleMap
			defaultZoom={16}
			defaultCenter={{ lat: 43.47100, lng: -80.54438 }}
		>
			{props.availableRooms && Object.keys(props.availableRooms).map((building) => (
				<Marker
					position={{ lat: props.availableRooms[building].latitude, lng: props.availableRooms[building].longitude }}
					label={building}
					key={building}
					clickable
					opacity={0.8}
					animation="google.maps.Animation.DROP"
					onClick={() => console.log(building)}
				/>
			))}
		</GoogleMap>
	));

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
	availableRooms: PropTypes.shape(),
};

export default MapView;
