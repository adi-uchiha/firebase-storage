// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd9WODb93BRssEgfTs09k-d0SSXpB2CNs",
  authDomain: "fir-storage-f6d6e.firebaseapp.com",
  projectId: "fir-storage-f6d6e",
  storageBucket: "fir-storage-f6d6e.appspot.com",
  messagingSenderId: "484420672173",
  appId: "1:484420672173:web:cd0b895b20807607754424",
  measurementId: "G-4WH1E30RKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)