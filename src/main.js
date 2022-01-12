import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import "./assets/base.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faSearch,
  faBell,
  faThList,
  faWindowClose,
  faCheck,
  faInfoCircle,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);
app.use(store);
app.use(router);
app.config.productionTip = false;
library.add(
  faHome,
  faSearch,
  faBell,
  faThList,
  faWindowClose,
  faCheck,
  faInfoCircle,
  faUserCircle
);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
