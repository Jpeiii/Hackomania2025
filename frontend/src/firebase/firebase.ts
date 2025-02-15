import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  browserSessionPersistence,

  // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { Platform } from "react-native"; // Ensure you have this import if using React Native
import * as SecureStore from "expo-secure-store";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQofb-xv9L7mokitEWwB7wWMV41PgTDp4",
  authDomain: "v0-0-beta-nomad.firebaseapp.com",
  projectId: "v0-0-beta-nomad",
  storageBucket: "v0-0-beta-nomad.appspot.com",
  messagingSenderId: "665585627916",
  appId: "1:665585627916:web:1ab04c70ea4d2cce1d0f29",
  measurementId: "G-SXC2DCPKRY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

let auth;
if (Platform.OS !== "web") {
  // Only require and use React Native-specific modules in non-web environments
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(SecureStore),
  });
} else {
  // Fallback to web-compatible persistence strategy
  auth = getAuth(app);
  auth.setPersistence(browserSessionPersistence);
}

export { app, db, storage, auth };
