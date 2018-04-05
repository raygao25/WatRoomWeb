import { createSelector } from 'reselect';
/* eslint-disable import/prefer-default-export */

/**
 * Get weekday from state
 */
const weekdaySelector = (state) => state.searchParams.weekday;

/**
 * Get start time from state
 */
const startTimeSelector = (state) => state.searchParams.startTime;

/**
 * Get end time from state
 */
const endTimeSelector = (state) => state.searchParams.endTime;

/**
 * Validate if user has entered all required fields
 */
export const searchValidator = createSelector(
	[weekdaySelector, startTimeSelector, endTimeSelector],
	(weekday, startTime, endTime) => {
		if (!weekday || !startTime || !endTime) return false;
		const startTimeHours = startTime.getHours();
		const startTimeMinutes = startTime.getMinutes();
		const endTimeHours = endTime.getHours();
		const endTimeMinutes = endTime.getMinutes();
		if (weekday && startTime && endTime) {
			if (startTimeHours >= 8 && (endTimeHours <= 21 || (endTimeHours === 22 && endTimeMinutes === 0))) {
				if (endTimeHours > startTimeHours) {
					return true;
				} else if (startTimeHours === endTimeHours) {
					if (endTimeMinutes > startTimeMinutes) {
						return true;
					}
				}
			}
		}
		return false;
	}
);

