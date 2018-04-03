import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import * as firebase from 'firebase';
import 'firebase/functions';

import { searchAvailableRooms } from '../actions/action';

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
			const startTime = ((searchParams.startTime.hours - 8) * 6) + (searchParams.startTime.minutes / 10);
			const length = ((searchParams.endTime.hours - searchParams.startTime.hours) * 6) +
			((searchParams.endTime.minutes - searchParams.startTime.minutes) / 10);
			return ajax.getJSON(`${url}?weekday=${weekday}&startTime=${startTime}&length=${length}`)
				.map((result) =>
					searchAvailableRooms.success(result))
				.catch((err) => Observable.of({
					type: 'FETCH_TAGS_FAILED',
					payload: err.xhr.response,
					error: true,
				}));
		});

export default searchAvailableRoomsEpic;