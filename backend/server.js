const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// existing API
app.post("/check-collision", (req, res) => {
    const { satA, satB } = req.body;

    let dx = satA.x - satB.x;
    let dy = satA.y - satB.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 50) {
        res.json({
            risk: "HIGH",
            prediction: "Collision soon ⚠",
            maneuver: "Adjust orbit",
            fuel: "2 kg"
        });
    } else {
        res.json({
            risk: "LOW",
            prediction: "No collision",
            maneuver: "None",
            fuel: "0 kg"
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});