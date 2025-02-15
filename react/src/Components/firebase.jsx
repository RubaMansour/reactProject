// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLaffoyPetwVamXpwOH-69YZhoFzbZ0mk",
  authDomain: "project-react-c78d2.firebaseapp.com",
  projectId: "project-react-c78d2",
  storageBucket: "project-react-c78d2.firebasestorage.app",
  messagingSenderId: "919120133025",
  appId: "1:919120133025:web:f6d8ae22c0ca793947a9e0",
  measurementId: "G-5Q8L4M6GB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;