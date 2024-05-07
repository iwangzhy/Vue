<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2 @click="showName">学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <hr/>
  </div>
</template>

<script>
import {mixin} from "@/mixin/mixin";

export default {
  name: "Student",
  data() {
    return {
      msg: '我是一个学生!!!',
      name: 'wangzhy',
      sex: 'female'
    }
  },
  mixins: [mixin]
}
</script>

<style scoped lang="scss">

</style>