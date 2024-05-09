<template>
  <div>
<!--    <Banner/>-->
<!--    <hr>-->
<!--    <router-view>未点击时显示的内容。</router-view>-->
    <button>原生</button>
    <button>ElementUI</button>
    <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期">
    </el-date-picker>
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

