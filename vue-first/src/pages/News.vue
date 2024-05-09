<template>
  <div>
    <h2>News</h2>
    <ul>
      <li>news1<input/></li>
      <li>news2<input/></li>
      <li>news3<input/></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "News",
  activated() {
    console.log('News activated')
  },
  deactivated() {
    console.log('News deactivated')
  }
}
</script>

<style scoped>

</style>