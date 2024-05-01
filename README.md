# Vue

Vue2 、Vue3学习记录

教程地址：https://www.bilibili.com/video/BV1Zy4y1K7SH/

**安装 vue-devtools 插件**

https://devtools.vuejs.org/guide/installation.html

## Vue2

刚开始学习 vue2 还是从最基本的 html 中引入 vue 开始学习。

**引入 Vue 2**

```
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.js"></script>
```

### 模板语法

1. **插值语法**：`{{ }}` 里面写的是 js 表达式；用在标签体里面。
2. **指令语法**：`v-bind:href="xxx"`；用于解析标签，`xxx` 是一个js 表达式。

**v-bind 与 v-model 的区别？**

- v-bind 可以用于任何元素，但 v-bind 是单向绑定，数据从 data 流向页面。`v-bind:value`
  可以简写为 `:value`。
- v-model 只能应用于表单类元素上（输入元素上），v-model 是双向绑定。 `v-model:value`
  可以简写为 `v-model`，因为 `v-model` 默认绑定 `value` 属性。

### MVVM 模型

M： 模型 model， 对应 data 中的对象。
V：视图 view ， 模板
VM：视图模型 ViewModel, Vue 实例对象

### 数据代理

通过一个对象代理对另一个对象中属性的操作（读/写）。

```javascript
let obj1 = {x: 100};
let obj2 = {y: 200};

Object.defineProperty(obj2, 'x', {
  get() {
    return obj1.x;
  },
  set(v) {
    obj1.x = v;
  }
});
console.log(obj2);
```

### 数据绑定

`v-on:click="clickFunc"` 事件绑定，`clickFunc` 是一个方法。

简写为：`@click="clickFUnc"`

### 事件修饰符

使用：`<a href="https://wangzhy.com" @click.prevent="showInfo">Blog1</a>`

- prevent 阻止默认事件
- stop 阻止冒泡
- once 事件只触发一次
- capture 使用事件的捕获模式(先捕获再冒泡，capture 就是在捕获期间就执行。)
- self 只有 event.target 是当前操作元素是才触发事件
- passive 事件的默认行为立即执行，不会等待事件处理函数执行完毕
    - `@scroll.passive`
    - `@wheel.passive`

### 键盘事件

- `@keyup` **一般使用 keyup 事件**
    - `@keyup.entry` 回车的时候触发
- `@keydown`

**按键别名**

- enter
- delete
- esc
- space
- tab (必须配置 **`keydown`** 使用,与之类似的还有 `ctrl`、`alt`、`shift`、`meta（win）`)
- up
- down
- left
- right

**Vue 可以在自定义按键别名**

```
Vue.config.keyCodes.huiche = 13;
```

## 计算属性

data 配置项里面的数据就是属性。计算属性是基于依赖的属性，只有依赖的属性发生变化，计算属性才会重新计算。

计算属性 get 方法调用的时机
1， 第一次读取时
2， 依赖的数据发生变化时

注意：

1. 计算属性的 get、set 方法不要写成一个箭头函数，因为箭头函数没有 this（指向定义箭头函数时的 this，或者
   window）。
2. 当计算属性只读不写时可以简写。

```
const vm = new Vue({
  el: "#app",
  data() {
    return {
      name: 'wangzhy',
      address: 'China'
    }
  },
  methods: {
    fullName() {
      return this.name.toUpperCase() + '-' + this.address;
    }
  },
  computed: {
    // 计算属性
    fullname: {
      get() {
        console.log("get");
        return this.name.toUpperCase() + '-' + this.address;
      },
      set(value) {
        console.log(value);
        if (value) {
          [this.name, this.address] = value.split("-");
        }
      }
    }
  }
});
```

### 监视属性

`watch` 选项用于监听数据的变化，当被简述的属性数据发生变化时执行回调函数。

1. 在创建 Vue 时通过 watch 选项设置被监视的属性。
2. 通过 vm.$watch 方法设置被监视的属性。

```
const vm = new Vue({
  el: "#app",
  data() {
    return {
      isLow: false,
      name: 'wangzhy',
      address: 'China'
    }
  },
  methods: {
    changeName() {
      this.isLow = !this.isLow;
      this.name = 'wangzhiyuan';
    }
  },
  computed: {
    fullName() {
      return this.isLow ? this.name.toLowerCase() : this.name.toUpperCase();
    }
  },
  watch: { // 监视属性
    isLow: {
      // isLow 发送改变时调用 handler 方法
      handler(newVal, oldVal) {
        console.log("fullname was changed");
        console.log("isLow 属性被修改", newVal, oldVal);
      },
      immediate: false // 初始化时，让 handler 方法执行一下。
    },
    fullName: {
      handler(newVal, oldVal) {
        console.log("fullName 属性被修改", newVal, oldVal);
      },
      immediate: false
    }
  }
});

vm.$watch('name', {
  handler(newVal, oldVal) {
    console.log("name 属性被修改", newVal, oldVal);
  },
  immediate: false
});
```

**深度监视**

> 添加 deep: true 选项，可以深度监视对象的属性。

