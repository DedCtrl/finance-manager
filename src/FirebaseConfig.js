// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmpPCmxg2kpsQs315eHKXd9OOgWcZ9_BM",
  authDomain: "finance-manager-1fe12.firebaseapp.com",
  databaseURL: "https://finance-manager-1fe12-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finance-manager-1fe12",
  storageBucket: "finance-manager-1fe12.firebasestorage.app",
  messagingSenderId: "586413416324",
  appId: "1:586413416324:web:e70c6d5fa84eb480a547d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;