import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9oZdmqeeVZiBA5iZUQphtpfPgDbQgn0E",
  authDomain: "receipt-app-17e36.firebaseapp.com",
  projectId: "receipt-app-17e36",
  storageBucket: "receipt-app-17e36.firebasestorage.app",
  messagingSenderId: "480195291362",
  appId: "1:480195291362:web:db8fb7963f598cb30296bb",
  measurementId: "G-6MD4EDRK9T",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
