console.log("JS CONNECTED");
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>GAI Learning Assistant</title>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Tajawal&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/panzoom@9.4.0/dist/panzoom.min.js"></script>
<script>
mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  themeVariables: {
    primaryColor: "#4facfe",
    primaryTextColor: "#ffffff",
    primaryBorderColor: "#4facfe",
    lineColor: "#333",
    secondaryColor: "#00c6ff",
    tertiaryColor: "#f0f4ff",
    fontFamily: "Segoe UI"
  }
});
</script>
<style>
* { box-sizing: border-box; }

body {
  font-family: 'Cairo', 'Tajawal', 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #e3f2fd, #fce4ec);
  padding: 40px 20px;
  min-height: 100vh;
}

.container {
  max-width: 780px;
  margin: auto;
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0,0,0,0.1);
}

.card {
  background: #f9fbff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e8edf5;
  margin-bottom: 20px;
}

h1.title {
  text-align: center;
  margin: 50px 0 25px;
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(to right, #4facfe, #00f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
}

h3 { margin-bottom: 10px; color: #333; }

input[type="text"],
input[type="file"],
input:not([type]),
select {
  width: 100%;
  padding: 10px 12px;
  margin-top: 10px;
  border: 1px solid #dde3ef;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  background: white;
  outline: none;
  transition: border 0.2s;
}

input:focus, select:focus {
  border-color: #4facfe;
}

button {
  margin-top: 14px;
  padding: 12px;
  width: 100%;
  background: linear-gradient(to right, #4facfe, #00c6ff);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  font-weight: 600;
  transition: opacity 0.2s, transform 0.1s;
}

button:hover { opacity: 0.9; }
button:active { transform: scale(0.98); }

/* Language dropdown */
.lang-dropdown {
  position: absolute;
  top: 10px;
  left: 15px;
  width: 110px;
  padding: 8px 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #dde3ef;
  background: white;
}

/* Progress */
.progress-bar {
  width: 100%;
  height: 12px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
}

#progress-fill {
  height: 100%;
  width: 33%;
  background: #ef5350;
  border-radius: 10px;
  transition: width 0.6s ease, background 0.4s ease;
}

/* Quiz */
.quiz-question {
  margin-bottom: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 10px;
  border: 1px solid #eee;
}

.choice {
  display: block;
  padding: 10px 14px;
  margin-bottom: 8px;
  background: white;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: background 0.15s;
}

.choice:hover { background: #e3f2fd; }
.correct { background: #c8e6c9 !important; border-color: #81c784 !important; }
.wrong   { background: #ffcdd2 !important; border-color: #e57373 !important; }

/* Result */
.result-box {
  text-align: center;
  padding: 25px;
  background: #e8f5e9;
  border-radius: 14px;
  margin-bottom: 20px;
  animation: fadeIn 0.5s ease-in-out;
}

.feedback {
  margin-top: 15px;
  padding: 15px;
  border-radius: 8px;
  background: #fff3cd;
}

/* Diagram */
.diagram-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  animation: fadeIn 0.4s ease-in-out;
}

.diagram-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
}

.diagram-header h3 { margin: 0; font-size: 18px; }

.diagram-body {
  background: #f9fbff;
  padding: 20px;
  border-radius: 12px;
  overflow-x: auto;
}

.mermaid {
  display: flex;
  justify-content: center;
}

/* Loader */
.loader {
  border: 4px solid #eee;
  border-top: 4px solid #4facfe;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: auto;
  animation: spin 1s linear infinite;
}

/* Section titles */
.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #4facfe;
  margin: 20px 0 8px;
  border-left: 4px solid #4facfe;
  padding-left: 10px;
}

/* Alert */
.alert-red {
  background: #ffcdd2;
  padding: 12px 15px;
  border-radius: 8px;
  color: #b71c1c;
  font-weight: 600;
  text-align: center;
}

.alert-green {
  background: #c8e6c9;
  padding: 12px 15px;
  border-radius: 8px;
  color: #1b5e20;
  font-weight: 600;
}

#output { margin-top: 20px; }
#diagram-output { margin-top: 20px; }
#pdf-output { margin-top: 20px; }

@keyframes fadeIn {
  from { opacity:0; transform: translateY(10px); }
  to   { opacity:1; transform: translateY(0); }
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}
</style>
</head>

<body>

<div class="container">

  <!-- Language selector -->
  <select id="language" class="lang-dropdown" onchange="handleLanguageChange()">
    <option value="en">🌐 English</option>
    <option value="fr">🇫🇷 Français</option>
    <option value="ar">🇹🇳 العربية</option>
  </select>

  <h1 class="title">🎓 AI-Powered Personalized Learning Assistant</h1>

  <!-- ===== ASK / QUIZ SECTION ===== -->
  <div class="card">
    <div class="section-title">💬 Ask a Question</div>

    <input id="quiz-question" type="text" placeholder="Ask anything... e.g. What is machine learning?" />

    <select id="quiz-level">
      <option value="">🤖 Auto (AI detects level)</option>
      <option value="beginner">🟢 Beginner</option>
      <option value="intermediate">🟡 Intermediate</option>
      <option value="advanced">🔴 Advanced</option>
    </select>

    <select id="quiz-goal">
      <option value="answer">💡 Explanation</option>
      <option value="quiz">📝 Quiz</option>
    </select>

    <button onclick="askQuiz()">🚀 Generate</button>
  </div>

  <div id="output"></div>

  <!-- ===== DIAGRAM SECTION ===== -->
  <div class="card">
    <div class="section-title">📊 Generate Diagram</div>

    <input id="diagram-question" type="text" placeholder="Diagram topic... e.g. Machine learning workflow" />

    <select id="diagramType">
      <option value="auto">🤖 Auto</option>
      <option value="flowchart">Flowchart</option>
      <option value="sequence">Sequence</option>
      <option value="architecture">Architecture</option>
    </select>

    <button onclick="generateDiagram()">📊 Generate Diagram</button>
  </div>

  <div id="diagram-output"></div>

  <!-- ===== PDF SECTION ===== -->
  <div class="card">
    <div class="section-title">📄 Upload Course (PDF)</div>
    <input type="file" id="pdfFile" accept="application/pdf" />
    <button onclick="uploadPDF()">📤 Upload & Analyze</button>
  </div>

  <div id="pdf-output"></div>

  <!-- ===== PROGRESS SECTION ===== -->
  <div class="card">
    <div class="section-title">📈 Your Progress</div>
    <div id="level-text" style="font-weight:600; margin-bottom:6px;">Level: BEGINNER</div>
    <div class="progress-bar">
      <div id="progress-fill"></div>
    </div>
  </div>

</div>

<script>

// ================= RESET PROGRESS =================
function resetProgress() {
  document.getElementById("progress-fill").style.width = "33%";
  document.getElementById("progress-fill").style.background = "#ef5350";
  document.getElementById("level-text").innerText = "Level: BEGINNER";
}

// ================= ASK / QUIZ =================
function askQuiz() {

  // FIX #1 — IDs corrects
  const question = document.getElementById("quiz-question").value.trim();
  const level    = document.getElementById("quiz-level").value;
  const goal     = document.getElementById("quiz-goal").value;
  const language = document.getElementById("language").value || "en";
  const output   = document.getElementById("output");

  if (!question) {
    output.innerHTML = "<div class='alert-red'>⚠️ Please enter a question</div>";
    return;
  }

  // FIX #5 — Reset progress at each new question
  resetProgress();

  output.innerHTML = `
    <div style="text-align:center; padding:30px;">
      <div class="loader"></div>
      <p style="margin-top:15px; font-weight:600;">⏳ Generating...</p>
    </div>
  `;

  fetch("http://127.0.0.1:8000/ask", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ question, level, goal, language })
  })
  .then(res => res.json())
  .then(data => {

    console.log("DATA:", data);

    // ===== QUIZ =====
    if (data.type === "quiz") {

      window.lastResponse = JSON.stringify({ type: "quiz", data: data.questions });
      window.currentLanguage = data.language;

      if (!data.questions || data.questions.length === 0) {
        output.innerHTML = "<div class='alert-red'>⚠️ Quiz generation failed. Try again.</div>";
        return;
      }

      window.currentQuiz = data.questions;

      let html = `<h2 style="margin-bottom:15px;">📝 Quiz <span style="font-size:14px;color:#888;">(${data.level || "auto"})</span></h2>`;

      data.questions.forEach((q, i) => {
        html += `<div class="quiz-question">`;
        html += `<p><b>${i+1}. ${q.question}</b></p>`;
        q.choices.forEach(choice => {
          html += `
            <label class="choice">
              <input type="radio" name="q${i}" value="${choice}" style="margin-right:8px;">
              ${choice}
            </label>`;
        });
        html += `</div>`;
      });

      html += `<button onclick="submitQuiz()">✅ Submit Quiz</button>`;
      output.innerHTML = html;
      return;
    }

    // ===== ANSWER =====
    if (data.type === "answer") {
      window.lastResponse = data.content;

      output.innerHTML = `
        <h2 style="margin-bottom:10px;">💡 Explanation</h2>
        <p style="font-size:13px; color:#888; margin-bottom:10px;">
          Level: ${(data.level || "beginner").toUpperCase()}
        </p>
        <div id="answer-box" style="
          background:#f9f9f9;
          padding:15px;
          border-radius:10px;
          white-space:pre-line;
          line-height:1.8;
          border:1px solid #eee;
        ">${data.content}</div>
      `;
      return;
    }

    output.innerHTML = "<div class='alert-red'>❌ No response from server</div>";
  })
  .catch(err => {
    console.error(err);
    output.innerHTML = "<div class='alert-red'>❌ Error connecting to backend. Is the server running?</div>";
  });
}

