// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALZrNM-jmxPncMRTuvy-RNijgOJEVZKS0",
  authDomain: "cursos-2ece5.firebaseapp.com",
  projectId: "cursos-2ece5",
  storageBucket: "cursos-2ece5.appspot.com",
  messagingSenderId: "811939115484",
  appId: "1:811939115484:web:8ed01c2e7abdb62cf99f19"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseBD = getFirestore( FirebaseApp );