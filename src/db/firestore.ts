// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPLYRnR5G5EwMf5GjnZQIVPkPaGokrN7Q",
  authDomain: "expense-app-b75d5.firebaseapp.com",
  projectId: "expense-app-b75d5",
  storageBucket: "expense-app-b75d5.appspot.com",
  messagingSenderId: "178287849019",
  appId: "1:178287849019:web:f1f02b3b1417b7f92a361e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
