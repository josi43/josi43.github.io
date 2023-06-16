import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMII9fY-Xgd1eHCd4UWpa6QSnFD0MgQCs",
  authDomain: "mymovies-4eee0.firebaseapp.com",
  projectId: "mymovies-4eee0",
  storageBucket: "mymovies-4eee0.appspot.com",
  messagingSenderId: "640504177189",
  appId: "1:640504177189:web:2fc885c8c0f8a228db15cc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
