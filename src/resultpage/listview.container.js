import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeOrderBy } from '../actions/action';
import listview from './listview';

/**
 * Method to sort availableRooms
 */
const orderBuildings = (list, orderBy) => {
	switch (orderBy) {
		case 1:
			return list.sort((first, second) => second.numberOfRooms - first.numberOfRooms);
		case 3:
			return list.sort((first, second) => first.code.localeCompare(second.code));
		case 2:
		default:
			return list;
	}
};

/**
 * mapStateToProps
 */
const mapStateToProps = (state) => ({
	availableRooms: orderBuildings(state.result.availableRooms, state.result.orderBy),
	orderBy: state.result.orderBy,
});

/**
 * mapDispatchToProps
*/
const mapDispatchToProps = (dispatch) => bindActionCreators({
	changeOrderBy,
}, dispatch);

const ListView = connect(
	mapStateToProps,
	mapDispatchToProps
)(listview);

export default ListView;
