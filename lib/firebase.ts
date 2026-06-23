import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAI, getGenerativeModel, GoogleAIBackend, Schema } from "firebase/ai";

const firebaseConfig = {
  apiKey: "AIzaSyAcrbbEeIp5_IyqeQKNSmdLDpjEs1S0a2w",
  authDomain: "diffy1-45a57.firebaseapp.com",
  projectId: "diffy1-45a57",
  storageBucket: "diffy1-45a57.firebasestorage.app",
  messagingSenderId: "687826952295",
  appId: "1:687826952295:web:c6ea0e2ce620b8116eb4c2"
};

const app = initializeApp(firebaseConfig);
const ai = getAI(app, { backend: new GoogleAIBackend() });

//export firebase services

export const db = getFirestore(app);
export const auth = getAuth(app);
export const model = getGenerativeModel(ai, { 
  model: "gemini-3.5-flash", 
  generationConfig: {
    maxOutputTokens: 1000,
  } 
});