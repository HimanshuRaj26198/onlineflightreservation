// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfKQM7csGyUXUQvoQmYbIivG_CStl8FTo",
    authDomain: "online-ticket-reservatio-1c3a2.firebaseapp.com",
    projectId: "online-ticket-reservatio-1c3a2",
    storageBucket: "online-ticket-reservatio-1c3a2.appspot.com",
    messagingSenderId: "558105195216",
    appId: "1:558105195216:web:f92f41561e686703a824d5",
    measurementId: "G-TGRBWP1Z2Q"
};

// Initialize Firebase
let app;
let auth;
let fireStore;
let googleAuth;
if (typeof window !== 'undefined') {
    // Initialize Firebase only if it hasn't been initialized yet
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }

    auth = getAuth(app);
    fireStore = getFirestore(app);
    googleAuth = new GoogleAuthProvider();
}



export { app, auth, fireStore, googleAuth };
