<template>
  <div>
    <h2>当前和为： {{ count }}<br/></h2>
    <h3>当前和放大 10 倍为： {{ bigCount }}</h3>
    <p>我是 {{ name }}，博客地址 ： {{ blog }}</p>
    <h3>下方组件的总人数是: {{ personList.length }} </h3>
    <select v-model="n">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <br/>
    <button @click="add(n)">加法</button>
    <br/>
    <button @click="sub(n)">减法</button>
    <br/>
    <button @click="addWhenOdd(n)">奇数才加</button>
    <br/>
    <button @click="addWait(n)">延迟加</button>
    <br/>
  </div>
</template>

<script>
import {mapGetters, mapState, mapActions, mapMutations} from "vuex";

export default {
  name: "Count",
  data() {
    return {
      n: 1
    }
  },
  computed: {
    ...mapState('countOptions', ['count', 'name', 'blog']),
    ...mapState('personOptions', ['personList']),
    ...mapGetters('countOptions', ['bigCount'])
  },
  methods: {
    ...mapMutations('countOptions',{
      add: 'JIA',
      sub: 'JIAN'
    }),
    ...mapActions('countOptions',{
      addWhenOdd: 'jianWhenOdd',
      addWait: 'jianWait'
    })
  },
  mounted() {
  }
}
</script>

<style scoped>
button {
  margin-top: 5px;
}
</style>