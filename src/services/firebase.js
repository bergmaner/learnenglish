import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAawMFtv_5Sr5OZ58BFqDRw16rlsb_WHTQ",
    authDomain: "learnenglish-eb67b.firebaseapp.com",
    databaseURL: "https://learnenglish-eb67b.firebaseio.com",
    projectId: "learnenglish-eb67b",
    storageBucket: "learnenglish-eb67b.appspot.com",
    messagingSenderId: "792888824683",
    appId: "1:792888824683:web:195b4a98d7611af823f22e",
    measurementId: "G-4WGZBSXH8G"
  };

  firebase.initializeApp(firebaseConfig);

  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const ghProvider = new firebase.auth.GithubAuthProvider();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  export const fbAuth = () =>
  {
    return firebase.auth().signInWithPopup(fbProvider);
  }
  export const ghAuth = () =>
  {
    return firebase.auth().signInWithPopup(ghProvider);
  }
  export const googleAuth = () =>
  {
    return firebase.auth().signInWithPopup(googleProvider);
  }
  
  
  export const auth = firebase.auth;
  export const db = firebase.firestore();
  export const storage = firebase.storage();
