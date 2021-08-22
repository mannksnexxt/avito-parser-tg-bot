const admin = require('firebase-admin');
const dbURL = 'https://mannksnexxt.firebaseio.com/';

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: dbURL
});

const db = admin.database();
module.exports = { db };