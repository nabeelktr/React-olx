import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

  const firebaseConfig = {
    apiKey: "AIzaSyCsyNEzF--Ic4SL60uKh61e6J9etw3weRs",
    authDomain: "olx-react-eba5b.firebaseapp.com",
    projectId: "olx-react-eba5b",
    storageBucket: "olx-react-eba5b.appspot.com",
    messagingSenderId: "20763258842",
    appId: "1:20763258842:web:4211e0c5887e1d76899ae3",
    measurementId: "G-NTEJ051L5H"
  };

  export default firebase.initializeApp(firebaseConfig);