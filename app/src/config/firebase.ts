import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY as string,
  authDomain: "entertainment-app-e52de.firebaseapp.com",
  projectId: "entertainment-app-e52de",
  storageBucket: "entertainment-app-e52de.appspot.com",
  messagingSenderId: "528897851009",
  appId: "1:528897851009:web:de4f391e1e22ac93859780",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
