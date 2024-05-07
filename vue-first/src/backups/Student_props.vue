<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>学生姓名：{{ myName }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <h2>学生年龄1：{{ myAge + 1 }}</h2>
    <h2>学生年龄2：{{ myAge * 1 + 1 }}</h2>
    <h2>学生年龄3：{{ myAge + 1 }}</h2>
    <button @click="addAge">年龄 + 1</button>
    <hr/>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    console.log(this);
    return {
      msg: '我是一个学生!!!',
      myName: this.name,
      myAge: this.age
    }
  },
  methods: {
    // 年龄 + 1
    addAge() {
      this.myAge++;
    }
  },
  // 1) 简单接收 props
  props: [
    'name', 'sex', 'age', 'phone'
  ]
  // 2) 接收 props 并指定类型
  // 该收收，但是会在控制台输出错误信息。
  // props: {
  //   name: String,
  //   age: Number,
  //   sex: String
  // }
  // 3) 接收 props 并指定类型和默认值和是否必传
  // props: {
  //   name: {
  //     type: String, // name 的类型是 String
  //     required: true // name 是必传的
  //   },
  //   age: {
  //     type: Number,
  //     default: 18 // age 的默认值是 18   (可传可不传)
  //   },
  //   sex: {
  //     type: String,
  //     required: true
  //   }
  // }
}
</script>

<style scoped lang="scss">

</style>