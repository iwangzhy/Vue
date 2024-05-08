<template>
  <div class="container">
    <Category title="美食">
      <img slot="center" :src="foods" alt="美食">
      <a slot="footer" href="https://baidu.com">更多美食...</a>
    </Category>
    <Category title="游戏">
      <ul slot="center">
        <li v-for="(i,index) in games" :key="index">{{ i }}</li>
      </ul>
      <template slot="footer">
        <a href="https://baidu.com">更多游戏1...</a>
        <a href="https://baidu.com">更多游戏2...</a>
      </template>
    </Category>
    <Category title="电影">
      <video slot="center" :src="films" controls/>
      <template v-slot:footer>
        <a href="https://baidu.com">更多电影1...</a>
        <a href="https://baidu.com">更多电影2...</a>
      </template>
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

