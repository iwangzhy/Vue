<template>
  <div>
    <h1>About</h1>
  </div>
</template>

<script>
export default {
  name: "About",
  mounted() {
    console.log("About mounted", this);
  },
  beforeDestroy() {
    console.log("About beforeDestroy");
  },
  // 通过路由规则进入该组件时被调用
  beforeRouteEnter(to, from, next) {
    console.log("About beforeRouteEnter");
    next();
  },
  // 通过路由规则，离开该组件时被调用
  beforeRouteLeave(to, from, next) {
    console.log("About beforeRouteLeave");
    next();
  }
}
</script>

<style scoped>

</style>