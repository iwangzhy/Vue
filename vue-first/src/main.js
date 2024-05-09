import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";

// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);


import roueter from "@/router/index";

Vue.config.productionTip = false;
Vue.use(VueRouter);

import { Button, Select,DatePicker } from 'element-ui';
// 注册全局组件
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(DatePicker.name, DatePicker);
// Vue.use(Button)
// Vue.use(Select)


new Vue({
  render: h => h(App),
  router: roueter
}).$mount('#app');
