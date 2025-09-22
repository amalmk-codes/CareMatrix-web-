const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/symptoms.json");
let symptomData = {};

try {
    symptomData = JSON.parse(fs.readFileSync(dataPath));
} catch (err) {
    console.error("Error loading symptoms.json:", err.message);
}

router.post("/", (req, res) => {
    const { symptom } = req.body;
    if (!symptom) return res.status(400).json({ error: "Symptom required" });

    const key = symptom.toLowerCase().trim();
    const conditions = symptomData[key] || ["No results found"];
    res.json({ symptom: key, conditions });
});

module.exports = router;
