const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Collision API
app.post("/check-collision", (req, res) => {

    const { satA, satB } = req.body;

    let risk = "LOW";
    let timeToCollision = null;

    // simulate future steps (AI-like prediction)
    for (let t = 1; t <= 100; t++) {

        let futureAx = satA.x + t * 0.5;
        let futureAy = satA.y + t * 0.5;

        let futureBx = satB.x + t * -0.4;
        let futureBy = satB.y + t * -0.3;

        let dx = futureAx - futureBx;
        let dy = futureAy - futureBy;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 40) {
            risk = "HIGH";
            timeToCollision = t;
            break;
        }
    }

    let result;

    if (risk === "HIGH") {
        result = {
            risk: "HIGH",
            maneuver: "Change orbit slightly",
            fuel: "2.8 kg",
            prediction: `Collision in ~${timeToCollision} sec`
        };
    } else {
        result = {
            risk: "LOW",
            maneuver: "None",
            fuel: "0 kg",
            prediction: "No collision predicted"
        };
    }

    res.json(result);
});