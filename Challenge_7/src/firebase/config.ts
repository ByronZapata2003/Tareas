// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3b5C_Tb2Lffwg-Y9Fmrjsgfrc1j-otIY",
  authDomain: "challenge-07-80b04.firebaseapp.com",
  projectId: "challenge-07-80b04",
  storageBucket: "challenge-07-80b04.firebasestorage.app",
  messagingSenderId: "107908707659",
  appId: "1:107908707659:web:807438428eb1d36414e4ce",
  measurementId: "G-6T2VJZ7ZS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);