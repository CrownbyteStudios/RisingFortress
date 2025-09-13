// Firebase importieren (Modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// 🔑 Deine Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCxa1YR6Fi23pAwvvcum7DwB5JlkN9HLP8",
  authDomain: "risingfortress-fc404.firebaseapp.com",
  projectId: "risingfortress-fc404",
  storageBucket: "risingfortress-fc404.appspot.com",
  messagingSenderId: "542099544965",
  appId: "1:542099544965:web:a79a9d2cdc20917cf582ec",
  measurementId: "G-SGDSYFGSGR"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export let playerId;
export let playerData = {};

// Alles erst ausführen, wenn das HTML geladen ist
document.addEventListener("DOMContentLoaded", () => {

  // 🔹 Spieler anonym anmelden
  signInAnonymously(auth).then(async (userCredential) => {
    playerId = userCredential.user.uid;
    console.log("Spieler-ID:", playerId);

    const ref = doc(db, "players", playerId);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      // Spieler existiert → Daten laden
      playerData = snap.data();
      document.getElementById("playerName").innerText = playerData.name;
      document.getElementById("gold").innerText = playerData.gold;
      document.getElementById("mana").innerText = playerData.mana;
    } else {
      // Neuer Spieler → Name-Eingabe anzeigen
      document.getElementById("nameForm").style.display = "flex";
    }
  }).catch((error) => {
    console.error("Fehler bei Auth:", error);
  });

  // 🔹 Name & Startwerte speichern
  window.saveName = async function saveName() {
    const nameInput = document.getElementById("nameInput").value.trim();
    if (nameInput === "") return;

    playerData = {
      name: nameInput,
      gold: 100,
      mana: 50,
      buildings: []
    };

    await setDoc(doc(db, "players", playerId), playerData);

    document.getElementById("nameForm").style.display = "none";
    document.getElementById("playerName").innerText = playerData.name;
    document.getElementById("gold").innerText = playerData.gold;
    document.getElementById("mana").innerText = playerData.mana;

    console.log("Neuer Spieler gespeichert:", playerData);
  }

});
