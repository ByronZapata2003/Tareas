import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "parcial-2-ce10c.firebaseapp.com",
  projectId: "parcial-2-ce10c",
  storageBucket: "parcial-2-ce10c.firebasestorage.app",
  messagingSenderId: "108749098228",
  appId: "1:108749098228:web:acca1884fbd63a267662a1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);