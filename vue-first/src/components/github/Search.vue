<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input v-model="keyWord"
             @keyup.enter="search"
             type="text"
             placeholder="enter the name you search"/>&nbsp;
      <button @click="search"> Search</button>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Search",
  data() {
    return {
      keyWord: 'iwangzhy'
    }
  },
  methods: {
    search() {
      this.$bus.$emit('updateListData', {
        isLoading: true
      });
      // axios.get('https://api.github.com/search/users?q=' + this.keyWord)
      axios.get(`https://api.github.com/search/users?q=${this.keyWord}`)
      .then(response => {
        this.$bus.$emit('updateListData', {
          users: response.data.items
        });
      }, error => {
        this.$bus.$emit('updateListData', {
          errorMsg: error.message
        });
      })
    }
  }
}
</script>

<style scoped>

</style>