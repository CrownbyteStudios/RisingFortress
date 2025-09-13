// Firebase Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxa1YR6Fi23pAwvvcum7DwB5JlkN9HLP8",
  authDomain: "risingfortress-fc404.firebaseapp.com",
  projectId: "risingfortress-fc404",
  storageBucket: "risingfortress-fc404.appspot.com",
  messagingSenderId: "542099544965",
  appId: "1:542099544965:web:a79a9d2cdc20917cf582ec"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Anonymer Login für Spieler
let playerId;
signInAnonymously(auth).then((userCredential) => {
    playerId = userCredential.user.uid;
    console.log("Spieler-ID:", playerId);
});
