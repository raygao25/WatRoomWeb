import { connect } from 'react-redux';

import mapview from './mapview';

/**
 * mapStateToProps
 */
const mapStateToProps = (state) => ({
	availableRooms: state.result.availableRooms,
});

const MapView = connect(mapStateToProps)(mapview);

export default MapView;
