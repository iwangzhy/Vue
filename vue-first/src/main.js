import Vue from 'vue';
import App from './App.vue';
import store from '@/store';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this;
  },
  store // Vuex 配置
}).$mount('#app');
