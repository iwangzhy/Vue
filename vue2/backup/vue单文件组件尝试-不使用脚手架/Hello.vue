<template>
  <div class="demo">
    <h2>hello, {{ name }} !!!</h2>
    <button @click="showName">show name</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      name: 'wangzhy'
    }
  },
  methods: {
    showName() {
      alert(this.name);
    }
  }
};
</script>
<style>
.demo {
  color: red;
}
</style>