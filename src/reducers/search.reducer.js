import { combineReducers } from 'redux';

import {
	setDate,
	setStartTime,
	setEndTime,
	searchAvailableRooms,
} from '../actions/action';


const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Get initial search params
 */
const initialSearchState = () => {
	const today = new Date();
	const todayWeekday = today.getDay();
	return {
		weekday: todayWeekday !== 0 && todayWeekday !== 6 ? weekdays[todayWeekday] : null,
		date: todayWeekday !== 0 && todayWeekday !== 6 ? today : null,
		startTime: null,
		endTime: null,
	};
};

/**
 * Reducer for search parameters
 */
const searchParams = (state = initialSearchState(), action) => {
	const { payload } = action;
	switch (action.type) {
		case setDate.type:
			return {
				...state,
				weekday: weekdays[payload.getDay()],
				date: payload,
			};
		case setStartTime.type:
			return {
				...state,
				startTime: payload,
			};
		case setEndTime.type:
			return {
				...state,
				endTime: payload,
			};
		default:
			return state;
	}
};

/**
 * Reducer for loading state
 */
const loading = (state = { loading: false }, action) => {
	switch (action.type) {
		case searchAvailableRooms.START:
			return {
				...state,
				loading: true,
			};
		case searchAvailableRooms.SUCCESS:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};

/**
 *
 */
const result = (state = {
	availableRooms: {
		DC: {
			latitude: 43.472761,
			longitude: -80.542164,
			name: 'William G. Davis Computer Research Centre',
		},
		MC: {
			latitude: 43.47207511,
			longitude: -80.54394739,
			name: 'Mathematics & Computer Building',
		},
	},
}, action) => {
	const { payload } = action;
	switch (action.type) {
		case searchAvailableRooms.SUCCESS:
			return {
				...state,
				availableRooms: payload,
			};
		default:
			return state;
	}
};

const search = combineReducers({ searchParams, loading, result });

export default search;
