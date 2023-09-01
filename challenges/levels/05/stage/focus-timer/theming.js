import { elements } from "./elements.js";

export let theme = "light";

export function toggleTheme(to) {
  if (to === "light") {
    theme = "light";

    elements.body.classList.remove("dark");

    elements.theming.light.classList.add("hide");
    elements.theming.dark.classList.remove("hide");
  } else {
    theme = "dark";

    elements.body.classList.add("dark");

    elements.theming.light.classList.remove("hide");
    elements.theming.dark.classList.add("hide");
  }
}
