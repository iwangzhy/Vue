<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot :games="games">默认值1</slot>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ['title'],
  data() {
    return {
      games: ['aaa', 'bbb', 'cccc', 'dddd', 'eeee']
    }
  }
}
</script>

<style scoped>
.category {
  background-color: skyblue;
  width: 200px;
  height: 300px;
}

h3 {
  text-align: center;
  background-color: orange;
  justify-content: space-around;
}

video {
  width: 100%;
}
</style>