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
		if (weekday && startTime && endTime) {
			if (startTime.hours >= 8 && (endTime.hours <= 21 || (endTime.hours === 22 && endTime.minutes === 0))) {
				if (endTime.hours > startTime.hours) {
					return true;
				} else if (startTime.hours === endTime.hours) {
					if (endTime.minutes > startTime.minutes) {
						return true;
					}
				}
			}
		}
		return false;
	}
);

