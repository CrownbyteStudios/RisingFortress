const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gold = 100;
let mana = 50;
document.getElementById('gold').innerText = gold;
document.getElementById('mana').innerText = mana;

// Beispiel: Gebäude zum Platzieren
let building = {x: 100, y: 100, width: 50, height: 50, color: "orange"};
let isDragging = false;

// Touch & Drag Events
canvas.addEventListener('mousedown', (e) => { isDragging = true; building.x = e.offsetX - building.width/2; building.y = e.offsetY - building.height/2; draw(); });
canvas.addEventListener('mousemove', (e) => { if(isDragging){ building.x = e.offsetX - building.width/2; building.y = e.offsetY - building.height/2; draw(); }});
canvas.addEventListener('mouseup', () => { isDragging = false; saveBuilding(); });

canvas.addEventListener('touchstart', (e) => { e.preventDefault(); isDragging = true; building.x = e.touches[0].clientX - building.width/2; building.y = e.touches[0].clientY - building.height/2; draw(); });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if(isDragging){ building.x = e.touches[0].clientX - building.width/2; building.y = e.touches[0].clientY - building.height/2; draw(); }});
canvas.addEventListener('touchend', () => { isDragging = false; saveBuilding(); });

// Zeichnen
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = building.color;
    ctx.fillRect(building.x, building.y, building.width, building.height);
}

// Gebäude speichern in Firebase
async function saveBuilding(){
    if(typeof playerId === "undefined") return;
    try{
        await firebase.firestore().collection('players').doc(playerId).set({
            buildingX: building.x,
            buildingY: building.y,
            gold: gold,
            mana: mana
        });
        console.log("Gebäude gespeichert!");
    } catch(e){
        console.error(e);
    }
}

draw();
