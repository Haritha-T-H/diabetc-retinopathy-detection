import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { setDoc, doc, getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBe83048K3vkHYR8eKK0G5f33wrewfSPvg",
    authDomain: "diabetic-retinopathy-ea621.firebaseapp.com",
    projectId: "diabetic-retinopathy-ea621",
    storageBucket: "diabetic-retinopathy-ea621.appspot.com",
    messagingSenderId: "9133973613",
    appId: "1:9133973613:web:0daac7166e9023b03f9f64"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);



export { app, auth, db, storage };
