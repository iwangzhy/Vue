<template>
  <div class="test">
    <h1>{{ msg }}</h1>
    <h2>学生姓名:{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <button @click="sendStudentName">把学生名给 School 组件</button>
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
  },
  methods: {
    sendStudentName() {
      // 触发 hello 事件，将自身数据传递给父组件
      this.$bus.$emit('hello', this.name);
    }
  }
}
</script>

<style scoped>
.test {
  background-color: orange;
}
</style>