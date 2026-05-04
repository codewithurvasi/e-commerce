// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

// Your Firebase configuration from your database logs
const firebaseConfig = {
  apiKey: "AIzaSyBaDc4g8CUp-uA46MnQBzRjaBz4nxFh64I",
  authDomain: "petro-shop-afdec.firebaseapp.com",
  projectId: "petro-shop-afdec",
  storageBucket: "petro-shop-afdec.appspot.com",
  messagingSenderId: "959472656894",
  appId: "1:959472656894:web:d21f5cb2ec38afc311e0af",
  measurementId: "G-XPJ88JR26G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Setup reCAPTCHA (Invisible) helper
let recaptchaVerifier;
export const setupRecaptcha = () => {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container", // This must match the ID in your Register.jsx
      {
        size: "invisible",
        callback: () => console.log("reCAPTCHA verified"),
      },
      auth
    );
  }
  return recaptchaVerifier;
};

export { auth };
export default app;