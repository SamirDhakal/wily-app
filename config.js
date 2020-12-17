import * as firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCUv2ymULQIUKCL924jdycv4WqtMBmo7nc",
    authDomain: "wily-app-92e67.firebaseapp.com",
    projectId: "wily-app-92e67",
    storageBucket: "wily-app-92e67.appspot.com",
    messagingSenderId: "1059743093800",
    appId: "1:1059743093800:web:90358879b936dd0ce6511d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore()