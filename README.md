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

### 计算属性

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

数组需要调用下面的方法来修改数组的元素才可以响应式的修改： https://v2.cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B

- push
- pop
- shift
- unshift
- splice
- sort
- reverse

```
vm.student.hobby.splice === Array.prototype.splice;  // false 

vm.student.hobby.splice(0,1,'学习');
```

**Vue.set()**

https://v2.cn.vuejs.org/v2/api/#Vue-set

```
// Vue.set(vm._data.student,'sex','男');
// vm.$set(vm._data.student,'sex','女');

// Vue.set(vm.student,'sex','男');
// vm.$set(vm.student,'sex','女');
```

**总结**

> 1. Vue 会监视 data 中所有层次的数据。
> 2. 如何监测对象中的数据？
     > 通过 setter 实现监视，且要在 new Vue 时就传入要监测的数据。
> - 对象中后追加的属性，Vue 默认不做响应式处理
> - 如果给后添加的属性做响应式，可以使用 Vue.set() 或 vm.$set() 方法。
> 3. 如何监测数组中的数据？
     > 通过包裹数组更新元素的方法实现，本质就是做了两件事
> - 调用原生对应的方法对数组进行更新
> - 重新解析模板，进行页面更新
> 4. 在 Vue 修改数组中的某个元素一定要用以下方法
> - push、pop、shift、unshift、splice、sort、reverse
> - Vue.set、vm.$set
    > **特别注意：Vue.set()、vm.$set() 不能给 vm 或 vm 的根数据对象添加上属性！！！**

### 收集表单数据（v-model）

v-model 的三个修饰符

- lazy：失去焦点再收集数据
- number：输入字符串转为有效的数字
- trim：去除首尾空格

```
  <form @submit.prevent="submit">
    账号：
    <input type="text" v-model.trim="userInfo.account"><br><br>
    密码：
    <input type="password" v-model="userInfo.password"><br><br>
    年龄：
    <input v-model.number="userInfo.age"><br><br>
    性别：
    男<input type="radio" value="male" name="sex" v-model="userInfo.sex">
    女<input type="radio" value="female" name="sex" v-model="userInfo.sex">
    <br><br>
    爱好：
    <input type="checkbox" value="抽烟" name="hobby" v-model="userInfo.hobby">抽烟
    <input type="checkbox" value="喝酒" name="hobby" v-model="userInfo.hobby">喝酒
    <input type="checkbox" value="烫头" name="hobby" v-model="userInfo.hobby">烫头
    <br><br>
    所属校区
    <select v-model="userInfo.city">
      <option value="北京">北京</option>
      <option value="上海">上海</option>
      <option value="广州">广州</option>
      <option value="深圳">深圳</option>
    </select>
    <br><br>
    其他信息：
    <textarea v-model.lazy="userInfo.others"></textarea>
    <br><br>
    <input v-model="userInfo.agree" type="checkbox">阅读并接收<a href="#">用户协议</a>
    <br><br>
    <button>提交</button>
  </form>
```

### 过滤器

过滤器是 Vue 提供的一种可以在模板中使用的函数，用于对数据进行处理。

**过滤器并不修改原始数据！！!**

- 全局过滤器 `Vue.filter('name',function(){...});`
- 局部过滤器

```
<div id="app">
  显示格式化后的时间:
  <ul>
    <li>计算属性：{{ formatTime }}</li>
    <li>方法：{{ getFormatTime() }}</li>
    <li>过滤器实现1：{{ time | timeFormatFilter1}}</li>
    <li>过滤器实现2：{{ time | timeFormatFilter2('YYYY-MM-DD')}}</li>
    <li>过滤器实现3：{{ time | timeFormatFilter2('YYYY-MM-DD') | mySlice }}</li>
  </ul>
</div>

<script type="text/javascript">
  Vue.filter('mySlice',function (val) {
    return val.slice(0,4);
  });

  const vm = new Vue({
    el: "#app",
    data: {
      time: 1714964260546
    },
    methods: {
      getFormatTime() {
        return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    computed: { // 通过计算属性实现
      formatTime() {
        return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    watch: {},
    filters: { // 局部过滤器，只能在当前 Vue 对象中使用
      timeFormatFilter1(time) {
        return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
      },
      timeFormatFilter2(time, str = 'YYYY-MM-DD HH:mm:ss') { // ES6 默认参数
        return dayjs(time).format(str);
      },
      mySlice(value) {
        return value.slice(0, 4);
      }
    }
  });
</script>
```

### 内置指令

- `v-text`：向其所在的节点中渲染文本内容。
- `v-html`：同 `v-text` 类似，但 `v-html` 可以解析 `html` 标签。**注意 XSS 攻击**
- `v-cloak`：解决插值表达式闪烁问题。搭配 CSS 可以解决网速慢时页面展示出现 `{{ name }}` 的问题。
- `v-once`：只渲染一次，后续数据变化不会再次渲染。可用于性能优化（值初始化后就不会变化）。
- `v-pre`：跳过所在节点的编译过程。
- `v-on`：绑定事件监听器。
- `v-bind`： 动态绑定一个或多个特性，或一个组件 prop。

### 自定义指令

自定义指令的调用时机

1. 指令与元素成功绑定时（一上来）。
2. 指令所在的模板被**重新解析**时。

自定义指令的 3 个回调

- bind
- inserted
- update

### 声明周期

![](https://raw.githubusercontent.com/iwangzhy/picgo/master/20240506124325.png)

- beforeCreate：实例初始化之后，数据观测和事件配置之前被调用。
- created：实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测(data observer)
  、属性和方法的运算、watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
- beforeMount：在挂载开始之前被调用：相关的 render 函数首次被调用。
- mounted：el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
- beforeUpdate：数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。
- updated：由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
- beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。
- destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑，所有的事件监听器会被移除，所有的子实例也会被销毁。

常用的生命周期函数

- mounted：发送 ajax 请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】
- beforeDestroy：清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】

关于销毁 Vue 实例

1. 销毁后借助 Vue 开发者工具看不到任何信息。
2. 销毁后自定义事件会失效，但原生 DOM 事件依然有效。
3. 一般不会在 beforeDestroy 操作数据，因为即使操作数据，也不会再触发更新数据了。

### 组件

1. 创建组件
2. 注册组件
3. 使用组件

**非单文件组件**

```
<div id="app">
  <!-- 使用组件 -->
  <school></school>
  <student></student>
  <hr/>
  <hello></hello>
  <hr/>
</div>

<script type="text/javascript">
  // 创建组件
  const school = Vue.extend({
    template: `
      <div>
        <h1>{{ name }}</h1>
        <p>{{ address }}</p>
      </div>
    `,
    data() {
      return {
        name: '清华大学',
        address: '北京市海淀区'
      }
    }
  });
  const student = Vue.extend({
    template: `
      <div>
        <p>{{ name }}</p>
        <p>{{ age }}</p>
      </div>
    `,
    data() {
      return {
        name: '张三',
        age: 18
      }
    }
  });
  // 全局注册 hello 组件
  const hello = Vue.extend({
    template: `
      <div>
        <p>hello wangzhy!!!</p>
      </div>
    `
  });

  Vue.component('hello', hello);

  const vm = new Vue({
    el: "#app",
    // 注册组件
    components: {
      school,
      student
    }
  });
</script>
```

### ref 属性

1. 用来给元素或者子组件注册引用信息
2. 在 html 标签上获取的是真实 DOM 元素,在标签上获取的是组件实例对象
3. 使用

- `<h1 ref="xxx">...</h1>` `<School ref="xxx"></School>`
- `this.$refs.xxx`

### **props**

把数据从**外部**传给组件。

**传参**

```
<Student name="李四" sex="female" :age="18"/>
```

**接收参数**

1. 简单接收 props

```
  props: [
    'name', 'sex', 'age'
  ]
```

2. 接收 props 并指定类型 (该收收，但是会在控制台输出错误信息。)

```
  props: {
    name: String,
    age: Number,
    sex: String
  }
```

3. 接收 props 并指定类型和默认值和是否必传

```
  props: {
    name: {
      type: String, // name 的类型是 String
      required: true // name 是必传的
    },
    age: {
      type: Number,
      default: 18 // age 的默认值是 18   (可传可不传)
    },
    sex: {
      type: String,
      required: true
    }
  }
```

> 注意：
> 1. props 接收的属性是不允许修改的（**只读**）。可以在 data 选项定义一个属性来接收 prop 属性。
> 2. key、ref 等属性是不会传递给子组件的。
> 3. props 接收的属性优先级是比在 data 选项中定义的属性优先级**高**的。

```
  data() {
    console.log(this);
    return {
      msg: '我是一个学生!!!',
      myName: this.name,
      myAge: this.age
    }
  },
```

### mixin 混入

