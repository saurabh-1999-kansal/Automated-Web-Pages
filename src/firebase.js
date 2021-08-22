import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyATpxVpLNkoBEGw-YAS40Zt2hh4t2BigIE",
  authDomain: "web-designing-app-5a8ae.firebaseapp.com",
  projectId: "web-designing-app-5a8ae",
  storageBucket: "web-designing-app-5a8ae.appspot.com",
  messagingSenderId: "1019101643761",
  appId: "1:1019101643761:web:5c470a8f87ec5b94fcfa50"
})

export const auth = app.auth();
export default app;
