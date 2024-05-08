<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <hr>
    <transition-group
        name="animate__animated animate__bounce"
        enter-active-class="animate__swing"
        leave-active-class="animate__backOutUp"
        appear>
      <h2 class="hello" v-show="!isShow" key="1">hello1, {{ name }} !!!</h2>
      <h2 class="hello" v-show="isShow" key="2">hello2, {{ name }} !!!</h2>
    </transition-group>
  </div>
</template>

<script>
// 直接引入 css 样式
import 'animate.css';

export default {
  name: 'Hello',
  data() {
    return {
      name: 'wangzhy',
      isShow: true
    }
  },
  methods: {}
};
</script>
<style scoped>
.hello {
  color: red;
  background-color: skyblue;
}
</style>