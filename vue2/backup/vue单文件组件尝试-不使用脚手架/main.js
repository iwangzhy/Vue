// main.js:1 Uncaught SyntaxError: Cannot use import statement outside a module
// 浏览器不认识这行代码
import App from './App.vue'

new Vue({
  el: '#app',
  components: {
    App
  }
});