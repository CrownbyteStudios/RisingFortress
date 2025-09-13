import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "DEIN_API_KEY",
  authDomain: "DEIN_AUTH_DOMAIN",
  projectId: "DEIN_PROJECT_ID",
  storageBucket: "DEIN_BUCKET",
  messagingSenderId: "DEIN_SENDER_ID",
  appId: "DEIN_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export let playerId;
export let playerData = {};

// Spieler anonym anmelden
signInAnonymously(auth).then(async (userCredential) => {
    playerId = userCredential.user.uid;
    console.log("Spieler-ID:", playerId);

    const ref = doc(db, "players", playerId);
    const snap = await getDoc(ref);

    if (snap.exists()) {
        playerData = snap.data();
        document.getElementById("playerName").innerText = playerData.name;
        document.getElementById("gold").innerText = playerData.gold;
        document.getElementById("mana").innerText = playerData.mana;
    } else {
        document.getElementById("nameForm").style.display = "flex";
    }
});

// Neuen Spielernamen speichern
export async function saveName() {
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
}

window.saveName = saveName;
