// ===== Navigation =====
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}
const API_KEY="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"; // ← Replace your actual key

async function askChatbot() {
  const input = document.getElementById("chatInput").value.trim();
  if (!input) return;

  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML += `<p><b>You:</b> ${input}</p>`;
  document.getElementById("chatInput").value = "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: input }]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    chatBox.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    chatBox.innerHTML += `<p><b>Bot:</b> ❌ Error: ${err.message}</p>`;
  }
}

// ===== Symptom Checker =====
const symptomData = {
  fever: ["Flu","Common Cold","Infection","COVID-19","Malaria","Dengue"],
  headache: ["Migraine","Stress","Dehydration","Tension Headache","Sinus Infection"],
  cough: ["Bronchitis","Asthma","Cold","Pneumonia","COVID-19","Allergies"],
  stomachache: ["Indigestion","Food Poisoning","Gastritis","Ulcer","Appendicitis"],
  fatigue: ["Anemia","Sleep Deprivation","Hypothyroidism","Stress","Diabetes"],
  nausea: ["Food Poisoning","Pregnancy","Gastritis","Migraine","Motion Sickness"],
  dizziness: ["Low Blood Pressure","Dehydration","Vertigo","Inner Ear Infection","Hypoglycemia"],
  soreThroat: ["Common Cold","Strep Throat","Allergies","Flu","Tonsillitis"],
  runnyNose: ["Allergies","Cold","Flu","Sinus Infection","COVID-19"],
  chestPain: ["Heartburn","Angina","Heart Attack","Muscle Strain","Pneumonia"],
  shortnessOfBreath: ["Asthma","COVID-19","Pneumonia","COPD","Heart Disease"],
  diarrhea: ["Food Poisoning","Infection","IBS","Lactose Intolerance","Medication Side Effects"]
};

function checkSymptom() {
  const input = document.getElementById("symptomInput").value.toLowerCase().trim();
  const result = symptomData[input] || ["No conditions found"];
  document.getElementById("symptomResult").innerHTML =
    `<p>Possible conditions: ${result.join(", ")}</p>`;
}

// ===== Reminders =====
function loadReminders() {
  const saved = JSON.parse(localStorage.getItem("reminders")) || [];
  const list = document.getElementById("reminderList");
  list.innerHTML = "";
  saved.forEach((rem, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${rem} <button onclick="deleteReminder(${i})">X</button>`;
    list.appendChild(li);
  });
}

function addReminder() {
  const input = document.getElementById("reminderInput").value.trim();
  if (!input) return;

  const saved = JSON.parse(localStorage.getItem("reminders")) || [];
  saved.push(input);
  localStorage.setItem("reminders", JSON.stringify(saved));

  document.getElementById("reminderInput").value = "";
  loadReminders();
}

function deleteReminder(index) {
  const saved = JSON.parse(localStorage.getItem("reminders")) || [];
  saved.splice(index, 1);
  localStorage.setItem("reminders", JSON.stringify(saved));
  loadReminders();
}

window.onload = loadReminders;


