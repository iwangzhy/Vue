<template>
  <li>
    <label>
      <input type="checkbox" :checked="data.done" @change="handleCheck(data.id)"/>
      <span>{{ data.name }}</span>
    </label>
    <button class="btn btn-danger" @click="deleteOne(data.id)">删除</button>
  </li>
</template>

<script>
export default {
  name: "Item",
  methods: {
    handleCheck(id) {
      this.$bus.$emit('checkTodo', id);
    },
    deleteOne(id) {
      if (confirm('确定删除?')) {
        this.$bus.$emit('delTodo', id);
      }
    }
  },
  props: ['data', 'checkTodo', 'delTodo']
}
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #dddddd;
}

li:hover button {
  display: inline-block;
}
</style>