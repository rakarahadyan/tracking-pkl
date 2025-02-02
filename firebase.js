// Import Firebase SDK
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBSOc-AA6tl25hgxBGp6XtdZ5KdLxmyzk",
  authDomain: "apps-tracking-b7738.firebaseapp.com",
  databaseURL: "https://apps-tracking-b7738-default-rtdb.firebaseio.com",
  projectId: "apps-tracking-b7738",
  storageBucket: "apps-tracking-b7738.firebasestorage.app",
  messagingSenderId: "842919304800",
  appId: "1:842919304800:web:7f858161e862e11f286d05",
  measurementId: "G-FC09XQ6539",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Firebase Auth with persistence (using AsyncStorage)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firebase Analytics (conditionally)
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  } else {
    console.warn("Firebase Analytics is not supported in this environment.");
  }
});

// Export Firebase services for use in the app
export { app, auth, db, storage, analytics };
