import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ecommerce-site-d770e.firebaseapp.com",
  projectId: "ecommerce-site-d770e",
  storageBucket: "ecommerce-site-d770e.appspot.com",
  messagingSenderId: "109292383893",
  appId: "1:109292383893:web:ee6b9bde983c271a55359c",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


export const db = getFirestore(app);
