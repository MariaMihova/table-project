import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./plugins/router.js";
import store from "./plugins/store.js";

Vue.config.productionTip = false;

const app = new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
});

app.$mount("#app");
