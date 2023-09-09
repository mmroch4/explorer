import { markCurrentLink } from "./src/current-link.js";
import Router from "./src/Router.js";
import { routes } from "./src/routes.js";

const router = new Router(routes);

router.handle();

markCurrentLink();

window.onpopstate = () => {
  router.handle();

  markCurrentLink();
};
window.route = () => {
  router.route();

  markCurrentLink();
};
