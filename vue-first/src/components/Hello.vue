<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <hr>
    <!--    <transition appear>-->
    <!--      <h2 v-show="isShow">hello, {{ name }} !!!</h2>-->
    <!--    </transition>-->
    <transition-group name="hello" appear>
      <h2 class="hello" v-show="!isShow" key="1">hello1, {{ name }} !!!</h2>
      <h2 class="hello" v-show="isShow" key="2">hello2, {{ name }} !!!</h2>
    </transition-group>
  </div>
</template>

<script>
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

/* 进入的起点，离开的终点 */
.hello-enter, .hello-leave-to {
  transform: translateX(-100%);
}

/* 进入的终点，离开的起点 */
.hello-enter-to, .hello-leave {
  transform: translateX(0);
}

.hello-enter-active, .hello-leave-active {
  transition: 0.5s;
}


.v-enter-active {
  animation: hello 1s;
}

.v-leave-active {
  animation: hello 1s reverse;
}

@keyframes hello {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0px);
  }
}
</style>