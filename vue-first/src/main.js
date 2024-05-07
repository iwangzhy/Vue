/**
 * 该文件时整个项目的入口文件
 */
// 引入 Vue
import Vue from 'vue'
// import Vue from 'vue/dist/vue'
import App from './App.vue'
import {mixin} from '@/mixin/mixin'

// 关闭 Vue 的生产提示
Vue.config.productionTip = false;

// 所有的 VC 都是应用这个 mixin
Vue.mixin(mixin);

new Vue({
  // 将 App 组件放入容器中
  render: h => h(App),
}).$mount('#app')

// new Vue({
//   el: '#app',
//   // 将 App 组件放入容器中
//   // 创建一个 App 组件的虚拟 DOM，然后 Vue.js 会将这个虚拟 DOM 渲染为实际的 DOM 并插入到 #app 元素中。
//   render: h => h(App)
// });