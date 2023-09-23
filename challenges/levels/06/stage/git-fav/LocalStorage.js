export class LocalStorage {
  static get(
    key,
    options = {
      cursive: false,
    }
  ) {
    if (!key || typeof key !== "string") {
      console.log("Invalid key");

      return;
    }

    const item = JSON.parse(localStorage.getItem(key));

    if (!item || typeof item === "undefined") {
      if (options.cursive) this.set(key, options.cursiveValue);

      return;
    }

    return item;
  }

  static set(key, value) {
    if (!key || typeof key !== "string") {
      console.log("Invalid key");

      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }
}
