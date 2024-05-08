<template>
  <div>
    <button @click="getInfo">获取信息</button>
  </div>
</template>

<script>

// 引入 axios
import axios from 'axios';

export default {
  name: "App",
  components: {},
  methods: {
    getInfo() {
      // CORS 跨域问题。
      axios.get('http://localhost:8080/wangzhy/idea.md').then(res => {
        console.log('请求成功了。。。', res.data);
      }, error => {
        console.log('请求失败了。。。', error.message)
      })
    }
  },
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