// ================= SUBMIT QUIZ =================
function submitQuiz() {

  const answers = [];

  window.currentQuiz.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected) {
      answers.push({ question: q.question, selected: selected.value });
    }
  });

  if (answers.length === 0) {
    document.getElementById("output").innerHTML =
      "<div class='alert-red'>⚠️ Please select at least one answer</div>";
    return;
  }

  fetch("http://127.0.0.1:8000/evaluate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      level: document.getElementById("quiz-level").value,
      answers: answers
    })
  })
  .then(res => res.json())
  .then(data => {

    // ===== UPDATE PROGRESS =====
    let progress = 33, color = "#ef5350";
    if (data.level === "intermediate") { progress = 66; color = "#ffa726"; }
    else if (data.level === "advanced") { progress = 100; color = "#66bb6a"; }

    document.getElementById("progress-fill").style.width  = progress + "%";
    document.getElementById("progress-fill").style.background = color;
    document.getElementById("level-text").innerText =
      "Level: " + (data.level || "beginner").toUpperCase();

    console.log("EVAL RESPONSE:", data);

    let html = `
      <div class="result-box card">
        <h2>📊 Performance</h2>
        <p style="font-size:22px; font-weight:700; margin:10px 0;">
          ${data.score} / ${data.total}
        </p>
        <p style="font-size:18px; color:#555;">${data.percentage}%</p>
        <div style="margin-top:15px;">
          <span style="
            padding:8px 18px; border-radius:20px; color:white; font-weight:700;
            background:${data.level === "advanced" ? "#66bb6a" : data.level === "intermediate" ? "#ffa726" : "#ef5350"};
          ">
            ${(data.level || "beginner").toUpperCase()}
          </span>
        </div>
        <p style="margin-top:12px; font-style:italic; color:#555;">${data.feedback}</p>
      </div>
    `;

    window.currentQuiz.forEach((q, i) => {
      html += `<div class="card quiz-question">`;
      html += `<p><b>${i+1}. ${q.question}</b></p>`;

      const userAnswer = answers.find(a => a.question === q.question);

      q.choices.forEach(choice => {
        let cls = "choice";
        if (choice === q.answer) cls += " correct";
        if (userAnswer && choice === userAnswer.selected && choice !== q.answer) cls += " wrong";
        html += `<div class="${cls}">${choice}</div>`;
      });

      if (userAnswer && userAnswer.selected === q.answer) {
        html += `<p style="color:green; margin-top:8px;">✔ Correct</p>`;
      } else {
        html += `<p style="color:red; margin-top:8px;">❌ Wrong — Correct answer: <b>${q.answer}</b></p>`;
      }

      html += `</div>`;
    });

    document.getElementById("output").innerHTML = html;
  })
  .catch(err => {
    console.error(err);
    document.getElementById("output").innerHTML =
      "<div class='alert-red'>❌ Error displaying results. Please try again.</div>";
  });
}

