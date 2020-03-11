import Vue from "vue";
import App from "./App.vue";
import compositionApi from "@vue/composition-api";
import router from "./router";
import iview from "view-design";
import "view-design/dist/styles/iview.css";

Vue.use(compositionApi);
Vue.use(iview);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
