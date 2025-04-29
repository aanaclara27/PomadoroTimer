let intervalId;
let totalSeconds = 1500; // default 25 min
let initialSeconds = 1500;
let isPaused = false;

function updateDisplay() {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  document.getElementById("timer").innerText = `${minutes}:${seconds}`;
}

function startTimer() {
  document.getElementById("start").classList.add("hide");
  clearInterval(intervalId);
  isPaused = false;
  intervalId = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else {
      clearInterval(intervalId);
      alert("Tempo finalizado!");
    }
  }, 1000);
}

function pauseTimer() {
  const pauseBtn = document.getElementById("pause");
  if (!isPaused) {
    clearInterval(intervalId);
    pauseBtn.innerText = "Continue";
    isPaused = true;
  } else {
    startTimer();
    pauseBtn.innerText = "Pause";
  }
}

function resetTimer() {
  document.getElementById("start").classList.remove("hide");
  clearInterval(intervalId);
  totalSeconds = initialSeconds;
  updateDisplay();
  document.getElementById("pause").innerText = "Pause";
  isPaused = false;
}

function switchMode(mode) {
  const selectedElements = document.querySelectorAll(".selected");
  selectedElements.forEach((el) => el.classList.remove("selected"));
  document.getElementById("start").classList.remove("hide");
  document.getElementById(mode).classList.add("selected");
  clearInterval(intervalId);
  isPaused = false;
  document.getElementById("pause").innerText = "Pause";

  if (mode === "pomodoro") {
    initialSeconds = 1500; // 25:00
  } else if (mode === "short-break") {
    initialSeconds = 300; // 5:00
  } else if (mode === "long-break") {
    initialSeconds = 600; // 10:00
  }

  totalSeconds = initialSeconds;
  updateDisplay();
}