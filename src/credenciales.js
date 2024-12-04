// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-7rvwdacBumKvvkYivb22VR38Fp8Voqs",
  authDomain: "login-students-e11aa.firebaseapp.com",
  projectId: "login-students-e11aa",
  storageBucket: "login-students-e11aa.firebasestorage.app",
  messagingSenderId: "642222566977",
  appId: "1:642222566977:web:e35e9ce2d8a567e1c420c0"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;