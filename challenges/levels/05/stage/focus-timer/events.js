import { elements } from "./elements.js";
import { toggleTheme } from "./theming.js";
import { timer } from "./timer.js";

elements.theming.light.addEventListener("click", () => toggleTheme("light"));
elements.theming.dark.addEventListener("click", () => toggleTheme("dark"));

elements.action.play.addEventListener("click", () => {
  if (!timer.started) {
    timer.start();
  } else if (timer.started && timer.paused && !timer.finished) {
    timer.play();
  }
});

elements.action.pause.addEventListener("click", () => {
  if (!timer.started || timer.paused || timer.finished) return;

  timer.pause();
});

elements.action.stop.addEventListener("click", () => {
  if (!timer.started) return;

  timer.stop();
});

elements.action.add.addEventListener("click", () => {
  if (timer.finished) return;

  timer.add();
});

elements.action.remove.addEventListener("click", () => {
  if (timer.finished) return;

  timer.remove();
});

elements.action.set.addEventListener("click", async () => {
  elements.display.minutes.setAttribute("contenteditable", true);

  elements.display.minutes.focus();

  // elements.display.seconds.setAttribute("contenteditable", true);

  // elements.display.seconds.focus();
});

elements.display.minutes.addEventListener("focus", () => {
  console.log("sa");

  elements.display.minutes.textContent = "";

  elements.display.minutes.onkeypress = (e) => /\d/.test(e.key);
});

elements.display.minutes.addEventListener("blur", (e) => {
  let minutes = Number(e.currentTarget.textContent);

  if (minutes > 60) {
    minutes = 59;
  } else if (minutes < 0) {
    minutes = 0;
  }

  timer.startingTime = minutes * 60;

  timer.display();
});
