import {
	setDate,
	setStartTime,
	setEndTime,
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

export default searchParams;
