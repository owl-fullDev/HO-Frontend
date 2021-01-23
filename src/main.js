import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ConfigProgrammatic, Table, Autocomplete } from "buefy";
import "buefy/dist/buefy.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-datetime/dist/vue-datetime.css";

Vue.component("faIcon", FontAwesomeIcon);

Vue.use(Table);
Vue.use(Autocomplete);
ConfigProgrammatic.setOptions({
  defaultIconPack: "fas",
  defaultIconComponent: "faIcon",
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
