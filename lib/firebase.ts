import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // your firebase config here
};

const app = initializeApp(firebaseConfig);

//export firebase services

export const db = getFirestore(app);
export const auth = getAuth(app);