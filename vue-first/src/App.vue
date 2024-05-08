<template>
  <div id="root">
    <Hello/>
    <Hello1/>
  </div>
</template>

<script>

// 引入组件
import Hello from "@/components/Hello.vue";
import Hello1 from "@/components/Hello1.vue";

export default {
  name: "App",
  components: {
    Hello,
    Hello1
  },
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
</style>

