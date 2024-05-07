export default {
  install(Vue) {
    console.log('@@@install', Vue)
    // 1. 过滤器
    Vue.filter('mySlice', function (val) {
      return val.slice(0, 4);
    });
    // 2. 自定义指令
    Vue.directive('fbind', {
      // 指令与元素成功绑定
      bind(element, binding) {
        console.log("bind");
        element.innerHTML = binding.value;
      },
      // 指令所在元素被插入页面时
      inserted(element, binding) {
        console.log("inserted");
        element.focus();
      },
      // 指令所在的模板被重新解析时
      update(element, binding) {
        console.log("update");
        element.innerHTML = binding.value;
        element.focus();
      }
    });
    // 3. 全局 mixin
    Vue.mixin({
      data() {
        return {
          x: 100,
          y: 200
        }
      },
    });
    // 4. 给 Vue 原型上添加方法 (vm vc 都能使用)
    Vue.prototype.hello = () => {
      console.log('hello');
    }
  }
}