const MIN = 8;
const MAX = 10;
const STEP = 1;

const DEFAULT_VALUE = getRandomNumber(MIN, MAX); // Default value `0`

const GAME_CONTAINER = document.querySelector("main#game");

const possibleAttemptValues = [];

let ac = MIN;
while (possibleAttemptValues.length < (MAX - MIN) / STEP + 1) {
  possibleAttemptValues.push(ac);

  ac += STEP;

  console.log(possibleAttemptValues);
}

let numberToGuess = DEFAULT_VALUE;

let attempts = 0;
const possibleAttempts = [...possibleAttemptValues];

let guessed = false;

setUpGameHTML();

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
  numberToGuess = DEFAULT_VALUE; // Set to default value

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

function setUpSuccessHTML(attempts) {
  GAME_CONTAINER.innerHTML = `
    <h1 style="margin-bottom: 2rem;">Acertou em ${attempts} tentativas!</h1>

    <button id="restart-game">Jogar novamente</button>
  `;

  document.querySelector("#restart-game").addEventListener("click", () => {
    resetSettings();

    setUpGameHTML();
  });
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

  document.querySelector("form").addEventListener("submit", submitForm);
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}
