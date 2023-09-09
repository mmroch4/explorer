export default class Router {
  constructor(routes = {}) {
    if (typeof routes !== "object") return;

    this._routes = new Map(routes);
  }

  add(pathname, page) {
    if (
      typeof pathname !== "string" &&
      typeof pathname !== "number" &&
      !pathname &&
      typeof page !== "string" &&
      !page
    )
      return;

    this._routes.set(pathname, page);
  }

  async handle() {
    const { pathname } = window.location;
    const route = this._routes.get(pathname) || this._routes.get(404);

    const response = await (await fetch(route)).text();

    document.querySelector("#app").innerHTML = response;

    window.onpopstate = () => this.handle();
  }

  route(e = window.event) {
    e.preventDefault();

    window.history.pushState({}, "", e.target.href);

    this.handle();
  }
}
