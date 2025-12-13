// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsNcBrmkVXjt5QpaBBeOWZY0e7FjRxwU0",
  authDomain: "assignment-10-aa945.firebaseapp.com",
  projectId: "assignment-10-aa945",
  storageBucket: "assignment-10-aa945.firebasestorage.app",
  messagingSenderId: "608842020515",
  appId: "1:608842020515:web:a56dcfed2ecdbbde8ab116",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
