<template>
  <div>
    <h2 @click="showName">学校姓名：{{ name }}</h2>
    <h2> 地址：{{ address }}</h2>
    <hr/>
  </div>
</template>

<script>
// 引入一个混入对象
import {mixin} from '../mixin/mixin'

export default {
  name: "School",
  data() {
    return {
      name: '清华大学',
      address: 'China'
    }
  },
  beforeCreate() {
    console.log('School beforeCreate');
  },
  mounted() {
    console.log('School mounted');
  },
  mixins: [mixin]
}
</script>

<style scoped lang="scss">

</style>