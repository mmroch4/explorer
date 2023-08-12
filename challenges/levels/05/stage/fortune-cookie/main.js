const CONTAINER = document.body.querySelector("main");

const QUOTES = [
  "Se alguém está tão cansado que não possa te dar um sorriso, deixa-lhe o teu.",
];

let isQuoteOpen = false;

setOpenQuoteHTML();

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !isQuoteOpen) {
    openQuote();
  } else if (e.key === "Enter" && isQuoteOpen) {
    reopenQuote();
  }
});

function openQuote() {
  const quote = getRandomQuote();

  isQuoteOpen = true;

  setQuoteHTML(quote);
}

function reopenQuote() {
  isQuoteOpen = false;

  setOpenQuoteHTML();
}

function setOpenQuoteHTML() {
  CONTAINER.classList.add("before");
  CONTAINER.classList.remove("after");

  CONTAINER.innerHTML = `
    <h1>Qual é a sua sorte de hoje?</h1>

    <p>Abra o biscoito e descubra!</p>

    <button id="open">
      <img
        src="./assets/fortune-cookie.svg"
        alt="Ilustração de um biscoito da sorte"
      />
    </button>
  `;

  CONTAINER.querySelector("#open").addEventListener("click", openQuote);
}

function setQuoteHTML(quote) {
  CONTAINER.classList.remove("before");
  CONTAINER.classList.add("after");

  CONTAINER.innerHTML = `
    <h1>Aqui está a sua sorte de hoje:</h1>

    <blockquote>
      ${quote.trim()}
    </blockquote>

    <div>
      <img
        src="./assets/opened-fortune-cookie.svg"
        alt="Ilustração de um biscoito da sorte aberto"
      />
    </div>

    <button id="reopen">Abrir outro biscoito</button>
  `;

  CONTAINER.querySelector("#reopen").addEventListener("click", reopenQuote);
}

function getRandomQuote() {
  return QUOTES[getRandomNumber(0, QUOTES.length - 1)];
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}
