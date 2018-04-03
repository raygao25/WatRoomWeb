import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import homepage from './homepage';
import {
	setDate,
	setStartTime,
	setEndTime,
	searchAvailableRooms,
} from '../actions/action';
import { searchValidator } from '../selectors/selector';


/**
 * mapStateToProps
 */
const mapStateToProps = (state) => ({
	isReadyToSearch: searchValidator(state),
});

/**
 * mapDispatchToProps
*/
const mapDispatchToProps = (dispatch) => bindActionCreators({
	setDate,
	setStartTime,
	setEndTime,
	search: searchAvailableRooms.start,
}, dispatch);

const HomePage = connect(
	mapStateToProps,
	mapDispatchToProps
)(homepage);

export default HomePage;

