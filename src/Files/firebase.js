import firebase from "firebase";

const App = firebase.initializeApp({
  apiKey: "AIzaSyAOlr9V_rQqsy9tgCNkm3xh2DVsIIbpZLA",
  authDomain: "blood-donation-project-dev.firebaseapp.com",
  projectId: "blood-donation-project-dev",
  storageBucket: "blood-donation-project-dev.appspot.com",
  messagingSenderId: "612178271691",
  appId: "1:612178271691:web:2ee3d31baca1848f92ea4e",
});

const auth = App.auth();

const db = firebase.firestore();

export { auth, db };
