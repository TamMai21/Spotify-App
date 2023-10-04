import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAY24M-OXyPcMcQoZwO4gVFBEWbPla-80c",
    authDomain: "spotify-app-40b7b.firebaseapp.com",
    projectId: "spotify-app-40b7b",
    storageBucket: "spotify-app-40b7b.appspot.com",
    messagingSenderId: "524637728197",
    appId: "1:524637728197:web:bf499e201f33c8035e6fac",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
