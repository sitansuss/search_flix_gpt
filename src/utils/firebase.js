// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCspfS8sl5sLBAQV7rk3HID_AVLcQHuYQY",
  authDomain: "netflix-gpt-912d1.firebaseapp.com",
  projectId: "netflix-gpt-912d1",
  storageBucket: "netflix-gpt-912d1.appspot.com",
  messagingSenderId: "708048313108",
  appId: "1:708048313108:web:8d6dfea23f3914a5618001",
  measurementId: "G-6BTCLS5PPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();