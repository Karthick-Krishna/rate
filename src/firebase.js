import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu4Ei2rzDsTQ2hgN0v1-sGPFxyAxsqIyo",
  authDomain: "ratings-c04ff.firebaseapp.com",
  projectId: "ratings-c04ff",
  storageBucket: "ratings-c04ff.firebasestorage.app",
  messagingSenderId: "244188688549",
  appId: "1:244188688549:web:8848e226fa7a8528ba9d4c",
  measurementId: "G-8YELXK13LN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };
