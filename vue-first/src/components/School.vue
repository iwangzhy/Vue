<template>
  <div class="test">
    <h2 class="title">学校名称: {{ name }}</h2>
    <h2> 地址：{{ address }}</h2>
    <hr/>
  </div>
</template>

<script>

export default {
  name: "School",
  data() {
    return {
      name: '清华大学',
      address: 'China'
    }
  },
  methods: {},
  mounted() {
    console.log(this.$bus);
    // 接收事件
    this.$bus.$on('hello', (data) => {
      console.log('School 接收到了', data)
    })
  },
  beforeDestroy() {
    // 组件销毁时，解绑事件
    this.$bus.$off('hello');
  }
}
</script>

<style scoped>
.test {
  background-color: skyblue;
}
</style>