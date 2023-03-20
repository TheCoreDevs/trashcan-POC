// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsujKiqWMfPL0XK3YeqKBskogE1Eg1qtE",
  authDomain: "trashcan-proof-of-concept.firebaseapp.com",
  projectId: "trashcan-proof-of-concept",
  storageBucket: "trashcan-proof-of-concept.appspot.com",
  messagingSenderId: "419047581669",
  appId: "1:419047581669:web:175d0fef625d19be61710c",
  measurementId: "G-V1X067PP3K",
  databaseURL: "https://trashcan-proof-of-concept.europe-central2.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);