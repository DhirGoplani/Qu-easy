let allQuestions = [];
let quizQuestions = [];
let current = 0;
let score = 0;
let selected = null;
let answered = false;

fetch("his.json")
  .then(res => res.json())
  .then(data => {
    allQuestions = data;
    quizQuestions = getRandom(allQuestions, 10);
    showQuestion();
  });

function getRandom(arr, n){
  let shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function showQuestion(){
  let q = quizQuestions[current];
  selected = null;
  answered = false;

  document.getElementById("qText").innerText =
    `Q${current + 1}. ${q.question}`;

  let optDiv = document.getElementById("options");
  optDiv.innerHTML = "";
  q.options.forEach(opt => {
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "option";
    btn.onclick = () => {
      if (answered) return;
      selected = opt;
      document
        .querySelectorAll(".option")
        .forEach(b => b.classList.remove("selected"));

      btn.classList.add("selected");
    };
    optDiv.appendChild(btn);
  });
}

function restartQuiz(){
  current = 0;
  score = 0;
  selected = null;
  answered = false;
  quizQuestions = getRandom(allQuestions, 10);
  document.getElementById("quizBox").style.display = "block";
  document.getElementById("resultBtns").style.display = "none";
  document.getElementById("result").innerText = "";
  showQuestion();
}


document.getElementById("nextBtn").onclick = () => {
  if(!selected) return alert("Select an option");
  let q = quizQuestions[current];
  let buttons = document.querySelectorAll(".option");
  if(!answered){
    answered = true;
    buttons.forEach(btn => {
      if(btn.innerText === q.answer) {
        btn.classList.add("correct");
      }
      if(btn.innerText === selected && selected !== q.answer) {
        btn.classList.add("wrong");
      }
    });
    if(selected === q.answer)score++;
    return;
  }
  current++;

  if (current >= quizQuestions.length) {
    showResult();
  } else {
    showQuestion();
  }
};

document.getElementById("retryBtn").onclick = () => {
  restartQuiz();
};

document.getElementById("homeBtn").onclick = () => {
  window.location.href = "index.html";
};

function showResult(){
  document.getElementById("quizBox").style.display = "none";
  document.getElementById("result").innerText =
    `Your Score: ${score} / ${quizQuestions.length}`;
  document.getElementById("resultBtns").style.display = "block";
}

