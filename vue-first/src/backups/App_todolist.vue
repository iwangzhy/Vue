<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <!--    绑定自定义事件 addTodo     -->
        <Header @addTodo="receive"/>
        <List :todos="todos"/>
        <Footer :todos="todos"
                @checkAll="checkAll"
                @clearAllFinishedTodo="clearAllFinishedTodo"/>
      </div>
    </div>
  </div>
</template>

<script>

// 引入组件
import Header from './components/todolist/Header.vue';
import List from './components/todolist/List.vue';
import Footer from './components/todolist/Footer.vue';

import pubsub from 'pubsub-js';

export default {
  name: "App",
  components: {
    Header,
    List,
    Footer
  },
  methods: {
    receive(todo) {
      // 添加到最前面
      this.todos.unshift(todo);
    },
    checkTodo(id) {
      // filter 会返回一个新的数组
      this.todos.forEach(i => {
        if (i.id === id) {
          i.done = !i.done;
        }
      });
    },
    checkAll(isDone) {
      this.todos.forEach(i => i.done = isDone);
    },
    delTodo(id) {
      this.todos = this.todos.filter(i => i.id !== id);
    },
    clearAllFinishedTodo() {
      this.todos = this.todos.filter(i => !i.done);
    }
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todos')) || []
    }
  },
  watch: {
    // 当 this.todos 有变化时,修改 localStorage 中的 todos
    todos: {
      handler(newVal) {
        localStorage.setItem('todos', JSON.stringify(newVal));
      },
      // 数组中的元素的属性有变化时也会触发
      deep: true
    }
  },
  mounted() {
    // this.$bus.$on('delTodo', this.delTodo);
    this.delTodoId = pubsub.subscribe('delTodo', (msg, id) => {
      this.delTodo(id);
    });
    this.$bus.$on('checkTodo', this.checkTodo);

    this.$bus.$on('updateTodo', (id, name) => {
      this.todos.forEach(t => {
        if (t.id === id) {
          t.name = name;
        }
      })
    });
  },
  beforeDestroy() {
    this.$bus.$off('checkTodo', 'delTodo');
    pubsub.unsubscribe(this.delTodoId);
  }
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn-edit {
  color: #fff;
  background-color: #5aca74;
  border: 1px solid #247ebd;
  margin-right: 3px;
}

.btn-edit:hover {
  color: #fff;
  background-color: #09f33f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>

