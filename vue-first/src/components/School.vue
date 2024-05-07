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
  }
}
</script>

<style scoped>
.test {
  background-color: skyblue;
}
</style>