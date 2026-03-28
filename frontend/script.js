const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const orbitRadius = 120;

let angleA = 0;
let angleB = Math.PI;

// debris
let debris = { x: 320, y: 120 };

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

    // Satellite positions
    let satA = {
        x: centerX + orbitRadius * Math.cos(angleA),
        y: centerY + orbitRadius * Math.sin(angleA)
    };

    let satB = {
        x: centerX + orbitRadius * Math.cos(angleB),
        y: centerY + orbitRadius * Math.sin(angleB)
    };

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

    // Debris
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

    // update angles (movement)
    angleA += 0.01;
    angleB += 0.012;

    requestAnimationFrame(drawScene);
}

drawScene();


// BACKEND CONNECTION
document.getElementById("checkBtn").addEventListener("click", async function () {

    document.getElementById("result").innerHTML = `
    <p>⏳ Predicting collision using AI...</p>
    `;

    let satA = {
        x: centerX + orbitRadius * Math.cos(angleA),
        y: centerY + orbitRadius * Math.sin(angleA)
    };

    let satB = {
        x: centerX + orbitRadius * Math.cos(angleB),
        y: centerY + orbitRadius * Math.sin(angleB)
    };

    try {
        let response = await fetch("https://satellite-collision-system.onrender.com/check-collision", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ satA, satB })
        });

        let data = await response.json();

        document.getElementById("result").innerHTML = `
            <h3>Result</h3>
            <p>Collision Risk: ${data.risk}</p>
            <p>${data.prediction}</p>
            <p>Suggested Maneuver: ${data.maneuver}</p>
            <p>Fuel Required: ${data.fuel}</p>
        `;

    } catch (error) {
        document.getElementById("result").innerHTML = `
        <p style="color:red;">⚠ Server waking up... try again</p>
        `;
    }

});