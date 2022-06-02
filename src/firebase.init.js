// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6aKmqnv25qw-ss4wz223-hG9CsqCivkc",
  authDomain: "f-port-1f622.firebaseapp.com",
  projectId: "f-port-1f622",
  storageBucket: "f-port-1f622.appspot.com",
  messagingSenderId: "808070097744",
  appId: "1:808070097744:web:6987d8602ac91c13e21a55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
