<template>
  <div class="container">
    <Category title="游戏">
      <template scope="games">
        <ol>
          <li v-for="(i,index) in games.games" :key="index">{{ i }}</li>
        </ol>
      </template>
    </Category>
    <Category title="游戏">
      <template v-slot="games">
        <ol>
          <li v-for="(i,index) in games.games" :key="index">{{ i }}</li>
        </ol>
      </template>
    </Category>
    <Category title="游戏">
      <template v-slot="{games}">
        <h4 v-for="(i,index) in games" :key="index">{{ i }}</h4>
      </template>
    </Category>
  </div>
</template>

<script>

import Category from "@/components/Category.vue";

export default {
  name: "App",
  components: {Category},
  methods: {},
  mounted() {
  },
  watch: {}
}
</script>

<style>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f0f0f0;
}
</style>

