<template>
  <div>
    <h2>Message</h2>
    <ul>
      <li v-for="i in messageList" :key="i.id">
        <!--        <router-link :to="`/home/message/detail/${i.id}/${i.title}`">-->
        <!--          {{ i.title }}-->
        <!--        </router-link>-->
        <router-link :to="{
          name:'detail',
          params:{
            id: i.id,
            title: i.title
          }
        }" replace>
          {{ i.title }}
        </router-link>
        <button @click="push(i)">push 查看</button>
        <button @click="replace(i)">replace 查看</button>
      </li>
    </ul>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      messageList: [
        {id: '001', title: 'message001'},
        {id: '002', title: 'message002'},
        {id: '003', title: 'message003'}
      ]
    }
  },
  methods: {
    push(obj) {
      console.log(this.$route)
      this.$router.push({
        name: 'detail',
        query: {
          id: obj.id,
          title: obj.title
        }
      }).catch(err => {
        console.log(err)
      });;
    },
    replace(obj) {
      this.$router.replace({
        name: 'detail',
        query: {
          id: obj.id,
          title: obj.title
        }
      }).catch(err => {
        console.log(err)
      });
    }
  }

}
</script>

<style scoped>

</style>