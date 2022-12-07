import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQkLVIMvSKNkEU7StGehIUW_Z3aZHiQY4",
  authDomain: "hosue-marketplace-app-2023.firebaseapp.com",
  projectId: "hosue-marketplace-app-2023",
  storageBucket: "hosue-marketplace-app-2023.appspot.com",
  messagingSenderId: "1034289089450",
  appId: "1:1034289089450:web:4b57e2b962266fac0d79d3",
  measurementId: "G-HMF2SXMM3E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()
