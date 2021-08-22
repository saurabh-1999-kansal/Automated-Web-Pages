import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import firebase from "./firebase";
import 'firebase/firestore';


import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);


// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./components/App"
// import firebase from "firebase/app";

// import 'firebase/firestore';
// this is the firebase config which we get when we make a database for our app
// also firebase is preferred because it is a real time data base so that if the state is changed heavily in future
// then those can be done directly in the database and correspondingly everywhere,where the app in open refreshing takes
// place automatically when we define the listener in are app namely onSnapshot

// var firebaseConfig = {
//   apiKey: "AIzaSyATpxVpLNkoBEGw-YAS40Zt2hh4t2BigIE",
//   authDomain: "web-designing-app-5a8ae.firebaseapp.com",
//   projectId: "web-designing-app-5a8ae",
//   storageBucket: "web-designing-app-5a8ae.appspot.com",
//   messagingSenderId: "1019101643761",
//   appId: "1:1019101643761:web:5c470a8f87ec5b94fcfa50"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
//here we added the app component inside the div with id root
// ReactDOM.render(<App />, document.getElementById("root"));

