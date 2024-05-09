<template>
  <div>
    <Banner/>
    <hr>
    <router-view>未点击时显示的内容。</router-view>
  </div>
</template>

<script>


import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Banner from "@/components/router/Banner.vue";

export default {
  name: "App",
  components: {Banner, About, Home},
  methods: {},
  mounted() {
  },
  data() {
    return {}
  },
  watch: {}
}
</script>

<style>
.active {
  color: red;
}
</style>

