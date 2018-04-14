import { combineReducers } from 'redux';

import {
	setDate,
	setStartTime,
	setEndTime,
	searchAvailableRooms,
	changeOrderBy,
} from '../actions/action';


const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Get initial search params
 */
const initialSearchState = () => {
	const today = new Date();
	const todayWeekday = today.getDay();
	return {
		weekday: todayWeekday !== 0 && todayWeekday !== 6 ? weekdays[todayWeekday] : undefined,
		date: todayWeekday !== 0 && todayWeekday !== 6 ? today : undefined,
		startTime: undefined,
		endTime: undefined,
		buildingList: ['AHS', 'AL', 'ARC', 'B1', 'B2', 'BMH', 'C2', 'CGR', 'CPH', 'DC', 'DMS', 'DWE', 'E2', 'E3', 'E5', 'E6', 'EC4', 'EC5', 'ECH',
			'EIT', 'ERC', 'ESC', 'EV1', 'EV2', 'EV3', 'HH', 'IHB', 'LIB', 'M3', 'MC', 'ML', 'OPT', 'PAS', 'PHR', 'PHY', 'QNC', 'RCH', 'REN', 'SJ1',
			'SJ2', 'STC'],
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
	availableRooms: [
		{
			code: 'DC',
			latitude: 43.472761,
			longitude: -80.542164,
			name: 'William G. Davis Computer Research Centre',
			numberOfRooms: 3,
			rooms: ['1000', '1003', '2045'],
		},
		{
			code: 'MC',
			latitude: 43.47207511,
			longitude: -80.54394739,
			name: 'Mathematics & Computer Building',
			numberOfRooms: 5,
			rooms: ['1000', '1003', '2045', '4046', '6034'],
		},
		{
			code: 'QNC',
			latitude: 43.4712484,
			longitude: -80.54419245,
			numberOfRooms: 6,
			name: 'Mike & Ophelia Lazaridis Quantum-Nano Centre',
			rooms: ['1000', '1003', '2045', '4046', '5001', '6034'],
		},
	],
	orderBy: 1,
}, action) => {
	const { payload } = action;
	switch (action.type) {
		case searchAvailableRooms.SUCCESS:
			return {
				...state,
				availableRooms: payload,
			};
		case changeOrderBy.type:
			return {
				...state,
				orderBy: payload,
			};
		default:
			return state;
	}
};

const search = combineReducers({ searchParams, loading, result });

export default search;
