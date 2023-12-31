const MIN = 0;
const MAX = 10;
const STEP = 1;

let DEFAULT_VALUE = getRandomNumber(MIN, MAX); // Default value `0`

const GAME_CONTAINER = document.body.querySelector("main#game");

const possibleAttemptValues = Array.from(
  { length: (MAX - MIN) / STEP + 1 },
  (_, i) => MIN + i * STEP
);

let numberToGuess = DEFAULT_VALUE;

let attempts = 0;
const possibleAttempts = [...possibleAttemptValues];

let guessed = false;

setUpGameHTML();

document.addEventListener("keypress", (e) => {
  const FORM = GAME_CONTAINER.querySelector("form");

  if (e.key === "Enter" && !guessed && FORM) {
    FORM.requestSubmit ? FORM.requestSubmit() : FORM.submit();
  } else if (e.key === "Enter" && guessed) {
    restartGame();
  }
});

function play() {
  while (guessed === false) {
    attempts++;

    const index = getRandomNumber(0, possibleAttempts.length - 1);

    const attempt = possibleAttempts[index];

    if (attempt === numberToGuess) {
      guessed = true;

      setUpSuccessHTML(attempts);

      break;
    }

    possibleAttempts.splice(index, 1);
  }
}

function resetSettings() {
  DEFAULT_VALUE = getRandomNumber(MIN, MAX); // Set another random default value

  numberToGuess = DEFAULT_VALUE; // Set to the new default value

  attempts = 0;
  possibleAttempts.splice(0, possibleAttempts.length, ...possibleAttemptValues);

  guessed = false;
}

function submitForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const inputNumber = formData.get("numberToGuess");

  if (
    isNaN(inputNumber) ||
    !possibleAttemptValues.includes(Number(inputNumber))
  ) {
    alert("Número inválido.");

    return;
  }

  numberToGuess = Number(inputNumber);

  play();
}

function restartGame() {
  resetSettings();

  setUpGameHTML();
}

function setUpGameHTML() {
  GAME_CONTAINER.innerHTML = `
    <h1>Jogo da Adivinhação</h1>

    <p>Adivinhe o número entre ${MIN} e ${MAX}</p>

    <form>
      <input
        type="number"
        name="numberToGuess"
        step="${STEP}"
        min="${MIN}"
        max="${MAX}"
        value="${DEFAULT_VALUE}"
        required
      />

      <button type="submit">Tentar</button>
    </form>
  `;

  GAME_CONTAINER.querySelector("form").addEventListener("submit", submitForm);
}

function setUpSuccessHTML(attempts) {
  GAME_CONTAINER.innerHTML = `
    <h1 style="margin-bottom: 2rem;">Acertou em ${attempts} tentativas!</h1>

    <button id="restart-game">Jogar novamente</button>
  `;

  document.body
    .querySelector("#restart-game")
    .addEventListener("click", restartGame);
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}