// ================= LANGUAGE CHANGE =================
function handleLanguageChange() {

  const lang = document.getElementById("language").value;
  if (!window.lastResponse) return;

  let parsed = null;
  try { parsed = JSON.parse(window.lastResponse); } catch {}

  // Quiz translation
  if (parsed && parsed.type === "quiz") {
    fetch("http://127.0.0.1:8000/translate", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ text: JSON.stringify(parsed.data), target_language: lang })
    })
    .then(res => res.json())
    .then(data => {
      const questions = JSON.parse(data.translated);
      let html = `<h2>📝 Quiz</h2>`;
      questions.forEach((q, i) => {
        html += `<div class="quiz-question"><p><b>${i+1}. ${q.question}</b></p>`;
        q.choices.forEach(c => { html += `<label class="choice">${c}</label>`; });
        html += `</div>`;
      });
      document.getElementById("output").innerHTML = html;
    });
    return;
  }

  // Answer translation
  fetch("http://127.0.0.1:8000/translate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ text: window.lastResponse, target_language: lang })
  })
  .then(res => res.json())
  .then(data => {
    const isArabic = lang === "ar" || /[\u0600-\u06FF]/.test(data.translated);
    const box = document.getElementById("answer-box");
    if (box) {
      box.innerHTML = `<div style="direction:${isArabic?"rtl":"ltr"}; text-align:${isArabic?"right":"left"};">
        ${data.translated}
      </div>`;
    }
  });
}

