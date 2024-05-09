<template>
  <div>
    <ul>
      <li>
        <router-link active-class="active" to="/home">home</router-link>
      </li>
      <li>
        <router-link active-class="active" to="/about">about</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Banner"
}
</script>

<style scoped>

</style>