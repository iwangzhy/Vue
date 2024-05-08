<template>
  <div class="container">
    <Category title="美食">
      <img :src="foods" alt="美食">
    </Category>
    <Category title="游戏">
      <ul>
        <li v-for="(i,index) in games" :key="index">{{ i }}</li>
      </ul>
    </Category>
    <Category title="电影">
      <video :src="films" controls/>
    </Category>
  </div>
</template>

<script>

import Category from "@/components/Category.vue";

export default {
  name: "App",
  components: {Category},
  methods: {},
  mounted() {
  },
  data() {
    return {
      foods: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
      games: ['aaa', 'bbb', 'cccc', 'dddd', 'eeee'],
      films: "https://encrypted-vtbn0.gstatic.com/video?q=tbn:ANd9GcSUVe8tNFft9WTXoEt4NDEuMFrHUV6w-VmI3g"
    }
  },
  watch: {}
}
</script>

<style>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f0f0f0;
}
</style>

