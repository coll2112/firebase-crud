import firebase from 'firebase'

const config = {
	apiKey: 'AIzaSyBjTL9Uxb7QXrEq5RlLHb-1yUrVGC2RH70',
	authDomain: 'fir-crud-f2e0a.firebaseapp.com',
	databaseURL: 'https://fir-crud-f2e0a.firebaseio.com',
	projectId: 'fir-crud-f2e0a',
	storageBucket: 'fir-crud-f2e0a.appspot.com',
	messagingSenderId: '586630595982',
	appId: '1:586630595982:web:27a7d44529834a9bd110df',
}

firebase.initializeApp(config)

const database = firebase.database()

export { database, firebase as default }
