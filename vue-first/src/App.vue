<template>
  <div>
    <Hello/>
  </div>
</template>

<script>
// 引入组件
import Hello from './components/Hello.vue'

export default {
  name: "App",
  template: `
    <App></App>
  `,
  components: {
    Hello
  }
}
</script>

