<template>
  <div>
    <h2>学校名称: {{ name }}</h2>
    <h2> 地址：{{ address }}</h2>
    <button @click="sayHi">hello</button>
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
    sayHi() {
      this.hello();
    }
  }
}
</script>

<style scoped lang="scss">

</style>