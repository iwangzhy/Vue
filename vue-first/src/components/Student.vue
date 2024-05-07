<template>
  <div class="test">
    <h1>{{ msg }}</h1>
    <h2>学生姓名:{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <hr/>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      msg: '我是一个学生!!!',
      name: 'wangzhy',
      sex: 'female'
    }
  }
}
</script>

<style scoped>
.test {
  background-color: orange;
}
</style>