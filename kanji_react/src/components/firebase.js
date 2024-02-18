// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtlBH56QNI-JzzmeoxDqda9fxiKFc0Wyg",
  authDomain: "kanji-quiz-mdr.firebaseapp.com",
  databaseURL: "https://kanji-quiz-mdr-default-rtdb.firebaseio.com",
  projectId: "kanji-quiz-mdr",
  storageBucket: "kanji-quiz-mdr.appspot.com",
  messagingSenderId: "805630131366",
  appId: "1:805630131366:web:736d60a7efd581ede60867",
  measurementId: "G-4E2B957NQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { app };
