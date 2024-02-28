import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { setDoc, doc, getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCgW5eYdWAQ9JaESPMOAT3rkWMVUubbNBw",
    authDomain: "ageandgender-5c888.firebaseapp.com",
    projectId: "ageandgender-5c888",
    storageBucket: "ageandgender-5c888.appspot.com",
    messagingSenderId: "910886902173",
    appId: "1:910886902173:web:63a1f8a45e9c3373347774"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);



export { app, auth, db };
