const studyTopics = [
  {
    title: "Applied Physiology & Pathophysiology",
    items: [
      "Cardiovascular physiology: preload, afterload, contractility, SVR/PVR relationships",
      "Pulmonary gas exchange, V/Q mismatch, shunt physiology, and oxygen transport",
      "Renal perfusion, acid-base regulation, and perioperative electrolyte disturbances",
      "Neuroendocrine stress response and anesthetic implications"
    ]
  },
  {
    title: "Anesthesia Pharmacology",
    items: [
      "IV induction agents: onset, context-sensitive half-time, hemodynamic effects",
      "Volatile anesthetics: MAC, organ effects, uptake/distribution principles",
      "Opioids, adjuncts, NMBA pharmacodynamics/kinetics, and reversal strategy",
      "Vasoactive infusions and emergency drug dosing logic"
    ]
  },
  {
    title: "Airway & Ventilation Mastery",
    items: [
      "Difficult airway prediction, ramping, and rescue oxygenation",
      "RSI sequencing, aspiration risk mitigation, and extubation criteria",
      "Ventilator modes, pressure-volume loops, and lung-protective principles",
      "Capnography and advanced troubleshooting in dynamic deterioration"
    ]
  },
  {
    title: "Regional, Obstetric, Pediatric, and Geriatric Considerations",
    items: [
      "Neuraxial/local anesthetics and LAST recognition + treatment",
      "Maternal physiology, uteroplacental perfusion, and obstetric emergencies",
      "Pediatric fluid/airway/anesthetic differences by developmental stage",
      "Frailty, polypharmacy, and emergence risk in older adults"
    ]
  },
  {
    title: "Crisis Resource Management",
    items: [
      "Malignant hyperthermia trigger recognition and dantrolene workflow",
      "Anaphylaxis, bronchospasm, and hypotension differential framework",
      "Hemorrhagic shock, massive transfusion concepts, and point-of-care adaptation",
      "Team communication: closed-loop language + cognitive unloading"
    ]
  },
  {
    title: "Professionalism, Safety, and Exam Readiness",
    items: [
      "ASA basic monitoring standards and alarm strategy",
      "Infection prevention and sterile medication handling",
      "Test-day pacing: rapid stem parsing and elimination heuristics",
      "Structured debriefing and error-reduction reflection"
    ]
  }
];

const flashcards = [
  {
    front: "What drives increased MAC requirements?",
    back: "Youth, hyperthermia, chronic alcohol use, and CNS stimulants can increase MAC."
  },
  {
    front: "First-line treatment for local anesthetic systemic toxicity (LAST)?",
    back: "Immediate airway/oxygenation support, seizure control, and lipid emulsion therapy."
  },
  {
    front: "Classic malignant hyperthermia clues?",
    back: "Rapidly rising ETCO₂, tachycardia, muscle rigidity, hyperthermia (often late), acidosis."
  },
  {
    front: "In hypotension after spinal anesthesia, what often drops first?",
    back: "SVR from sympathetic blockade, followed by reduced venous return and cardiac output."
  },
  {
    front: "Why is capnography essential during sedation?",
    back: "It detects hypoventilation/apnea earlier than pulse oximetry in many patients."
  },
  {
    front: "Primary goal during induction in severe AS?",
    back: "Maintain sinus rhythm, preload, and afterload while avoiding tachycardia/hypotension."
  }
];

