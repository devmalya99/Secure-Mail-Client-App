

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALYreoXqacVFLxlDfVmjCAVcp21Q-PeGI",
  authDomain: "mailbox-client-app.firebaseapp.com",
  projectId: "mailbox-client-app",
  storageBucket: "mailbox-client-app.appspot.com",
  messagingSenderId: "302533022562",
  appId: "1:302533022562:web:f64070111b67d58214d23b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FirebaseAuthentication = getAuth(app)

export {FirebaseAuthentication};