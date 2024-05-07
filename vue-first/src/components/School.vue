<template>
  <div class="test">
    <h2 class="title">学校名称: {{ name }}</h2>
    <h2> 地址：{{ address }}</h2>
    <button @click="sendSchoolName">发送校名</button>
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
  },
  methods: {
    sendSchoolName() {
      this.getSchoolName(this.name);
    }
  },
  props: ['getSchoolName']
}
</script>

<style scoped>
.test {
  background-color: skyblue;
}
</style>