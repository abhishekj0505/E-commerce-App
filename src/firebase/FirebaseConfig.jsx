// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7NrW0jVLYLSnJCfcQOgZabfj3y5gPTi8",
  authDomain: "myecom-b68f0.firebaseapp.com",
  projectId: "myecom-b68f0",
  storageBucket: "myecom-b68f0.appspot.com",
  messagingSenderId: "458254310631",
  appId: "1:458254310631:web:194df22463fab607105642"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app)

const auth = getAuth(app)

export {auth, fireDB }