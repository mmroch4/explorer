// import { SoundControls } from "./sound-controls.js";

let theme = "dark";

const time = 1800; // 30 minutes
let currentTime = time;
let hasStarted = false;
let isPaused = false;
let isMuted = false;
let isFinished = false;

let timer;

const backgroundAudio = new Audio("./assets/bg-audio.mp3");
const buttonPressAudio = new Audio("./assets/button-press.wav");
const finishTimerAudio = new Audio("./assets/kitchen-timer.mp3");

const THEME_TOGGLER = document.body.querySelector("#theme-toggler");
const CONTAINER = document.body.querySelector("main");
const TIMER_DISPLAY = CONTAINER.querySelector("h1");
const PLAY_PAUSE_BUTTON = CONTAINER.querySelector("#play-pause-button");
const STOP_TIMER_BUTTON = CONTAINER.querySelector("#stop-timer-button");
const SOUND_CONTROLS = CONTAINER.querySelector("#sound-controls");

updateTimer();

THEME_TOGGLER.addEventListener("click", toggleTheme);

PLAY_PAUSE_BUTTON.addEventListener("click", () => {
  if (!isMuted && !isFinished) {
    buttonPressAudio.play();
  }

  if (!hasStarted) {
    start();
  } else if (hasStarted && !isPaused && !isFinished) {
    pause();
  } else if (hasStarted && isPaused && !isFinished) {
    play();
  }
});

STOP_TIMER_BUTTON.addEventListener("click", () => {
  if (hasStarted) {
    if (!isMuted) {
      buttonPressAudio.play();
    }

    stop();
  }
});

SOUND_CONTROLS.addEventListener("click", () => {
  if (isMuted) {
    isMuted = false;

    SOUND_CONTROLS.querySelector("#sound-active-icon").classList.remove("hide");
    SOUND_CONTROLS.querySelector("#sound-inactive-icon").classList.add("hide");
  } else {
    isMuted = true;

    SOUND_CONTROLS.querySelector("#sound-active-icon").classList.add("hide");
    SOUND_CONTROLS.querySelector("#sound-inactive-icon").classList.remove(
      "hide"
    );
  }

  if (!isMuted) {
    buttonPressAudio.play();
  }

  if (hasStarted && !isMuted && !isFinished) {
    playSound();
  } else if (hasStarted && isMuted) {
    muteSound();
  }
});

function start() {
  hasStarted = true;

  PLAY_PAUSE_BUTTON.querySelector("#play-button").classList.add("hide");
  PLAY_PAUSE_BUTTON.querySelector("#pause-button").classList.remove("hide");

  STOP_TIMER_BUTTON.querySelector("#timer-button").classList.add("hide");
  STOP_TIMER_BUTTON.querySelector("#stop-button").classList.remove("hide");

  setTimerInterval();

  if (!isMuted) {
    playSound();
  }
}

function stop() {
  hasStarted = false;
  isPaused = false;
  isFinished = false;

  PLAY_PAUSE_BUTTON.querySelector("#play-button").classList.remove("hide");
  PLAY_PAUSE_BUTTON.querySelector("#pause-button").classList.add("hide");

  STOP_TIMER_BUTTON.querySelector("#timer-button").classList.remove("hide");
  STOP_TIMER_BUTTON.querySelector("#stop-button").classList.add("hide");

  clearTimerInterval();

  currentTime = time;

  updateTimer();

  if (!isMuted) {
    muteSound();
  }
}

function play() {
  isPaused = false;

  PLAY_PAUSE_BUTTON.querySelector("#play-button").classList.add("hide");
  PLAY_PAUSE_BUTTON.querySelector("#pause-button").classList.remove("hide");

  setTimerInterval();

  if (!isMuted) {
    playSound();
  }
}

function pause() {
  isPaused = true;

  PLAY_PAUSE_BUTTON.querySelector("#play-button").classList.remove("hide");
  PLAY_PAUSE_BUTTON.querySelector("#pause-button").classList.add("hide");

  clearTimerInterval();

  if (!isMuted) {
    muteSound();
  }
}

function finish() {
  isFinished = true;

  PLAY_PAUSE_BUTTON.querySelector("#play-button").classList.remove("hide");
  PLAY_PAUSE_BUTTON.querySelector("#pause-button").classList.add("hide");

  clearTimerInterval();

  if (!isMuted) {
    muteSound();

    finishTimerAudio.play();
  }
}

function updateTimer() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime - minutes * 60;

  TIMER_DISPLAY.innerText = `${minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}

function setTimerInterval() {
  timer = setInterval(() => {
    if (currentTime <= 0) {
      finish();

      return;
    }

    --currentTime;

    updateTimer();
  }, 1000);
}


function clearTimerInterval() {
  clearInterval(timer);
}

function playSound() {
  backgroundAudio.loop = true;
  backgroundAudio.play();
}

function muteSound() {
  backgroundAudio.pause();
}

function toggleTheme() {
  THEME_TOGGLER.querySelector(`#${theme}-theme-icon`).classList.add("hide");

  if (theme === "light") {
    theme = "dark";

    document.body.classList.add("dark");
  } else {
    theme = "light";

    document.body.classList.remove("dark");
  }

  THEME_TOGGLER.querySelector(`#${theme}-theme-icon`).classList.remove("hide");
}
