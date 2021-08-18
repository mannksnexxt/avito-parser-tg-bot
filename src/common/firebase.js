const admin = require('firebase-admin');

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: 'https://mannksnexxt.firebaseio.com/'
});

const db = admin.database();
module.exports = { db };