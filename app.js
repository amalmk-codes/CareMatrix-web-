const apiUrl = "http://localhost:5000/api";

// Chatbot
async function sendChat() {
  const message = document.getElementById("chatInput").value;
  const res = await fetch(`${apiUrl}/chatbot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  const data = await res.json();
  document.getElementById("chatBox").innerHTML += `<p><b>You:</b> ${message}</p><p><b>AI:</b> ${data.reply}</p>`;
  document.getElementById("chatInput").value = "";
}

// Symptom Checker
async function checkSymptom() {
  const symptom = document.getElementById("symptomInput").value;
  const res = await fetch(`${apiUrl}/symptoms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symptom }),
  });
  const data = await res.json();
  document.getElementById("symptomResult").innerText = data.conditions.join(", ");
}

// Reminders
async function addReminder() {
  const text = document.getElementById("reminderText").value;
  const time = document.getElementById("reminderTime").value;
  const res = await fetch(`${apiUrl}/reminders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, time }),
  });
  const data = await res.json();
  updateReminders(data.reminders);
  document.getElementById("reminderText").value = "";
}

function updateReminders(reminders) {
  const list = document.getElementById("reminderList");
  list.innerHTML = "";
  reminders.forEach(r => {
    list.innerHTML += `<li>${r.text} at ${r.time}</li>`;
  });
}
