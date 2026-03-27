import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3b5C_Tb2Lffwg-Y9Fmrjsgfrc1j-otIY",
  authDomain: "challenge-07-80b04.firebaseapp.com",
  projectId: "challenge-07-80b04",
  storageBucket: "challenge-07-80b04.firebasestorage.app",
  messagingSenderId: "107908707659",
  appId: "1:107908707659:web:807438428eb1d36414e4ce",
  measurementId: "G-6T2VJZ7ZS3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);