// ================= GENERATE DIAGRAM =================
async function generateDiagram() {

  // FIX #3 — ID correct
  const q      = document.getElementById("diagram-question").value.trim();
  const output = document.getElementById("diagram-output");

  if (!q) {
    output.innerHTML = "<div class='alert-red'>⚠️ Enter a diagram topic first</div>";
    return;
  }

  output.innerHTML = `
    <div style="text-align:center; padding:40px;">
      <div class="loader"></div>
      <p style="margin-top:15px; font-weight:600;">⏳ Generating diagram...</p>
    </div>
  `;

  try {
    const res = await fetch("http://127.0.0.1:8000/generate-diagram", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        prompt: q,
        type: document.getElementById("diagramType").value
      })
    });

    const data = await res.json();

    if (data.error) {
      output.innerHTML = `<div class='alert-red'>${data.error}</div>`;
      return;
    }

    if (!data.diagram) {
      output.innerHTML = "<div class='alert-red'>❌ Diagram generation failed</div>";
      return;
    }

    const clean = data.diagram
      .replace(/```mermaid/g, "")
      .replace(/```/g, "")
      .trim();

    const fixed = clean
      .replace(/\|\>/g, "|")
      .replace(/>\s+/g, " ")
      .replace(/--(?!>)/g, "-->")
      .replace(/([A-Za-z0-9_]+)(👤|💻|⚙️)/g, "$1");

    if (!fixed.includes("flowchart") && !fixed.includes("sequenceDiagram")) {
      output.innerHTML = "<div class='alert-red'>❌ Invalid diagram format. Try again.</div>";
      return;
    }

    console.log("DIAGRAM CODE:\n", fixed);

    output.innerHTML = `
      <div class="diagram-card">
        <div class="diagram-header">
          <h3>📊 ${q}</h3>
        </div>
        <div class="diagram-body">
          <div class="mermaid">${fixed}</div>
        </div>
        <div id="diagram-explanation" style="
          margin-top:15px;
          background:#f9f9f9;
          padding:15px;
          border-radius:10px;
          border:1px solid #eee;
        ">⏳ Generating explanation...</div>
        <div style="text-align:right; margin-top:12px;">
          <button id="downloadBtn" onclick="downloadDiagram()" style="width:auto; padding:8px 16px; font-size:13px;">
            ⬇ Download SVG
          </button>
        </div>
      </div>
    `;

    // Diagram explanation
    fetch("http://127.0.0.1:8000/explain-diagram", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ diagram: clean })
    })
    .then(r => r.json())
    .then(d => {
      const el = document.getElementById("diagram-explanation");
      if (el) el.innerHTML = d.explanation.replace(/\n/g, "<br>");
    });

    // Render mermaid
    setTimeout(() => {
      try {
        mermaid.init(undefined, document.querySelectorAll(".mermaid"));
      } catch (e) {
        console.error("Mermaid error:", e);
        const m = document.querySelector(".mermaid");
        if (m) m.innerHTML = `<div class='alert-red'>⚠️ Invalid diagram. Please try again.</div>`;
      }
    }, 300);

    // Panzoom
    setTimeout(() => {
      const svg = document.querySelector(".mermaid svg");
      if (svg) panzoom(svg, { maxZoom: 5, minZoom: 0.5 });
    }, 600);

  } catch (err) {
    console.error(err);
    output.innerHTML = "<div class='alert-red'>❌ Error connecting to backend</div>";
  }
}

