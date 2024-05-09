<template>
  <div>
    <h1>Home</h1>
    <ul>
      <li>
        <router-link to="/home/news">news</router-link>
      </li>
      <li>
        <router-link to="/home/message">messages</router-link>
      </li>
    </ul>
    <hr>
    <keep-alive :include="['Message']">
      <router-view></router-view>
    </keep-alive>
<!--    <keep-alive include="News">-->
<!--      <router-view></router-view>-->
<!--    </keep-alive>-->
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>