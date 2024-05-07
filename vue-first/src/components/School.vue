<template>
  <div class="test">
    <h2 class="title">学校名称: {{ name }}</h2>
    <h2> 地址：{{ address }}</h2>
    <hr/>
  </div>
</template>

<script>
import pubsub from 'pubsub-js';

export default {
  name: "School",
  data() {
    return {
      name: '清华大学',
      address: 'China'
    }
  },
  methods: {},
  mounted() {
    this.pubId = pubsub.subscribe('hello', (msgName, msg) => {
      console.log(this);
      console.log('School 接收到了订阅的消息', msgName, msg);
    });
  },
  beforeDestroy() {
    pubsub.unsubscribe(this.pubId);
  }
}
</script>

<style scoped>
.test {
  background-color: skyblue;
}
</style>