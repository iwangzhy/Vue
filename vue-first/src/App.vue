<template>
  <div id="root">
    <School/>
    <Student/>
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
  methods: {},
  mounted() {
  },
  data() {
    return {}
  },
  watch: {}
}
</script>

<style>
</style>

