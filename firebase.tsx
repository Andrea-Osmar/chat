import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAMEghnd-3YtUJDoypKBWW_sFcgCeXDYxw',
	authDomain: 'chat-f7da7.firebaseapp.com',
	projectId: 'chat-f7da7',
	storageBucket: 'chat-f7da7.appspot.com',
	messagingSenderId: '356612583321',
	appId: '1:356612583321:web:7475d0632c06046add2d08',
};

let app;

if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

export const db = app.firestore();
export const auth = firebase.auth();
