<template>
  <div class="test">
    <h1>{{ msg }}</h1>
    <h2>学生姓名:{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <button @click="sendStudentName">发送学生名</button>
    <button @click="unbindSendStudentName">解绑自定义事件</button>
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
      // 触发 Student 组件身上绑定的 wangzhy 事件.
      this.$emit('wangzhy', this.name);
    },
    unbindSendStudentName() {
      // 解绑单个自定义事件
      this.$off('wangzhy');
      // 解绑多个自定义事件
      // this.$off(['wangzhy','wangzhy1']);
      // 解绑所有自定义事件
      this.$off();
    }
  }
}
</script>

<style scoped>
.test {
  background-color: orange;
}
</style>