/**
 * Script to update classroom schedule for every term
 */
const fs = require('fs');
require('es6-promise').polyfill();
require('isomorphic-fetch');
const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');


const apiKey = '1d3601c707009302a62ff0a71f250867';

const getCurrentTerm = () => {
	const date = new Date();
	const year = date.getFullYear().toString().substring(2);
	const month = date.getMonth() + 1;
	const termStartingMonth = month >= 9 ? 9 : (month >= 5 ? 5 : 1);
	return `1${  year  }${termStartingMonth.toString()}`;
};

const currentTerm = getCurrentTerm();
console.log('currentTerm', currentTerm);


const classroomList = fs.readFileSync('classroomList.json');
const classroomListObj = JSON.parse(classroomList);


firebase.initializeApp({
	apiKey: 'AIzaSyAe0tfbWgCRhTgY5ffByTHr4xDzBb4K9W8',
	authDomain: 'classroom-finder-245e0.firebaseapp.com',
	projectId: 'classroom-finder-245e0',
});

const db = firebase.firestore();

const updateRoomSchedule = (courses, building, room) => {
	db.collection('classroomData').doc(building).collection('rooms').doc(room)
.get()
		.then((res) => {
			const weeklySchedule = res.data().schedule;
			courses.forEach((course) => {
				const startTime = course.start_time;
				const endTime = course.end_time;
				const weekdays = course.weekdays;
				const startIndex = (startTime.substring(0, 2) - 8) * 6 + startTime.substring(3) / 10;
				const classLength = (endTime.substring(0, 2) - startTime.substring(0, 2)) * 6 + (endTime.substring(3) - startTime.substring(3)) / 10;
				const strlen = weekdays.length;
				for (let i = 0; i < strlen; ++i) {
					let day = 'Monday';
					if (weekdays[i] === 'W') {
						day = 'Wednesday';
					} else if (weekdays[i] === 'F') {
						day = 'Friday';
					} else if (weekdays[i] === 'T') {
						if (i < strlen - 1 && weekdays[i + 1] === 'h') {
							day = 'Thursday';
						} else {
							day = 'Tuesday';
						}
					}
					for (let index = 0; index < classLength; index++) {
						weeklySchedule[day][startIndex + index] = false;
					}
				}
			});
			db.collection('classroomData').doc(building).collection('rooms').doc(room)
.update({
				schedule: weeklySchedule,
			});
		})
		.catch((err) => console.log('Firestore get room data failed', err));
};

Object.keys(classroomListObj).forEach((building) => {
	const classrooms = classroomListObj[building];
	classrooms.forEach((room) => {
		fetch(`http://api.uwaterloo.ca/v2/buildings/${building}/${room}/courses.json?key=${apiKey}`)
			.then((res) => res.json())
			.then((res) => {
				const courses = res.data;
				updateRoomSchedule(courses, building, room);
			});
	});
});

