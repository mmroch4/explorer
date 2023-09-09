export function markCurrentLink() {
  const { pathname } = window.location;

  const linksToAdd = document.body.querySelectorAll(`a[href="${pathname}"]`);
  const linksToRemove = document.body.querySelectorAll(
    `a:not([href="${pathname}"])`
  );

  for (const link of linksToRemove) {
    link.classList.remove("current");
  }

  for (const link of linksToAdd) {
    link.classList.add("current");
  }
}
