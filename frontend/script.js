const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

let satA = {x:150,y:200};
let satB = {x:350,y:200};

let angleA = 0;
let angleB = Math.PI;

function drawSpace(){

ctx.clearRect(0,0,canvas.width,canvas.height);

// Earth
ctx.beginPath();
ctx.arc(250,200,40,0,Math.PI*2);
ctx.fillStyle="blue";
ctx.fill();

// Orbit
ctx.beginPath();
ctx.arc(250,200,120,0,Math.PI*2);
ctx.strokeStyle="gray";
ctx.stroke();

// Update satellite positions (orbit motion)
satA.x = 250 + 120*Math.cos(angleA);
satA.y = 200 + 120*Math.sin(angleA);

satB.x = 250 + 120*Math.cos(angleB);
satB.y = 200 + 120*Math.sin(angleB);

// Satellite A
ctx.beginPath();
ctx.arc(satA.x,satA.y,8,0,Math.PI*2);
ctx.fillStyle="yellow";
ctx.fill();

// Satellite B
ctx.beginPath();
ctx.arc(satB.x,satB.y,8,0,Math.PI*2);
ctx.fillStyle="red";
ctx.fill();
}

// animation loop
function animate(){

angleA += 0.01;
angleB += 0.008;

drawSpace();

requestAnimationFrame(animate);
}

animate();

document.getElementById("checkBtn").onclick=function(){

let dx = satA.x - satB.x;
let dy = satA.y - satB.y;

let distance = Math.sqrt(dx*dx + dy*dy);

if(distance < 60){

ctx.beginPath();
ctx.moveTo(satA.x,satA.y);
ctx.lineTo(satB.x,satB.y);
ctx.strokeStyle="red";
ctx.stroke();

document.getElementById("result").innerHTML=`
<h3>Result</h3>
<p style="color:red;">⚠ Collision Risk Detected</p>
<p>Suggested Maneuver: Adjust orbit +5 km</p>
<p>Fuel Required: Low</p>
`;

}
else{

document.getElementById("result").innerHTML=`
<h3>Result</h3>
<p style="color:lightgreen;">✔ Satellites are safe</p>
<p>No maneuver required</p>
`;

}

};