const quizBank = [
  {
    topic: "Physiology",
    stem: "A mechanically ventilated patient has increasing peak pressures but stable plateau pressures. Most likely cause?",
    options: ["Decreased lung compliance", "Increased airway resistance", "Tension pneumothorax", "Mainstem intubation"],
    answer: 1,
    rationale: "Rising peak with unchanged plateau suggests increased resistance (e.g., bronchospasm, kinked tube)."
  },
  {
    topic: "Pharmacology",
    stem: "Which induction drug is most associated with adrenal suppression after single bolus use?",
    options: ["Propofol", "Etomidate", "Ketamine", "Midazolam"],
    answer: 1,
    rationale: "Etomidate inhibits 11β-hydroxylase and can transiently suppress cortisol synthesis."
  },
  {
    topic: "Airway",
    stem: "During rapid desaturation in failed laryngoscopy, the immediate priority is:",
    options: ["Repeat laryngoscopy immediately", "Place arterial line", "Re-establish oxygenation", "Administer opioid bolus"],
    answer: 2,
    rationale: "Any difficult-airway algorithm prioritizes oxygenation over intubation attempts."
  },
  {
    topic: "Obstetric",
    stem: "Maternal hypotension after neuraxial block most threatens fetal status via:",
    options: ["Increased uterine tone", "Reduced uteroplacental perfusion", "Increased fetal oxygen extraction", "Maternal hypercarbia"],
    answer: 1,
    rationale: "Reduced maternal blood pressure can reduce placental blood flow and fetal oxygen delivery."
  },
  {
    topic: "Crisis",
    stem: "Best immediate action when malignant hyperthermia is suspected?",
    options: ["Give epinephrine first", "Stop triggering agents and call for MH cart", "Increase volatile agent", "Wait for CK result"],
    answer: 1,
    rationale: "Stop triggers, hyperventilate with 100% O₂, summon help, and begin dantrolene protocol."
  }
];

const protocols = {
  "Malignant Hyperthermia": [
    "Discontinue volatile anesthetics and succinylcholine immediately.",
    "Call for help + MH cart; assign team roles with closed-loop communication.",
    "Hyperventilate with 100% oxygen at high fresh gas flows.",
    "Administer dantrolene and repeat per response/protocol.",
    "Treat hyperkalemia, acidosis, and dysrhythmias; begin active cooling if needed.",
    "Monitor ETCO₂, core temp, electrolytes, blood gases, urine output, and transfer to ICU."
  ],
  "Perioperative Anaphylaxis": [
    "Stop suspected trigger and call for immediate assistance.",
    "Secure airway and deliver 100% oxygen.",
    "Administer epinephrine titrated to severity; start aggressive fluid resuscitation.",
    "Add adjuncts (antihistamine, bronchodilator, corticosteroid) after stabilization.",
    "Trend hemodynamics and prepare for prolonged observation/post-event workup."
  ],
  "Cannot Intubate / Cannot Oxygenate": [
    "Declare CICO event; summon difficult-airway backup now.",
    "Attempt immediate oxygenation with best available rescue (supraglottic, two-person mask).",
    "If oxygenation fails, proceed to emergency front-of-neck access per institutional algorithm.",
    "Confirm oxygenation/ventilation and secure definitive airway plan.",
    "Debrief and document sequence with timeline and team actions."
  ]
};

const topicContainer = document.getElementById("topics-container");
const flashcardGrid = document.getElementById("flashcard-grid");
const quizContainer = document.getElementById("quiz-container");
const protocolSelect = document.getElementById("protocol-select");
const protocolSteps = document.getElementById("protocol-steps");

const metrics = {
  total: 0,
  correct: 0,
  masteredTopics: new Set(),
  streak: Number(localStorage.getItem("crnaStreak") || 0),
  weakTopics: JSON.parse(localStorage.getItem("crnaWeakTopics") || "{}")
};

function renderTopics() {
  studyTopics.forEach((topic) => {
    const card = document.createElement("article");
    card.className = "topic";
    card.innerHTML = `
      <h3>${topic.title}</h3>
      <ul>${topic.items.map((item) => `<li>${item}</li>`).join("")}</ul>
    `;
    topicContainer.append(card);
  });
}

function renderFlashcards() {
  flashcards.forEach((deck) => {
    const button = document.createElement("button");
    button.className = "flashcard";
    button.textContent = deck.front;
    button.setAttribute("aria-label", "Flashcard toggle");

    button.addEventListener("click", () => {
      const reveal = button.classList.toggle("revealed");
      button.textContent = reveal ? deck.back : deck.front;
    });

    flashcardGrid.append(button);
  });
}

function renderProtocolOptions() {
  Object.keys(protocols).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    protocolSelect.append(option);
  });
  loadProtocol();
}

