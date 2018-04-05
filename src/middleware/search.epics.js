import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { empty } from 'rxjs/observable/empty';

import * as firebase from 'firebase';
import 'firebase/functions';

import { searchAvailableRooms } from '../actions/action';
import history from '../history';

firebase.initializeApp({
	apiKey: 'AIzaSyAe0tfbWgCRhTgY5ffByTHr4xDzBb4K9W8',
	authDomain: 'classroom-finder-245e0.firebaseapp.com',
	projectId: 'classroom-finder-245e0',
});

const url = 'https://us-central1-classroom-finder-245e0.cloudfunctions.net/queryAllAvailableRooms';


/**
 *
 */
const searchAvailableRoomsEpic = (action$, store) =>
	action$.ofType(searchAvailableRooms.START)
		.mergeMap(() => {
			const { searchParams } = store.getState();
			const { weekday } = searchParams;
			const startTimeIndex = ((searchParams.startTime.getHours() - 8) * 6) + (searchParams.startTime.getMinutes() / 10);
			const length = ((searchParams.endTime.getHours() - searchParams.startTime.getHours()) * 6) +
			((searchParams.endTime.getMinutes() - searchParams.startTime.getMinutes()) / 10);
			return ajax.getJSON(`${url}?weekday=${weekday}&startTime=${startTimeIndex}&length=${length}`)
				.map((result) =>
					searchAvailableRooms.success(result))
				.catch((err) => Observable.of({
					type: 'FETCH_TAGS_FAILED',
					payload: err.xhr.response,
					error: true,
				}));
		});

/**
 * Changes the route
 */
const showResultsEpic = (action$) =>
	action$.ofType(searchAvailableRooms.SUCCESS)
		.mergeMap(() => {
			history.push('/results');
			return empty();
		});


const searchEpic = combineEpics(searchAvailableRoomsEpic, showResultsEpic);

export default searchEpic;
