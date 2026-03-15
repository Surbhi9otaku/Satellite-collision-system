const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const orbitRadius = 120;

// Satellite positions
let satA = { x: centerX - orbitRadius, y: centerY };
let satB = { x: centerX + orbitRadius, y: centerY };

// Space debris
let debris = { x: 300, y: 120 };

function drawScene() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Earth
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();

    // Orbit
    ctx.beginPath();
    ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Satellite A
    ctx.beginPath();
    ctx.arc(satA.x, satA.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();

    // Satellite B
    ctx.beginPath();
    ctx.arc(satB.x, satB.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    // Space Debris
    ctx.beginPath();
    ctx.arc(debris.x, debris.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    // Labels
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.fillText("Sat-A", satA.x + 10, satA.y);
    ctx.fillText("Sat-B", satB.x + 10, satB.y);
    ctx.fillText("Debris", debris.x + 10, debris.y);
}

drawScene();

// Collision Check
document.getElementById("checkBtn").addEventListener("click", function () {

    let dx = satA.x - debris.x;
    let dy = satA.y - debris.y;

    let distance = Math.sqrt(dx * dx + dy * dy);

    let resultDiv = document.getElementById("result");

    if (distance < 50) {

        resultDiv.innerHTML = `
        <h3>Result</h3>
        <p>⚠ Collision Risk: HIGH</p>
        <p>Suggested Maneuver: Adjust Orbit by +5°</p>
        <p>Fuel Required: 2.3 kg</p>
        `;

    } else {

        resultDiv.innerHTML = `
        <h3>Result</h3>
        <p>✅ Collision Risk: LOW</p>
        <p>Suggested Maneuver: None</p>
        <p>Fuel Required: 0 kg</p>
        `;

    }

});