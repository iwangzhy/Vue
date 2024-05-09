<template>
  <div>
    <h3>上方组件总和为：{{ count }}</h3>
    <h3>列表中第一个人的名字是：{{ firstPersonName }}</h3>
    <h1>人员列表</h1>
    <input type="text" placeholder="请输入名称"
           @keyup.enter="add"
           v-model="name">
    <button @click="add">添加</button>
    <button @click="addRandomPerson">随机添加</button>
    <ul>
      <li v-for="p in personList" :key="p.id">{{ p.name }}</li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import {nanoid} from "nanoid";

export default {
  name: "Person",
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState('countOptions', ['count']),
    ...mapState('personOptions', ['personList']),
    ...mapGetters('personOptions', ['firstPersonName']),
  },
  methods: {
    ...mapMutations('personOptions', {
      addPerson: 'ADD_PERSON'
    }),
    ...mapActions('personOptions',['addRandomPerson']),
    add() {
      if (!this.name.trim()) {
        return;
      }
      const obj = {id: nanoid(), name: this.name};
      // this.$store.commit('personOptions/ADD_PERSON', obj);
      this.addPerson(obj);
      this.name = '';
    }
  },
  mounted() {
    console.log(this);
  },
  beforeUpdate() {
    console.log('beforeUpdate',this);
  }
}
</script>

<style scoped>

</style>