function loadProtocol() {
  const selected = protocolSelect.value;
  protocolSteps.innerHTML = "";
  protocols[selected].forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    protocolSteps.append(li);
  });
}

function updateDashboard() {
  const accuracy = metrics.total ? Math.round((metrics.correct / metrics.total) * 100) : 0;
  document.getElementById("metric-total").textContent = metrics.total;
  document.getElementById("metric-accuracy").textContent = `${accuracy}%`;
  document.getElementById("metric-mastered").textContent = metrics.masteredTopics.size;
  document.getElementById("metric-streak").textContent = `${metrics.streak} days`;
}

function getAdaptiveQuestions() {
  const weakTopicList = Object.entries(metrics.weakTopics)
    .sort((a, b) => b[1] - a[1])
    .map(([topic]) => topic);

  const prioritized = [...quizBank].sort((a, b) => {
    const aWeak = weakTopicList.indexOf(a.topic);
    const bWeak = weakTopicList.indexOf(b.topic);
    return (aWeak === -1 ? 99 : aWeak) - (bWeak === -1 ? 99 : bWeak);
  });

  return prioritized.slice(0, 5);
}

function startQuiz() {
  const questions = getAdaptiveQuestions();
  let idx = 0;

  function renderQuestion() {
    const q = questions[idx];
    if (!q) {
      metrics.streak += 1;
      localStorage.setItem("crnaStreak", String(metrics.streak));
      localStorage.setItem("crnaWeakTopics", JSON.stringify(metrics.weakTopics));
      updateDashboard();
      quizContainer.innerHTML = `
        <h3>Session complete 🎯</h3>
        <p>Great work. Re-run quiz to keep momentum and reinforce weak domains.</p>
      `;
      return;
    }

    quizContainer.innerHTML = `
      <div class="quiz-question">
        <h3>Question ${idx + 1} of ${questions.length} · ${q.topic}</h3>
        <p>${q.stem}</p>
        <div class="quiz-options">
          ${q.options.map((option, index) => `<button data-choice="${index}">${option}</button>`).join("")}
        </div>
        <p class="status" id="status"></p>
      </div>
    `;

    [...quizContainer.querySelectorAll("[data-choice]")].forEach((button) => {
      button.addEventListener("click", () => {
        const chosen = Number(button.dataset.choice);
        const isCorrect = chosen === q.answer;
        metrics.total += 1;
        if (isCorrect) {
          metrics.correct += 1;
          metrics.masteredTopics.add(q.topic);
          metrics.weakTopics[q.topic] = Math.max((metrics.weakTopics[q.topic] || 0) - 1, 0);
        } else {
          metrics.weakTopics[q.topic] = (metrics.weakTopics[q.topic] || 0) + 1;
        }

        const status = document.getElementById("status");
        status.className = `status ${isCorrect ? "good" : "bad"}`;
        status.textContent = `${isCorrect ? "Correct" : "Incorrect"}. ${q.rationale}`;
        updateDashboard();

        setTimeout(() => {
          idx += 1;
          renderQuestion();
        }, 850);
      });
    });
  }

  renderQuestion();
}

function reviewWeakAreas() {
  const sorted = Object.entries(metrics.weakTopics)
    .filter(([, misses]) => misses > 0)
    .sort((a, b) => b[1] - a[1]);

  if (!sorted.length) {
    quizContainer.innerHTML = "<p class='helper-text'>No weak areas detected yet. Keep quizzing to personalize your plan.</p>";
    return;
  }

  quizContainer.innerHTML = `
    <h3>Weak Area Focus Plan</h3>
    <ul>
      ${sorted
        .map(([topic, misses]) => `<li><strong>${topic}</strong>: ${misses} recent misses · schedule targeted review block.</li>`)
        .join("")}
    </ul>
  `;
}

document.getElementById("start-quiz").addEventListener("click", startQuiz);
document.getElementById("review-weak-areas").addEventListener("click", reviewWeakAreas);
document.getElementById("load-protocol").addEventListener("click", loadProtocol);

renderTopics();
renderFlashcards();
renderProtocolOptions();
updateDashboard();
