<template>
  <ul>
<!--    <li>消息编号：{{ $route.query.id }}</li>-->
<!--    <li>消息标题：{{ $route.query.title }}</li>-->
    <li>消息编号：{{ id }}</li>
    <li>消息标题：{{ title }}</li>
  </ul>
</template>

<script>
export default {
  name: "Detail",
  computed: {},
  mounted() {
  },
  props: ['id', 'title']
}
</script>

<style scoped>

</style>