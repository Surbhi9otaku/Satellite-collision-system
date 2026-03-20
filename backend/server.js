const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Collision API
app.post("/check-collision", (req, res) => {

    const { satA, satB } = req.body;

    let dx = satA.x - satB.x;
    let dy = satA.y - satB.y;

    let distance = Math.sqrt(dx * dx + dy * dy);

    let result;

    if (distance < 50) {
        result = {
            risk: "HIGH",
            maneuver: "Adjust orbit by +5°",
            fuel: "2.3 kg"
        };
    } else {
        result = {
            risk: "LOW",
            maneuver: "None",
            fuel: "0 kg"
        };
    }

    res.json(result);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});