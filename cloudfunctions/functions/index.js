const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firestore.
const admin = require('firebase-admin');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')({ origin: true });

admin.initializeApp();
const db = admin.firestore();


/**
 * Hello world function
 */
exports.helloWorld = functions.https.onRequest((request, response) => {
	return response.json({
		msg: 'Hello world!',
	});
});


/**
 * queryAllAvailableRooms function
 */
const app1 = express();

app1.use(cors);

app1.get('', (request, response) => {
	// query parameters
	const { weekday } = request.query;
	const startTime = parseInt(request.query.startTime, 10);
	const length = parseInt(request.query.length, 10);

	// data set to return
	const availableRoomsSet = [];
	/* eslint-disable promise/no-nesting */
	db.collection('classroomData').get()
		.then((res) =>
			Promise.all(res.docs.map((doc) => {
				const building = doc.id;
				const { latitude, longitude, name } = doc.data();

				return db.collection('classroomData').doc(building).collection('rooms').get()
					.then((querySnapShot) => {
						const roomDocs = querySnapShot.docs.map((doc) => doc.data());
						const availableRooms = roomDocs.filter((doc) => {
							const schedule = doc.schedule[weekday];
							for (let i = 0; i < length; ++i) {
								if (!schedule[i + startTime]) {
									return false;
								}
							}
							return true;
						}).map((doc) => doc.roomCode);
						if (availableRooms && availableRooms.length > 0) {
							availableRoomsSet.push({
								code: building,
								rooms: availableRooms,
								numberOfRooms: availableRooms.length,
								latitude,
								longitude,
								name,
							});
						}
						return;
					})
					.catch((err) => console.log(err));
			}))
				.then(() => response.json({
					availableRoomsSet,
				}))
				.catch((err) => console.log(err))
		)
		.catch((err) => console.log(err));
});

exports.queryAllAvailableRooms = functions.https.onRequest((request, response) => {
	if (!request.path) {
		request.url = `/${request.url}`; // prepend '/' to keep query params if any
	}
	return app1(request, response);
});



/**
 * queryAllAvailableRooms function
 */
const app2 = express();

app2.use(cors);
app2.use(bodyParser.json());

app2.get('', (request, response) => {
	// query parameters
	const { weekday } = request.query;
	const startTime = parseInt(request.query.startTime, 10);
	const length = parseInt(request.query.length, 10);
	const queryBuildingList = request.query.buildings;

	// data set to return
	const availableRoomsSet = [];
	Promise.all(queryBuildingList.map((building) => {
		let longitude = 0;
		let latitude = 0;
		let name = '';
		return db.collection('classroomData').doc(building).get()
			.then((res) => {
				const data = res.data();
				longitude = data.longitude;
				latitude = data.latitude;
				name = data.name;
				return;
			})
			.then(() => db.collection('classroomData').doc(building).collection('rooms').get())
			.then((querySnapShot) => {
				const roomDocs = querySnapShot.docs.map((doc) => doc.data());
				const availableRooms = roomDocs.filter((doc) => {
					const schedule = doc.schedule[weekday];
					for (let i = 0; i < length; ++i) {
						if (!schedule[i + startTime]) {
							return false;
						}
					}
					return true;
				}).map((doc) => doc.roomCode);
				if (availableRooms && availableRooms.length > 0) {
					availableRoomsSet.push({
						code: building,
						rooms: availableRooms,
						numberOfRooms: availableRooms.length,
						latitude,
						longitude,
						name,
					});
				}
				return;
			})
			.catch((err) => console.log(err));
	}))
		.then(() => response.json({
			availableRoomsSet,
		}))
		.catch((err) => console.log(err));
});

exports.queryBuildingAvailableRooms = functions.https.onRequest((request, response) => {
	if (!request.path) {
		request.url = `/${request.url}`; // prepend '/' to keep query params if any
	}
	return app2(request, response);
});
