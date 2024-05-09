// 创建整个应用的路由器

import VueRouter from "vue-router";
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import News from "@/pages/News.vue";
import Message from "@/pages/Message.vue";
import Detail from "@/pages/Detail.vue";

// 暴露路由器
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: "/home",
      component: Home,
      meta:{
        title:'主页'
      },
      children: [
        {
          name: 'news',
          path: "news", // 注意：此处不要写成 /news
          component: News,
          meta: {
            isAuth: true,
            title:'新闻'
          },
          beforeEnter(to, from, next) {
            console.log('beforeEnter');
            console.log('beforeEnter-to', to);
            console.log('beforeEnter-from', from);
            if (localStorage.getItem('name') === 'wangzhy') {
              next();
            }
          }
        },
        {
          name: 'message',
          path: "message",
          component: Message,
          children: [
            {
              name: 'detail',
              // path: "detail/:id/:title", // params 参数
              path: "detail",
              component: Detail,
              // 第一种写法：对象，该对象中的属性都会以 props 的形式传递给 Detail 组件
              // props:{
              //   a:'1',
              //   b:'2'
              // }
              // 第二种写法：值为布尔值，若为 true，则会把该路由组件收到的所有 params 参数以 props 的形式传递给 Detail 组件
              // props:true
              // 第三种写法：值为函数，该函数接收当前路由对象作为参数，返回一个对象，该对象中的属性都会以 props 的形式传递给 Detail 组件
              props({query: {id, title}}) {
                return {
                  id, title
                }
              }
            }
          ]
        }]
    },
    {
      name: 'about',
      path: "/about",
      component: About
    }
  ]
});

// 路由守卫
// 每一次路由切换之前都会执行此回调函数 (全局前置路由守卫)
router.beforeEach((to, from, next) => {
  console.log('beforeEach');
  console.log('beforeEach-to', to);
  console.log('beforeEach-from', from);
  if (to.meta.isAuth) {
    if (localStorage.getItem('name') === 'wangzhy') {
      next();
    }
  } else {
    next();
  }
});

// 全局后置路由守卫
router.afterEach((to, from) => {
  console.log('afterEach');
  console.log('afterEach-to', to);
  console.log('afterEach-from', from);
  document.title = to.name|| 'vue';
});

export default router;