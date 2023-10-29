import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD7CMEvNIfwHrzjXYkVAJkZT7jf20zmprk",
    authDomain: "cooking-ninja-site-54241.firebaseapp.com",
    projectId: "cooking-ninja-site-54241",
    storageBucket: "cooking-ninja-site-54241.appspot.com",
    messagingSenderId: "285478257591",
    appId: "1:285478257591:web:04c0176ef4c50b453d9e32",
    measurementId: "G-ZJL91QENMQ"
  };

  //init firebase
  const app = initializeApp(firebaseConfig);

  //init services
  const projectFirestore = getFirestore();

  //init Storage
  const projectStorage = getStorage(app); 

  //time Stamp
  const timestamp = Timestamp;

  const projectAuth = getAuth();

  export { projectFirestore, projectAuth, projectStorage, timestamp };