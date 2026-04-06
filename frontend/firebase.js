import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6vf0ARa9hfu3_4eohNZLEVthJ0TmIegQ",
  authDomain: "zero-waste-pantry-c9563.firebaseapp.com",
  projectId: "zero-waste-pantry-c9563",
  storageBucket: "zero-waste-pantry-c9563.firebasestorage.app",
  messagingSenderId: "892006980312",
  appId: "1:892006980312:web:9eb9335577d7bfde85d5ad"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
auth.useDeviceLanguage()