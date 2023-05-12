import { defineAsyncComponent } from "vue";
import Vue from "vue";
const App = defineAsyncComponent(() => import("./App.vue"));
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";
// import VueTabs from 'vue-nav-tabs';
import VueTabs from "vue-nav-tabs/dist/vue-tabs.js";
//import 'vue-nav-tabs/dist/vue-nav-tabs.min.css';
import "vue-nav-tabs/themes/vue-tabs.css";

import "@/scss/GlobalStyle.scss";

Vue.use(VueTabs);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
