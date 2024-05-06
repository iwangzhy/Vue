<template>
  <div class="demo">
    <h2 ref="title">hello, {{ name }} !!!</h2>
    <button ref="btn" @click="showDom">show dom</button>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data() {
    return {
      name: 'wangzhy'
    }
  },
  methods: {
    showDom() {
      console.log(this.$refs);
    }
  }
};
</script>
<style>
.demo {
  color: red;
}
</style>