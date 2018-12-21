import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import "./registerServiceWorker";

library.add(faHome,faPencilAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
