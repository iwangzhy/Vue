<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot name="center">默认值1</slot>
    <hr/>
    <slot name="footer">默认值2</slot>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ['title', 'listData']
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