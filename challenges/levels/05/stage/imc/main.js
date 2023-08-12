const POPOVER_FOREGROUND = document.body.querySelector("#popover-foreground");
const POPOVER = POPOVER_FOREGROUND.querySelector("#popover");

const ERROR = document.body.querySelector("#error");

let isPopoverOpen = false;
let isErrorAlertOpen = false;

document.body.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const weight = formData.get("weight"); // in KG
  const height = formData.get("height"); // in CM

  if (isNaN(weight) || isNaN(height)) {
    showError("Digite somente números");

    return;
  }

  manageErrorAlert("close");

  const imc = +weight / (+height / 100) ** 2;

  showResult(imc.toFixed(1));

  this.reset();
});

document.addEventListener("click", (e) => {
  if (e.target === POPOVER_FOREGROUND && isPopoverOpen) {
    managePopover("close");
  } else if (e.target === ERROR && isErrorAlertOpen) {
    manageErrorAlert("close");
  }
});

document.addEventListener("keypress", (e) => {
  if (e.key === "Escape" && isPopoverOpen) {
    managePopover("close");
  }
});

function showError(message) {
  ERROR.innerHTML = message;

  manageErrorAlert("open");
}

function showResult(result) {
  const CLOSE_POPOVER = POPOVER.querySelector("span");
  const MESSAGE = POPOVER.querySelector("h1");

  MESSAGE.innerHTML = `Seu IMC é de ${result} kg/m&sup2;`;

  managePopover("open");

  CLOSE_POPOVER.addEventListener("click", () => {
    managePopover("close");
  });
}

function managePopover(action) {
  if (action === "open") {
    POPOVER_FOREGROUND.style.display = "flex";

    isPopoverOpen = true;
  } else {
    POPOVER_FOREGROUND.style.display = "none";

    isPopoverOpen = false;
  }
}

function manageErrorAlert(action) {
  if (action === "open") {
    ERROR.style.display = "flex";

    isErrorAlertOpen = true;
  } else {
    ERROR.style.display = "none";

    isErrorAlertOpen = false;
  }
}
