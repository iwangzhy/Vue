// 该文件用于创建 Vuex 中最核心的 store 对象
import Vue from 'vue';
import Vuex from 'vuex';
import {nanoid} from "nanoid";
import axios from "axios";

Vue.use(Vuex);

// count 配置
const countOptions = {
  namespaced: true,
  actions: {
    jia: function (context, value) {
      console.log('actions -> jia()', context, value);
      // commit 的时候，一般是大写
      context.commit('JIA', value);
    },
    jian(context, value) {
      context.commit('JIAN', value);
    },
    jianWhenOdd(context, value) {
      if (context.state.count % 2 !== 0) {
        context.commit('JIA', value);
      }
    },
    jianWait(context, value) {
      setTimeout(() => {
        context.commit('JIA', value);
      }, 500);
    }
  },
  mutations: {
    JIA: function (state, value) {
      state.count += value;
    },
    JIAN(state, value) {
      state.count -= value;
    },
  },
  state: {
    count: 0,
    name: 'wangzhy',
    blog: 'https://blog.wangzhy.com',
  },
  getters: {
    bigCount(state) {
      return state.count * 10;
    }
  }
};

// person 配置
const personOptions = {
  namespaced: true,
  actions: {
    addPersonWang(context, value) {
      if (value.name.indexOf('wang') === 0) {
        context.commit('ADD_PERSON', value);
      }
    },
    addRandomPerson(context, value) {
      axios.get('/lovelive/api/SweetNothings').then(
          response => {
            console.log(response)
            context.commit('ADD_PERSON',
                {id: nanoid(), name: response.data});
          }, error => {
            console.log('请求失败' + error.message);
          });
    }
  },
  mutations: {
    ADD_PERSON(state, value) {
      state.personList.unshift(value);
    }
  },
  state: {
    personList: [{id: '001', name: 'wangzhy'}]
  },
  getters: {
    firstPersonName(state) {
      return state.personList[0].name;
    }
  }
}

// 创建 store
const store = new Vuex.Store({
  modules: {
    countOptions: countOptions,
    personOptions: personOptions
  }
});

// 导出 store
export default store;

