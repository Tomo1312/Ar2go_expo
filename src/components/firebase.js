import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQp55BOG7ZUhtnG54iCNLShKpCEMRss_A",
  authDomain: "ar2go-bdf06.firebaseapp.com",
  projectId: "ar2go-bdf06",
  storageBucket: "ar2go-bdf06.appspot.com",
  messagingSenderId: "366296500428",
  appId: "1:366296500428:web:fcecec2910150d8a745a69"
};


let app;
if (firebase.apps.length == 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.database();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage};
