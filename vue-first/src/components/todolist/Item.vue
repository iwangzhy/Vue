<template>
  <li>
    <label>
      <input type="checkbox" :checked="data.done" @change="handleCheck(data.id)"/>
      <span v-show="!data.isEdit">{{ data.name }}</span>
      <input v-show="data.isEdit"
             @blur="handleBlur(data,$event)"
             type="text"
             :value="data.name"
             ref="inputName">
    </label>
    <button class="btn btn-danger" @click="handleDelete(data.id)">删除</button>
    <button v-show="!data.isEdit"
            class="btn btn-edit"
            @click="handleEdit(data)">编辑
    </button>
  </li>
</template>

<script>
import pubsub from 'pubsub-js';

export default {
  name: "Item",
  methods: {
    handleCheck(id) {
      this.$bus.$emit('checkTodo', id);
    },
    // 失去焦点
    handleBlur(todo, e) {
      let newName = e.target.value.trim();
      if (!newName) {
        return;
      }
      todo.isEdit = false;
      this.$bus.$emit('updateTodo', todo.id, newName);
    },
    handleDelete(id) {
      if (confirm('确定删除?')) {
        pubsub.publish('delTodo', id);
      }
    },
    handleEdit(todo) {
      if (todo.hasOwnProperty('isEdit')) {
        todo.isEdit = true;
      } else {
        this.$set(todo, 'isEdit', true);
      }
      // 获取焦点
      this.$nextTick(function () {
        this.$refs.inputName.focus();
      });
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