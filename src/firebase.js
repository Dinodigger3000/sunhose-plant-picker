import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAERqrUprW5boxoT5hBzrKsOByw7KsI-gg",
    authDomain: "sunhose-plant-picker.firebaseapp.com",
    projectId: "sunhose-plant-picker",
    storageBucket: "sunhose-plant-picker.appspot.com",
    messagingSenderId: "156783838536",
    appId: "1:156783838536:web:f739ac7149b496e4ac5f7d",
    measurementId: "G-ZP80LHPKWB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const store = getStorage(app);

export { app, db, store };