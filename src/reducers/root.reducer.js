import { combineReducers } from 'redux';

import searchParams from './search.reducer';

const rootReducer = combineReducers({
	searchParams,
});

export default rootReducer;
