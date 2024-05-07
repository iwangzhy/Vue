<template>
  <div id="root">
    <p>学校名称是:{{ schoolName }}</p>
    <p>学生姓名是:{{ studentName }}</p>

    <School :getSchoolName="getSchoolName"/>
    <!--    <Student v-on:wangzhy="getStudentName"/>-->
    <!--        <Student @wangzhy="getStudentName"/>-->
    <Student ref="student" @click.native="demo"/>
  </div>
</template>

<script>

// 引入组件
import Student from "@/components/Student.vue";
import School from "@/components/School.vue";

export default {
  name: "App",
  components: {
    Student,
    School
  },
  methods: {
    getSchoolName(name) {
      console.log('getSchoolName', name);
      this.schoolName = name;
    },
    getStudentName(name) {
      console.log('getStudentName', name);
      this.studentName = name;
    },
    demo(){
      alert(123);
    }
  },
  mounted() {
    // 绑定自定义事件
    // this.$refs.student.$on('wangzhy', this.getStudentName); // 推荐写法
    // this.$refs.student.$on('wangzhy', function (name, ...params) {
    //   console.log(this); // 触发自定义事件的 VC 对象. 此处为 Student .
    //   this.studentName = name;
    // });
    this.$refs.student.$on('wangzhy', (name, ...params) => {
      console.log(this); // 如果将函数改成箭头函数, this 为当前组件的对象, 此处为 App .
      this.studentName = name;
    });
    // this.$refs.student.$once('wangzhy', this.getStudentName);
  },
  data() {
    return {
      studentName: '',
      schoolName: ''
    }
  },
  watch: {}
}
</script>

<style>
</style>