// ================= DOWNLOAD DIAGRAM =================
function downloadDiagram() {
  const svg = document.querySelector(".mermaid svg");
  if (!svg) { alert("Diagram not ready yet"); return; }

  const source = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "diagram.svg";
  a.click();
  URL.revokeObjectURL(url);
}

// ================= PDF UPLOAD =================
async function uploadPDF() {

  const file   = document.getElementById("pdfFile").files[0];
  // FIX #4 — ID correct
  const output = document.getElementById("pdf-output");

  if (!file) {
    output.innerHTML = "<div class='alert-red'>⚠️ Please choose a PDF file first</div>";
    return;
  }

  output.innerHTML = `
    <div style="text-align:center; padding:30px;">
      <div class="loader"></div>
      <p style="margin-top:15px; font-weight:600;">⏳ Analyzing PDF...</p>
    </div>
  `;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res  = await fetch("http://127.0.0.1:8000/upload-pdf", {
      method: "POST",
      body: formData
    });
    const data = await res.json();

    let html = `
      <h3>📘 Summary</h3>
      <div style="background:#f9f9f9; padding:15px; border-radius:10px; white-space:pre-line; line-height:1.8; margin-bottom:20px; border:1px solid #eee;">
        ${data.summary}
      </div>
      <h2>📝 Quiz from PDF</h2>
    `;

    data.quiz.forEach((q, i) => {
      html += `<div class="quiz-question"><p><b>${i+1}. ${q.question}</b></p>`;
      q.choices.forEach(choice => {
        const style = choice === q.answer
          ? "background:#c8e6c9; font-weight:bold; border-color:#81c784;"
          : "";
        html += `<div class="choice" style="${style}">${choice}</div>`;
      });
      html += `</div>`;
    });

    output.innerHTML = html;

  } catch (err) {
    console.error(err);
    output.innerHTML = "<div class='alert-red'>❌ Error uploading PDF. Is the server running?</div>";
  }
}

</script>
</body>
</html>