import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBjb_waGgwnRGVKVpmls7LQHsQbmKJFH88",
  authDomain: "otp-project-11d9b.firebaseapp.com",
  projectId: "otp-project-11d9b",
  storageBucket: "otp-project-11d9b.appspot.com",
  messagingSenderId: "123360870740",
  appId: "1:123360870740:web:d4f31e9a89069acc79c8c1",
  measurementId: "G-W3NRKVM6ZZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
