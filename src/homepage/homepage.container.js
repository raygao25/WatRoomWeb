import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

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
	today: state.searchParams.date,
	startTime: state.searchParams.startTime,
	endTime: state.searchParams.endTime,
	loading: state.loading.loading,
	buildingList: state.searchParams.buildingList,
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

const HomePage = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(homepage));

export default HomePage;

