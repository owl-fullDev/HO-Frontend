import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ConfigProgrammatic, Table } from "buefy";
import "buefy/dist/buefy.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.component("faIcon", FontAwesomeIcon);

Vue.use(Table);
ConfigProgrammatic.setOptions({
  defaultIconPack: "fas",
  defaultIconComponent: "faIcon",
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
