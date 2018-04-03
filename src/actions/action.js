import makeActionCreator from 'make-action-creator';

export const setDate = makeActionCreator('SET_DATE');

export const setStartTime = makeActionCreator('SET_START_TIME');

export const setEndTime = makeActionCreator('SET_END_TIME');

export const searchAvailableRooms = makeActionCreator('SEARCH_AVAILABLE_ROOMS');
