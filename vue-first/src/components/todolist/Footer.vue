<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="allFinished"/>
    </label>
    <span>
      <span>已完成 {{ doneTotal }}</span> / 全部 {{ todos.length }}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    doneTotal() {
      // return this.todos.filter(item => item.done).length
      return this.todos.reduce((pre, cur) => {
        // pre 上一次函数的返回值
        // cur 当前遍历的对象
        pre = pre + (cur.done ? 1 : 0);
        return pre;
      }, 0);
    },
    allFinished: {
      get() {
        return this.todos.filter(item => item.done).length === this.todos.length;
      },
      set(value) {
        this.$emit('checkAll', value);
      }
    }
  },
  methods: {
    clearAll() {
      this.$emit('clearAllFinishedTodo');
    }
  },
  props: ['todos']
}
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>