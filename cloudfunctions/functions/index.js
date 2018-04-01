const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firestore.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
	return response.json({
		msg: 'Hello world!',
	});
});

exports.queryAllAvailableRooms = functions.https.onRequest((request, response) => {
	// query parameters
	const { weekday } = request.query;
	const startTime = parseInt(request.query.startTime, 10);
	const length = parseInt(request.query.length, 10);

	// data set to return
	const availableRoomsSet = {};

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
							availableRoomsSet[building] = {
								rooms: availableRooms,
								latitude,
								longitude,
								name,
							}
						}
						return;
					})
					.catch((err) => res.status(500).send('Internal error', err));
			}))
			.then(() => response.json({
				availableRoomsSet,
			}))
			.catch((err) => res.status(500).send('Internal error', err))
		)
		.catch((err) => res.status(500).send('Internal error', err));
});
