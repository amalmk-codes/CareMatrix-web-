const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: message }]
        });
        res.json({ reply: response.choices[0].message.content });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
