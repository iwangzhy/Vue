import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";

import roueter from "@/router/index";

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router: roueter
}).$mount('#app');
