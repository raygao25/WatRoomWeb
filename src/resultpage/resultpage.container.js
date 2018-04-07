import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import resultpage from './resultpage';

/**
 * mapStateToProps
 */
const mapStateToProps = (state) => ({
	availableRooms: state.result.availableRooms,
});

const ResultPage = withRouter(connect(mapStateToProps)(resultpage));

export default ResultPage;
