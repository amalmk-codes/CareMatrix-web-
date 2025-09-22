const express = require("express");
const router = express.Router();

let reminders = [];

router.get("/", (req, res) => {
  res.json(reminders);
});

router.post("/", (req, res) => {
  const { text, time } = req.body;
  reminders.push({ text, time });
  res.json({ status: "Reminder added", reminders });
});

module.exports = router;
