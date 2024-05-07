<template>
  <div>
    <h1>{{ msg }}</h1>
    <input type="text" v-fbind="name" :value="name">
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

<style scoped lang="scss">

</style>