```
  const vm = new Vue({
    el: "#app",
    data() {
      return {
        person: {
          name: 'wangzhiyuan',
          age: 18
        }
      }
    },
    computed: {},
    watch: {
      person: {
        handler(newVal, oldVal) {
          // 这里 newVal 与 oldVal 是同一个对象
          console.log('person 变化了', 'newVal:', newVal, 'oldVal:', oldVal);
          console.log(newVal === oldVal); // true
        },
        deep: true,  // 开启深度监视
        immediate: false
      }
    }
  });
```

**监视属性的简写**

当监视属性只有 handler 方法的时候可以简写。

```
const vm = new Vue({
  el: "#app",
  data() {
    return {
      count: 0,
      person: {
        name: 'wangzhiyuan',
        age: 18
      }
    }
  },
  computed: {},
  watch: {
    count(newVal, oldVal) {
      console.log('count:', newVal, oldVal);
    }
  }
});
```

### 计算属性与监视属性的区别

1. computed 、watch 都能实现的就使用 computed 来实现。
2. watch 可以实现异步操作，computed 不可以。watch 适合开销大的操作。
3. watch 可以监视多个属性（**需要Vue3**），computed 只能监视一个属性。
4. computed 会进行缓存数据，watch 不可以。

### 绑定样式

1. `:clss='xxxx'` 适用于样式的类名不确定，需要动态指定。
2. `:class='arr'` 适用于要绑定的样式个数不确定，名字也不确定。
3. `:class='arr'` 适用于要绑定的样式个数确定，名字也确定，用不用不确定。

```
<div class="basic" :class="status" @click="changeStatus"> {{ name }} </div>
<div class="basic" :class="arr" @click="changeStatus"> {{ name }} </div>
<div class="basic" :class="classObj" @click="changeStatus"> {{ name }} </div>

{
  name: "wangzhy.com",
  status: "",
  arr:["c1","c2","c3"],
  classObj:{
    c1:true,
    c2:false,
    c3:true
  }
}
```

### 条件渲染

- `v-show=""`：通过控制 display 属性控制元素的显示与隐藏。
- `v-if=""`、`v-else-if`、`v-else`：通过 DOM 元素的增删来实现显示与隐藏。

注意：

1. `v-if` 可以用在 `template` 标签里面，但是 `v-show` 不行。
2. `v-if` 适用于切换频率较低场景，`v-show` 适合切换频率高的场景。
3. `v-if` 的元素有时可能会获取不到，因为元素不存在。

### 列表渲染

`v-for="(p,index) of persons" :key="p.id`

key 的作用：

遍历的流程

1. 根据初始数据生成虚拟 DOM
2. 将虚拟 DOM 转为真实 DOM
3. 假设有一个 input 输入框，用户的在这个 input 组件里面的输入是存放在真实 DOM 里面的
4. 初始数据发送变化
5. 根据新的数据生成虚拟 DOM
6. 对比两个虚拟 DOM （**diff算法**）， 对比的时候依赖的是 key。
    - 根据key 获取到虚拟 DOM 元素
    - 对比获取到的虚拟 DOM 元素
    - 如果发现某一部分存在差异，就对这个差异部分重新生成一个新的真实 DOM，并且复用没有差异的部分。

![](https://raw.githubusercontent.com/iwangzhy/picgo/master/20240430102333.png)

### 简单案例

> 根据输入框过滤，并且按照指定条件排序。

使用方法和计算属性都可以完成，但是**建议使用计算属性**。

```
<div id="app">
  <input v-model="keyWord"/>
  <button @click.once="sort = 1">年龄升序</button>
  <button @click.once="sort = 2">年龄降序</button>
  <button @click.once="sort = 3">年龄原序</button>
  <ul>
    <li v-for="(p,index) of filPersons" :key="p.id">
      {{p.name}} - {{ p.age }} - {{ p.id }}
    </li>
  </ul>
</div>

const vm = new Vue({
el: "#app",
data() {
  return {
    keyWord: '',
    sort: '3', // 1 升序、2 降序、3 原序
    persons: [
      {
        id: 1,
        name: '马冬梅',
        age: 18
      },
      {
        id: 2,
        name: '周冬雨',
        age: 22
      },
      {
        id: 3,
        name: '周杰伦',
        age: 20
      },
      {
        id: 4,
        name: '温兆伦',
        age: 21
      }
    ]
  }
},
methods: {
  // sort(value) { // 1 升序、2 降序、3 原序
  //   this.persons.sort((a, b) => {
  //     return value === 1 ? a.age - b.age :
  //         value === 2 ? b.age - a.age :
  //             a.id - b.id;
  //   });
  // }
},
computed: {
  filPersons() {
    debugger;
    const arr = this.persons.filter(p => p.name.indexOf(this.keyWord) !== -1);
    return arr.sort((a, b) => {
      return this.sort === 1 ? a.age - b.age :
          this.sort === 2 ? b.age - a.age :
              a.id - b.id;
    });
  }
},
watch: {}
});
```

### Vue 监测数据的改变原理



