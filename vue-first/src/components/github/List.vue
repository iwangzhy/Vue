<template>
  <div class="row">
    <div v-show="users.length" v-for="u in users" :key="u.id" class="card">
      <a :href="u.html_url" target="_blank">
        <img :src="u.avatar_url" style='width: 100px'/>
      </a>
      <p class="card-text">{{ u.login }}</p>
    </div>
    <div v-show="isFirst">
      <h1>Welcome....</h1>
    </div>
    <div v-show="isLoading">
      <h1>loading....</h1>
    </div>
    <div v-show="errorMsg">
      <h1>error: {{ errorMsg }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      isFirst: true,
      isLoading: false,
      errorMsg: '',
      users: []
    }
  },
  mounted() {
    this.$bus.$on('updateListData',
        ({isFirst = false, isLoading = false, errorMsg = '', users = []}) => {
          this.isFirst = isFirst;
          this.isLoading = isLoading;
          this.errorMsg = errorMsg;
          this.users = users;
        });
  },
  beforeDestroy() {
    this.$bus.$off('updateListData');
  }
}
</script>

<style scoped>

.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: .75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: .75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>