import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA4gjif11-oW2aBgsa7m6XJxUBzo5Xw7RI",
  authDomain: "job-board-file-storage.firebaseapp.com",
  projectId: "job-board-file-storage",
  storageBucket: "job-board-file-storage.appspot.com",
  messagingSenderId: "959288203231",
  appId: "1:959288203231:web:9e382f7acfe03066fb166a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
