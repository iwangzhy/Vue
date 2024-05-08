<template>
  <div class="container">
    <Search/>
    <List/>
  </div>
</template>

<script>
import Search from "@/components/github/Search.vue";
import List from "@/components/github/List.vue";

export default {
  name: "App",
  components: {Search, List},
  methods: {},
  mounted() {
  },
  data() {
    return {}
  },
  watch: {}
}
</script>

<style>
</style>

