<template>
  <div>
<!--    <Student name="李四" sex="female" age="18"/>-->
    <Student name="李四" sex="female" :age="18"/>
<!--    <Student name="李四" sex="female" :age="18"/>-->
  </div>
</template>

<script>

// 引入组件
import Student from "@/components/Student.vue";

export default {
  name: "App",
  components: {
    Student
  }
}
</script>

