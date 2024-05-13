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

### 生命周期

![](https://raw.githubusercontent.com/iwangzhy/picgo/master/20240506124325.png)

见[Vue 的生命周期](#Vue 的生命周期)

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

两个组件共享一个配置（配置是一样的，可以是属性，方法等）。

mixin 定义的配置的优先级**低于**组件里面的配置的优先级。 (**生命周期函数都会执行。**)

**定义 mixin**

新建一个 js 文件

```
export const mixin = {
  data() {
    return {
      x: 100,
      y: 100
    }
  },
  methods: {
    showName() {
      alert(this.name);
    }
  },
  beforeCreate() {
    console.log('mixin beforeCreate');
  },
  mounted() {
    console.log('mixin mounted');
  }
}
```

**使用 mixin**

1. 全局混入

在 main.js 加入以下配置。

> 所有的 VC 都会应用这个 mixin

```
import {mixin} from '@/mixin/mixin'

// 所有的 VC 都是应用这个 mixin
Vue.mixin(mixin);
```

2. 局部混入

在想要混入的组件里面加入下面的配置。

> mixins 必须是数组类型

```
// 引入一个混入对象
import {mixin} from '../mixin/mixin'

export default {
  name: "School",
  mixins: [mixin]  // 注意：必须是数组
}
```

### 插件

用于增强 Vue .

**定义插件**

新建一个 plugins.js 文件. 文件名可自定义.

```
export default {
  install(Vue) {
    console.log('@@@install', Vue)
    // 1. 过滤器
    Vue.filter('mySlice', function (val) {
      return val.slice(0, 4);
    });
    // 2. 自定义指令
    Vue.directive('fbind', {
      // 指令与元素成功绑定
      bind(element, binding) {
        console.log("bind");
        element.innerHTML = binding.value;
      },
      // 指令所在元素被插入页面时
      inserted(element, binding) {
        console.log("inserted");
        element.focus();
      },
      // 指令所在的模板被重新解析时
      update(element, binding) {
        console.log("update");
        element.innerHTML = binding.value;
        element.focus();
      }
    });
    // 3. 全局 mixin
    Vue.mixin({
      data() {
        return {
          x: 100,
          y: 200
        }
      },
    });
    // 4. 给 Vue 原型上添加方法 (vm vc 都能使用)
    Vue.prototype.hello = () => {
      console.log('hello');
    }
  }
}
```

**使用插件**

main.js 中增加下面代码即可引入定义的插件.

```
// 引入插件
import plugins from "@/plugins/plugins";
// 使用插件
Vue.use(plugins);
```

### scoped 样式

解决不同的 Vue 文件中相同的类名样式选择器.

### 组件化编码流程

1. 实现静态组件:抽取组件,使用组件实现静态页面效果.

- 如果起名很困难,需要考虑下是不是拆分有问题
- 组件按照功能点拆分,命名不要与 html 元素有冲突

2. 展示动态数据

- 数据的类型 名称是什么?
- 数据保存在哪个组件?
  - 一个组件用,放在组件内
  - 多个组件使用,放在它们共同的父组件中

3. 交互--从绑定事件监听开始

**props 适用于:**

1. 父组件 ===> 子组件
2. 子组件 ===> 父组件 (要求父组件先给子组件一个函数)

props 传过来的若是对象类型的值,修改对象中的属性时 Vue 不会报错,但是不推荐.

**v-model**

使用 v-model 时要切记,v-model 绑定的值不能是 props 传递过来的值.

### 浏览器本地存储

- localStorage: 关闭浏览器不丢失数据(无限期,直到手动删除)
  - setItem(key, value)
  - getItem(key)
  - removeItem(key)
  - clear()
- sessionStorage: 关闭浏览器后丢失数据
  - setItem(key, value)
  - getItem(key)
  - removeItem(key)
  - clear()

### 组件自定义事件

**绑定自定义事件**

1. 使用 `v-on:xxx` + `$emit`

```
<Student v-on:wangzhy="getStudentName"/>
<Student @wangzhy="getStudentName"/>

// Student 组件内
methods:{
  sendStudentName(){
    // 触发 Student 组件身上绑定的 wangzhy 事件.
    this.$emit('wangzhy', this.name);
  }
}

```

2. 使用 `ref` + `$refs`

```
<Student ref="student"/>

// 引用 Student 的组件内(即父组件)
mounted() {
  // 绑定自定义事件
  // this.$refs.student.$on('wangzhy', this.getStudentName); // 推荐写法
  // this.$refs.student.$on('wangzhy', function (name, ...params) {
  //   console.log(this); // 触发自定义事件的 VC 对象. 此处为 Student .
  //   this.studentName = name;
  // });
  this.$refs.student.$on('wangzhy', (name, ...params) => {
    console.log(this); // 如果将函数改成箭头函数, this 为当前组件的对象, 此处为 App .
    this.studentName = name;
  });
  // this.$refs.student.$once('wangzhy', this.getStudentName);
}
```

**解绑自定义事件**

> 谁绑定的谁解绑.

destroy 之后,自定义事件也会被解绑.

```
methods: {
  sendStudentName() {
    // 触发 Student 组件身上绑定的 wangzhy 事件.
    this.$emit('wangzhy', this.name);
  },
  unbindSendStudentName() {
    // 解绑单个自定义事件
    this.$off('wangzhy');
    // 解绑多个自定义事件
    // this.$off(['wangzhy','wangzhy1']);
    // 解绑所有自定义事件
    this.$off();
  }
}
```

**总结**

1. 一种组件之间通信的方式,适用于:`子组件 ==> 父组件`
2. 使用场景: A 是父组件,B 是子组件,B 想给 A 传数据,那么就需要在 A 中给 B 绑定自定义事件(事件的回调在
   A 中) **通过事件的参数将数据从子组件传递给父组件**
3. 绑定自定义事件: `v-on:xxx` + `$emit` 或 `ref` + `$on`
4. 触发自定义事件: `this.$emit('xxx',params)`
5. 解绑自定义事件: `this.$off('xxx')` 或 `this.$off()`(解绑所有自定义事件)
6. 如果想要在组件上使用原生的事件,需要加上 `.native` 修饰符.例如 `@click.native="xxx"`
7. 使用 `this.$refs.on('xxx',callback)` 绑定自定义事件时, **`callback` 要么在 `methods`
   中配置,要么使用`箭头函数`.** 否则函数的 `this` 会有问题.

### 全局事件总线

任意组件间通信。

> 一般用于孙子组件向父组件传递数据（至少隔一个层级）

1. 所有人都能看到

- windows 对象
- vc 对象
- vm 对象(**使用这个**)

2. 可以使用 `$on` `$off` `$emit`

```
new Vue({
  // 将 App 组件放入容器中
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this;
  }
}).$mount('#app');
```

### 消息订阅与发布 **pubsub.js**

```
npm install -g pubsub-js
```

1. 订阅消息（需要数据的组件）

```
import pubsub from 'pubsub-js';

mounted() {
  this.pubId = pubsub.subscribe('hello', (msgName, msg) => {
    console.log(this);
    console.log('School 接收到了订阅的消息', msgName, msg);
  });
},
beforeDestroy() {
  pubsub.unsubscribe(this.pubId);
}
```

2. 发布消息（拥有消息的组件）

```
import pubsub from 'pubsub-js';

methods: {
  sendStudentName() {
    pubsub.publish('hello', this.name);
  }
}
```

### $set

https://v2.cn.vuejs.org/v2/api/#Vue-set

向响应式对象中添加一个 `property`，并确保这个新 `property` 同样是响应式的，且触发视图更新。
它必须用于向响应式对象上添加新 `property`，因为 `Vue` 无法探测普通的新增 `property`
(比如 `this.myObject.newProperty = 'hi'`)

**在使用 $set 之前需要通过 obj.hasOwnProperty('newProperty') 来判断一下是否 obj 对象是否已有这个属性
**

### $refs + ref

https://v2.cn.vuejs.org/v2/api/#vm-refs

https://v2.cn.vuejs.org/v2/api/#ref

https://v2.cn.vuejs.org/v2/guide/components-edge-cases.html#%E8%AE%BF%E9%97%AE%E5%AD%90%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B%E6%88%96%E5%AD%90%E5%85%83%E7%B4%A0

### $nextTick

`$nextTick` 指定的回调函数会在 DOM 节点更新完毕之后再执行。

使用场景：当改变数据后，要基于更新后的新 DOM 进行某些操作时，要在 `$nextTick` 的回调函数中执行。

### 过渡与动画

> 在插入、更新或移除 DOM 元素时，在合适的时候给元素添加样式类名。

```
<transition appear>
  <h2 v-show="isShow">hello, {{ name }} !!!</h2>
</transition>
```

```css
.v-enter-active {
  animation: hello 1s;
}

.v-leave-active {
  animation: hello 1s reverse;
}

@keyframes hello {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0px);
  }
}
```

1. 元素进入的样式

- `v-enter`：进入的起点
- `v-enter-active`：进入的过程中
- `v-enter-to`：进入的终点

2. 元素离开的样式

- `v-leave`：离开的起点
- `v-leave-active`：离开过程中
- `v-leave-to`：离开的终点

**第三方组件 `animate.css`**

https://animate.style/

- 安装

```
npm install animate.css
```

- 使用时不需要自己写动画的样式了，直接引入 `class` 即可。

```
// 直接引入 css 样式
import 'animate.css';

<transition-group
    name="animate__animated animate__bounce"
    enter-active-class="animate__swing"
    leave-active-class="animate__backOutUp"
    appear>
  <h2 class="hello" v-show="!isShow" key="1">hello1, {{ name }} !!!</h2>
  <h2 class="hello" v-show="isShow" key="2">hello2, {{ name }} !!!</h2>
</transition-group>
```

### ajax 请求

1. `xhr`
2. `jQuery`： `$.get` `$.post`
3. `axios` **推荐**
4. `fetch`  2 层 Promise、兼容性稍差。
5. `vue-resource` 不再维护，不推荐。

**Vue-CLI**

配置代理服务器。修改 `vue.config.js`

https://cli.vuejs.org/zh/config/#devserver-proxy

- **配置1**

缺点：

1. 只能配置 1 个代理服务器
2. 不能控制请求是否走代理

```
devServer: {
  proxy: 'http://localhost:5000'
}
```

- **配置2**

```
devServer: {
  proxy: {
    '/wangzhy': {
      target: 'https://wangzhy.com',
      ws: true, // websocket
      changeOrigin: true,
      pathRewrite: {'^/wangzhy': ''} // 把请求的 "/wangzhy" 去掉
    }
  }
}
```

### 插槽 slot

1. **默认插槽**

在子组件中使用 `<slot/>` 或者 `<slot>默认值...</slot>` 定义一个插槽。

```
<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot/>
  </div>
</template>
```

在父组件中向插槽填充数据。

```
<template>
  <div class="container">
    <Category title="美食">
      <img :src="foods" alt="美食">
    </Category>
    <Category title="游戏">
      <ul>
        <li v-for="(i,index) in games" :key="index">{{ i }}</li>
      </ul>
    </Category>
    <Category title="电影">
      <video :src="films" controls/>
    </Category>
  </div>
</template>
```

2. **具名插槽**

```
<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot name="center">默认值1</slot>
    <hr/>
    <slot name="footer">默认值2</slot>
  </div>
</template>
```

使用时，如果要将多个 DOM 放入插槽有三种写法

1. 每个 DOM 加上 `slot="xxx"`
2. 使用 `template` 标签，`template` 标签上加上 `slot="xxx"`，`template` 标签里面放入多个 DOM。
3. 使用 `template` 标签，`template` 标签上加上 `v-slot:xxx`，`template` 标签里面放入多个 DOM。

```
<template>
  <div class="container">
    <Category title="美食">
      <img slot="center" :src="foods" alt="美食">
      <a slot="footer" href="https://baidu.com">更多美食...</a>
    </Category>
    <Category title="游戏">
      <ul slot="center">
        <li v-for="(i,index) in games" :key="index">{{ i }}</li>
      </ul>
      <template slot="footer">
        <a href="https://baidu.com">更多游戏1...</a>
        <a href="https://baidu.com">更多游戏2...</a>
      </template>
    </Category>
    <Category title="电影">
      <video slot="center" :src="films" controls/>
      <template v-slot:footer>
        <a href="https://baidu.com">更多电影1...</a>
        <a href="https://baidu.com">更多电影2...</a>
      </template>
    </Category>
  </div>
</template>
```

3. **作用域插槽**

数据在定义插槽的组件里面,**数据的展示是由使用插槽的组件决定的**。

```
<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot :games="games">默认值1</slot>
  </div>
</template>
```

在使用插槽时(**必须使用template标签**)，通过 `scope="xxx"`、`v-slot="xxx"`、`v-slot="{xxx}"` 来接收数据。

```
<template>
  <div class="container">
    <Category title="游戏">
      <template scope="games">
        <ol>
          <li v-for="(i,index) in games.games" :key="index">{{ i }}</li>
        </ol>
      </template>
    </Category>
    <Category title="游戏">
      <template v-slot="games">
        <ol>
          <li v-for="(i,index) in games.games" :key="index">{{ i }}</li>
        </ol>
      </template>
    </Category>
    <Category title="游戏">
      <template v-slot="{games}">
        <h4 v-for="(i,index) in games" :key="index">{{ i }}</h4>
      </template>
    </Category>
  </div>
</template>
```

### vuex

在 Vue 中实现集中式状态管理的一个 Vue 插件，对 Vue 应用中**多个组件的共享**状态进行集中式的管理，也是一种
**组件间通信**的方式，且适用于任意组件间通信。

使用场景

1. 多个组件依赖于同一个状态
2. 来自不同组件的行为需要变更同一个状态

```
npm i vuex@3
```

`src/store/index.js`

```
// 该文件用于创建 Vuex 中最核心的 store 对象
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 准备 actions --- 用于响应组件中的动作
const actions = {};

// 准备 mutations --- 用于操作数据（state）
const mutations = {};

// 准备 state --- 用于存储数据
const state = {};

// 创建 store
const store = new Vuex.Store({
  actions, mutations, state
});

// 导出 store
export default store;
```

#### Vuex 使用技巧

首先数据是定义在 `index.js` 的 `state` 里面的。

1. **获取 state 中的数据**

在需要获取数据的组件中顶一个计算属性，在这个计算属性里面获取 `state` 中的数据。

- **方法一**；通过 `this.$store.state.xxx` 获取数据。

```
export default {
  name: "Person",
  computed: {
    personList(){
      return this.$store.state.personList;
    }
  }
}
```

- **方法二**：通过 `Vuex` 提供的 `mapState` 辅助函数来获取数据。

```
import {mapState} from "vuex";

export default {
  name: "Person",
  computed: {
    ...mapState(['personList'])
  }
}
```

### 路由 **vue-router 插件**

- 路由就是一组 key-value 的对应关系
  - key：**路径**
  - value：**函数或者组件**
- 多个路由，需要经过路由器的管理

SPA：单页面应用。

1. 单页 web 应用
2. 整个应用只有一个完整的页面
3. 点击页面中的导航连接不会刷新页面，只会做页面的局部更新
4. 数据需要通过 ajax 请求获取

#### 在 `Vue2` 中安装 `vue-router` 插件

```
npm i vue-router@3
```

新建一个 router/index.js 文件。用于 **创建整个应用的路由器**

```
import VueRouter from "vue-router";
import Home from "@/components/router/Home.vue";
import About from "@/components/router/About.vue";

// 暴露路由器
export default new VueRouter({
  routes: [
    {
      path: "/home",
      component: Home
    },
    {
      path: "/about",
      component: About
    }
  ]
});
```

在 `main.js` 加入下面的配置。

```
import VueRouter from "vue-router";

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router: roueter
}).$mount('#app');
```

使用 `router-link` 标签实现路由的切换。

```
<router-link to="/about">about</router-link>
```

使用 `router-view` 标签来指定呈现时的位置。

```
<router-view></router-view>
```

#### 路由组件与一般组件

- 路由组件，存放到 `src/pages` 里面
- 一般组件，存放到 `src/components` 里面

切换走的路由组件是被销毁了的，通过 beforeDestroy 钩子函数可以观察到。

每个组件都有自己的 `$route` 对象。

整个应用只有一个 router 对象，通过 `$router` 获取。

#### 嵌套路由/多级路由

嵌套路由的配置：

```
// 创建整个应用的路由器

import VueRouter from "vue-router";
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import News from "@/pages/News.vue";
import Message from "@/pages/Message.vue";

// 暴露路由器
export default new VueRouter({
  routes: [
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "news", // 注意：此处不要写成 /news
          component: News
        },
        {
          path: "message",
          component: Message
        }]
    },
    {
      path: "/about",
      component: About
    }
  ]
});
```

使用时要写完整的路径

```
<router-link to="/home/news">news</router-link>
```

#### 路由传参

**query参数**

路由配置 query 参数：

- 字符串写法

```
<router-link :to="`/home/message/detail?id=${i.id}&title=${i.title}`">
  {{ i.title }}
</router-link>
```

- 对象写法

```
<router-link :to="{
  path: '/home/message/detail',
  query: {
    id: i.id,
    title: i.title
  }
}">
  {{ i.title }}
</router-link>
```

组件通过 `$route.query`接收 `query` 参数

```
<template>
  <ul>
    <li>消息编号：{{ $route.query.id}}</li>
    <li>消息标题：{{ $route.query.title}}</li>
  </ul>
</template>
```

**命名路由**

在配置路的时候，添加 `name` 属性。

```
// 暴露路由器
export default new VueRouter({
  routes: [
    {
      name : 'home',
      path: "/home",
      component: Home
    }
  ]
});
```

使用的时候要使用 `to` 的**对象写法**。

```
<router-link :to="{name: 'home'}">
  {{ i.title }}
</router-link>
```

**params 参数**

路由配置 params 参数

```
{
  path: "message",
  component: Message,
  children:[
    {
      name:'detail',
      path: "detail/:id/:title",  // 在这里配置 params 参数 
      component: Detail
    }
  ]
}
```

在组件中通过 `$route.params` 接收参数。

```
<ul>
  <li>消息编号：{{ $route.params.id}}</li>
  <li>消息标题：{{ $route.params.title}}</li>
</ul>
```

配置路由请求

```
<router-link :to="`/home/message/detail/${i.id}/${i.title}`">
  {{ i.title }}
</router-link>
```

在使用对象写法时，不能使用 path ，**必须使用 name**

```
<router-link :to="{
  name:'detail',  // 不能使用 path ，必须使用 name 
  params:{
    id: i.id,
    title: i.title
  }
}">
  {{ i.title }}
</router-link>
```

**props配置**

- 对象
- 布尔
- 函数

```
{
  path: "message",
  component: Message,
  children: [
    {
      name: 'detail',
      path: "detail/:id/:title",
      component: Detail,
      // 第一种写法：对象，该对象中的属性都会以 props 的形式传递给 Detail 组件
      // props:{
      //   a:'1',
      //   b:'2'
      // }
      // 第二种写法：值为布尔值，若为 true，则会把该路由组件收到的所有 params 参数以 props 的形式传递给 Detail 组件
      // props:true
      // 第三种写法：值为函数，该函数接收当前路由对象作为参数，返回一个对象，该对象中的属性都会以 props 的形式传递给 Detail 组件
      props({params:{id,title}}) {
        return {
          id, title
        }
      }
    }
  ]
}
```

#### 浏览器的历史记录

- push（默认）
- replace ： 在 `router-link` 标签添加 `replace` 属性

```
<router-link :to="{
  name:'detail',
  params:{
    id: i.id,
    title: i.title
  }
}" replace>
  {{ i.title }}
</router-link>
```

#### 编程式路由

```
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
```

#### 缓存路由组件

使用 `keep-alive` 标签来缓存路由组件,`include` 属性指定要缓存的路由组件的**组件名（name属性）**。

缓存单个组件

```
<keep-alive include="News">
  <router-view></router-view>
</keep-alive>
```

缓存多个组件

```
<keep-alive :include="['News','Message']">
  <router-view></router-view>
</keep-alive>
```

#### 路由的生命周期函数/钩子

> 注意：activated、deactivated 需要搭配 keep-alive 标签使用。

- activated：路由组件放入缓存的时候执行
- deactivated：路由组件从缓存取出的时候执行

```
export default {
  name: "News",
  activated() {
    console.log('News activated')
  },
  deactivated() {
    console.log('News deactivated')
  }
}
```

#### 路由守卫（权限管理）

保护路由的安全。

**全局前置路由守卫**

```
// 每一次路由切换之前都会执行此回调函数 (全局前置路由守卫)
router.beforeEach((to, from, next) => {
  console.log('beforeEach');
  console.log('to', to);
  console.log('from', from);
  if (localStorage.getItem('name') === 'wangzhy') {
    // 放行
    next();
  }
});
```

**全局后置路由守卫**

```
// 全局后置路由守卫
router.afterEach((to, from) => {
  console.log('afterEach');
  console.log('afterEach-to', to);
  console.log('afterEach-from', from);
  document.title = to.name|| 'vue';
});
```

**独享路由守卫**

只有独享前置路由守卫，没有独享后置路由守卫。

```
 {
  name: 'news',
  path: "news", // 注意：此处不要写成 /news
  component: News,
  meta: {
    isAuth: true,
    title:'新闻'
  },
  beforeEnter(to, from, next) {  // 独享路由守卫
    console.log('beforeEnter');
    console.log('beforeEnter-to', to);
    console.log('beforeEnter-from', from);
    if (localStorage.getItem('name') === 'wangzhy') {
      next();
    }
  }
}
```

**组件路由守卫**

```
// 通过路由规则进入该组件时被调用
beforeRouteEnter(to, from, next) {
  console.log("About beforeRouteEnter");
  next();
},
// 通过路由规则，离开该组件时被调用
beforeRouteLeave(to, from, next) {
  console.log("About beforeRouteLeave");
  next();
}
```

#### history 模式与 hash 模式

- hash 模式：**默认模式**，路径带有 `#` 号, `#` 号后面的内容不会发送给后端服务器。
- history 模式：路径不带 `#` 号
  - 部署之后，访问，刷新会出现 404 （后端可解决这个问题）
    - Java ： 通过 SpringBoot 的 `@RequestMapping` 注解来匹配所有的"前端路由"
    - Tomcat：通过配置 `web.xml` 文件来匹配所有的"前端路由"
    - URL Rewrite：通过配置 `rewrite.config` 文件来匹配所有的"前端路由"
    - Node.js：通过配置 `express` 服务器来匹配所有的"前端路由"

```
// 创建整个应用的路由器
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: "/home",
      component: Home
    },
    {
      path: "/about",
      component: About
    }
  ]
});
```

### Element UI

https://element.eleme.cn/2.15/#/zh-CN/component/installation

```
npm i element-ui
```

全部引入

```
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```

按需引入

```
npm install babel-plugin-component -D
```

```
import { Button, Select,DatePicker } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(DatePicker.name, DatePicker);
```

## 组件通信方式

https://www.bilibili.com/video/BV1Xh411V7b5/?spm_id_from=333.788.video.desc.click

- props
- custom event
- event bus
- v-model
- useAttrs
- ref、$parent
- provide-inject
- pubsub
- vuex、pinia
- slot

### props

> props 传递的数据是**单向、只读**的。
> - 单向的意思是：父组件数据变化，子组件数据也会变化。
> - 只读的意思是：子组件不允许修改 props 数据。

- **父传子**

通过直接在子组件的标签里面写属性的方式向子组件中传递 `props` 数据。例如下面代码的 `name`、`age` 属性。

```
<Child name="xxxx" :age="xxx"></Child>
```

在子组件中接收父组件传递过来的 `props` 参数。

```
// Vue 3.0 中使用 `defineProps` 来定义 `props`。
let props = defineProps(['name','age']);
```

- **子传父**
- **兄弟组件通信**

### 自定义事件

> 自定义事件实现的是子组件通过 `$emit` 调用父组件定义的事件向父组件传递数据。

**原生 DOM 事件**

> 原生 DOM 事件是直接在 HTML 元素上触发的事件，如点击、输入等。

了解下**原生事件** `@click`。在使用原生事件方法里面，
如果要使用到 `event` 对象，需要在方法调用时加上
`$event`，同时需要参数去接收。

- Vue2 中，如果指定为原生事件，需要在事件名后面加上 `@click.native=xxx(p1,p2)` 修饰符。
- Vue3 中，不需要加 `.native` 修饰符，改成 `@click="$emit('xxx','p1','p2')"`

```
<button @click="handler1(1,2,3,$event)">原生事件</button>

const handler1 = (a,b,c,$event)=>{
   console.log(a,b,c,$event)
}
```

**自定义事件**

定义自定义事件：直接定义一个方法。
给子组件绑定自定义事件：在子组件的标签上使用 `v-on:xxx` 或者 `@xxx` 来绑定自定义事件。
子组件触发自定义事件：在子组件的方法中使用 `$emit` 来触发自定义事件。

```
<Event2 @xxx="handler3" @click="handler4"></Event2>

const handler3 = (param1,param2)=>{
    console.log(param1,param2);
}
```

```
//利用defineEmits方法返回函数触发自定义事件
//defineEmits方法不需要引入直接使用
let $emit = defineEmits(['xxx','click']);

$emit('xxx','p1','p2');
```

### $bus

全局事件总线可以实现**任意组件通信**。

**Vue2 引入 $bus**

main.js

```
import Vue from 'vue';
import App from './App.vue';

new Vue({
  // 将 App 组件放入容器中
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this;
  }
}).$mount('#app');
```

**Vue3 引入 $bus**

Vue3 通过 mitt 组件实现全局事件总线。

src/bus/index.js

```
import mitt from 'mitt';
const $bus = mitt();
export default $bus;
```

#### 绑定事件

事件一般是在 `onMounted` 生命周期函数里面绑定的。

Vue3 写法

```
import $bus from "../../bus";
//组合式API函数
import { onMounted } from "vue";
//组件挂载完毕的时候,当前组件绑定一个事件,接受将来兄弟组件传递的数据
onMounted(() => {
  //第一个参数:即为事件类型  第二个参数:即为事件回调
  $bus.on("car", (car) => {
    console.log(car);
  });
});
```

#### 触发事件

```
//引入$bus对象
import $bus from '../../bus';
//点击按钮回调
const handler = ()=>{
  $bus.emit('car',{car:"Ferrari"});
}
```

### v-model

`v-model` 一般用于收集表单数据，数据双向绑定。
`v-model` 也可用于组件标签上，实现组件间的数据双向绑定。

> v-model 组件身上使用 `<Child v-model="money"></Child>`
> 1. 相当有给子组件传递 `props[modelValue] = 10000`
> 2. 相当于给子组件绑定自定义事件 `update:modelValue`

父组件

```
<Child v-model="money"></Child>
<Child1 v-model:pageNo="pageNo" v-model:pageSize="pageSize"></Child1>
```

子组件1

```
const handler = ()=>{
   //触发自定义事件
   $emit('update:modelValue',props.modelValue+1000);
}
```

子组件2
```
<button @click="handler">pageNo{{ pageNo }}</button>
<button @click="$emit('update:pageSize', pageSize + 4)">
  pageSize{{ pageSize }}
</button>
    
let props = defineProps(["pageNo", "pageSize"]);
let $emit = defineEmits(["update:pageNo", "update:pageSize"]);
//第一个按钮的事件回调
const handler = () => {
  $emit("update:pageNo", props.pageNo + 3);
};    
```

### useAttrs

Vue3 提供的 `useAttrs` 方法，可以获取到父组件传递过来的所有属性。

```
// 引入useAttrs方法:获取组件标签身上属性与事件
import {useAttrs} from 'vue';
// 此方法执行会返回一个对象
let $attrs = useAttrs();

// 万一用props接受title
let props =defineProps(['title']);
// props与useAttrs方法都可以获取父组件传递过来的属性与属性值
// 但是props接受了useAttrs方法就获取不到了
console.log($attrs);
```

### ref、$parent

- `ref` 可以获取到真实 DOM 节点，以及子组件实例 VC。(需要子组件通过 `defineExpose` 暴露自己的属性。)
- `$parent` 可以在子组件内获取到父组件的实例 VC。(需要父组件通过 `defineExpose` 暴露自己的属性。)

### provide、inject

`Vue3` 提供 `provide`(提供)与 `inject`(注入),**可以实现隔辈组件传递数据**。

> **如果提供的数据是响应式的(ref 或 reactive) ，则数据是双向绑定的**

**祖先组件**

```
import { ref, provide } from "vue";
let car = ref("Ferrari");
//祖先组件给后代组件提供数据
// 第一个参数：提供的数据key
// 第二个参数：祖先组件提供数据
provide("TOKEN", car);
```

**孙子组件**

```
import {inject} from 'vue';
//注入祖先组件提供数据
//需要参数:即为祖先提供数据的key
let car = inject('TOKEN');
const updateCar = ()=>{
   car.value  = 'Bike';
}
```

### pubsub

发布订阅模式: `pubsub-js`。 **Vue2**

```
npm install -g pubsub-js
```

1. 订阅消息（需要数据的组件）

```
import pubsub from 'pubsub-js';

mounted() {
  this.pubId = pubsub.subscribe('hello', (msgName, msg) => {
    console.log(this);
    console.log('School 接收到了订阅的消息', msgName, msg);
  });
},
beforeDestroy() {
  pubsub.unsubscribe(this.pubId);
}
```

2. 发布消息（拥有消息的组件）

```
import pubsub from 'pubsub-js';

methods: {
  sendStudentName() {
    pubsub.publish('hello', this.name);
  }
}
```

### vuex、pinia

1. **`Vuex`：集中状态管理容器**
- `state`：存储数据
- `mutations`：操作数据
- `actions`：响应组件中的动作
- `getters`：获取数据
- `modules`：模块化

2. **`Pinia`：Vue3 的状态管理库**
- `store`：存储数据
- `actions`：操作数据
- `getters`：获取数据

### slot

插槽：

- 默认插槽
- 具名插槽
- 作用域插槽：子组件可以将数据传给父组件。

## Vue 的生命周期

## Vue2
![](https://raw.githubusercontent.com/iwangzhy/picgo/master/生命周期.png)

1. `const vm = new Vue({})`：创建 Vue 对象
2. `Init Events & Lifecycle`：初始化生命周期、事件，此时**数据代理还未开始**。
3. `beforeCreate`：无法通过 vm 访问到 data 中的数据、methods 中的方法。
4. `Init Injections & Reactions`：**初始化数据监测、数据代理。**
5. `created`：**可以通过 vm 访问到 data 中的数据，methods 中配置的方法。**
6. 在内存中编译模板。 （**此阶段 Vue 开始解析模板，生成虚拟 DOM，页面还不能显示解析好的内容**）
   1. 判断有没有有 el 选项？ 
   2. 判断有没有 template 选项？
7. `beforeMount`：此时**页面呈现的是未经过 Vue 编译的 DOM 结构**。在此生命周期内对 DOM
   的操作，最终不会生效。（会被虚拟 DOM 生成的 DOM 结构覆盖）
8. `create vm.$el and replace 'el' with it`：将内存的虚拟 DOM 转为真实 DOM 并插入页面。
9. `mounted`：此时页面呈现的是经过 Vue 编译的DOM。在此生命周期函数内对 DOM 的操作均有效。
10. 至此初始化过程结束，一般在此进行：开启定时器、发送网络请求、订阅消息、绑定自定义事件等初始化操作。
11. `when data changes`：数据被修改
12. `beforeUpdate`：此时内存中的数据是新的，但是页面显示的数据是旧的。
13. `Virtual DOM re-render and patch`：根据新数据，生成新的虚拟 DOM，随后与旧的虚拟 DOM
    进行比较，最终完成页面更新，即完成了 Model-> View 的更新。
14. `updated`：此时**页面和数据都已经完成更新**，数据和页面保持同步。
15. `when vm.$destroy() is called`：调用 `vm.$destroy()` 方法
16. `beforeDestroy`：此时，vm 中所有的  `data`、`methods`
    、指令等都处于可用状态，马上要执行销毁过程，一般在此阶段：关闭定时器、取消订阅消息、解绑自定义事件等收尾操作。
17. `destroyed`：Vue 实例已经完全销毁。

### Vue3 

https://cn.vuejs.org/guide/essentials/lifecycle.html#registering-lifecycle-hooks

![](https://raw.githubusercontent.com/iwangzhy/picgo/master/20240513100954.png)

在 `Vue3` 中， `beforeCreate` 和 `created` 被 `setup` 替代。其余的生命周期函数名前加上 `on`。