import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
firebase.initializeApp({
    apiKey: "AIzaSyCGwl5yeW8ywSBFc78Hd74_U7DJYiRnbj8",
    authDomain: "postin-gapp.firebaseapp.com",
    projectId: "postin-gapp",
    storageBucket: "postin-gapp.appspot.com",
    messagingSenderId: "814304736911",
    appId: "1:814304736911:web:76556a3d195ca9a8ec62fa",
    measurementId: "G-RP5E7Q5BRD"
}); 
  // Initialize Firebase
let auth = firebase.auth();
let db = firebase.firestore();
let storage = firebase.storage();
export { firebase, db, storage, auth }