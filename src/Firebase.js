import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3nVRmlZcGRaQDMIx0_QmXTQrMSnelZFI",
  authDomain: "whatsapp-mern-4db64.firebaseapp.com",
  databaseURL: "https://whatsapp-mern-4db64.firebaseio.com",
  projectId: "whatsapp-mern-4db64",
  storageBucket: "whatsapp-mern-4db64.appspot.com",
  messagingSenderId: "1035677191868",
  appId: "1:1035677191868:web:bb48283abc9747aeaecab9",
  measurementId: "G-GL1XY91W55"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();

const auth = firebaseApp.auth()

const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider};
export default db;