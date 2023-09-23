import { LocalStorage } from "./LocalStorage.js";
import { search } from "./search.js";

/*
User {
  name: string
  login: string
  repos: number,
  followers: number
  url: string
  pictureUrl: string
}
*/

class Favorites {
  users = new Map();
  key = "users";

  constructor() {
    this.load();
  }

  load() {
    const savedUsers =
      LocalStorage.get(this.key, {
        cursive: true,
        cursiveValue: [],
      }) ?? [];

    for (const savedUser of savedUsers) {
      this.users.set(savedUser.login, { ...savedUser });
    }
  }

  async add(login) {
    if (!login || typeof login !== "string") {
      console.log("Invalid login");

      return {
        success: false,
        message: "Invalid login",
      };
    }

    if (this.users.has(login)) {
      console.log("User has already been added");

      return {
        success: false,
        message: "User has already been added",
      };
    }

    const user = await search(login);

    if (!user)
      return {
        success: false,
        message: "User does not exist",
      };

    this.users.set(login, { ...user });

    LocalStorage.set(this.key, Array.from(this.users.values()));

    return {
      success: true,
      message: "User was successfully added",
    };
  }

  remove(login) {
    if (!login || typeof login !== "string") {
      console.log("Invalid login");

      return;
    }

    if (!this.users.has(login)) {
      console.log("User has not been added");

      return;
    }

    this.users.delete(login);

    LocalStorage.set(this.key, Array.from(this.users.values()));
  }
}

class UI extends Favorites {
  els = {
    form: document.body.querySelector("form"),
    tbody: document.body.querySelector("tbody"),
    emptyMessage: document.body.querySelector("#empty-message"),
    table: document.body.querySelector("table"),
  };

  constructor() {
    super();

    this.listUsers();
    this.setForm();
  }

  listUsers() {
    this.els.tbody.innerHTML = "";

    if (!this.users.size) {
      this.els.emptyMessage.classList.remove("hide");
      this.els.table.classList.add("hide");

      return;
    }

    this.els.emptyMessage.classList.add("hide");
    this.els.table.classList.remove("hide");

    this.users.forEach((user) => {
      const row = this.createRow(user);

      this.els.tbody.appendChild(row);
    });
  }

  createRow(user) {
    const a = document.createElement("a");
    a.href = user.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const tr = document.createElement("tr");
    tr.setAttribute("data-user", user.login);

    const nameTd = document.createElement("td");

    const picImg = document.createElement("img");
    picImg.src = user.pictureUrl;
    picImg.alt = `${user.name}' profile picture`;

    const nameP = document.createElement("p");
    nameP.innerHTML = `
      <p>
        <strong>${user.name}</strong>
        <br />
        @${user.login}
      </p>
    `;

    nameTd.appendChild(picImg);
    nameTd.appendChild(nameP);

    a.appendChild(nameTd);

    const reposTd = document.createElement("td");
    reposTd.innerText = user.repos;

    const followersTd = document.createElement("td");
    followersTd.innerText = user.followers;

    const deleteTd = document.createElement("td");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.onclick = () => {
      this.remove(user.login);

      this.listUsers();
    };

    deleteTd.appendChild(deleteBtn);

    tr.appendChild(a);
    tr.appendChild(reposTd);
    tr.appendChild(followersTd);
    tr.appendChild(deleteTd);

    return tr;
  }

  setForm() {
    this.els.form.addEventListener("submit", (e) => this.submitForm(e));
  }

  async submitForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const login = formData.get("login");

    if (!login || typeof login !== "string") {
      alert("Invalid GitHub username");

      this.clearForm();

      return;
    }

    const { success, message } = await this.add(login);

    if (!success) {
      alert(message);

      this.clearForm();

      return;
    }

    this.listUsers();

    this.clearForm();
  }

  clearForm() {
    this.els.form.reset();
  }
}

new UI();
