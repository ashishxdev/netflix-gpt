// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeZR3T_qJkTavTSdwzsNksAf-uQEhR1p4",
  authDomain: "netflix-gpt-16633.firebaseapp.com",
  projectId: "netflix-gpt-16633",
  storageBucket: "netflix-gpt-16633.firebasestorage.app",
  messagingSenderId: "155028916789",
  appId: "1:155028916789:web:74ae489ff2371e5ad17f7c",
  measurementId: "G-DGJJM60X32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();