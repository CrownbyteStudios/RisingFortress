import { db, playerId, playerData } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Bilder laden
const grass = new Image(); grass.src = "assets/grass.png";
const base = new Image(); base.src = "assets/base.png";

let building = {x: 200, y: 200, width: 80, height: 80};
let isDragging = false;

// --- Steuerung Maus ---
canvas.addEventListener('mousedown', (e) => { 
  isDragging = true; 
  moveBuilding(e.offsetX, e.offsetY);
});
canvas.addEventListener('mousemove', (e) => { 
  if(isDragging) moveBuilding(e.offsetX, e.offsetY);
});
canvas.addEventListener('mouseup', () => { isDragging = false; saveBuilding(); });

// --- Steuerung Touch ---
canvas.addEventListener('touchstart', (e) => { 
  e.preventDefault(); 
  isDragging = true; 
  moveBuilding(e.touches[0].clientX, e.touches[0].clientY); 
});
canvas.addEventListener('touchmove', (e) => { 
  e.preventDefault(); 
  if(isDragging) moveBuilding(e.touches[0].clientX, e.touches[0].clientY); 
});
canvas.addEventListener('touchend', () => { isDragging = false; saveBuilding(); });

// Gebäude bewegen
function moveBuilding(x, y){
  building.x = x - building.width/2;
  building.y = y - building.height/2;
  draw();
}

// Zeichnen
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(grass, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(base, building.x, building.y, building.width, building.height);
}

function saveBuilding(){
  if(!playerId) return;
  setDoc(doc(db, "players", playerId), {
    ...playerData,
    buildings: [{x: building.x, y: building.y}]
  });
  console.log("Gebäude gespeichert");
}

grass.onload = () => draw();
