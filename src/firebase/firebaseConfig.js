import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAv1k6uX8EyReVp-JRRYsc6C22IRaeAblY",
    authDomain: "gallery-db160.firebaseapp.com",
    projectId: "gallery-db160",
    storageBucket: "gallery-db160.appspot.com",
    messagingSenderId: "647531558932",
    appId: "1:647531558932:web:6c83bed95740d033a60f01"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const  projectStorage = firebase.storage();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  

export {db, timestamp, projectStorage, }