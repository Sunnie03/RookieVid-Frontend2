import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  //全局管理的数据存储
    isLogin: localStorage.getItem('isLogin') ,
    isAdmin: localStorage.getItem('isAdmin') , 
    token: localStorage.getItem('token') ? localStorage.getItem('token'):'', //token
  },
  getters: {  //监听数据变化
    getStorage(state){  //获取本地存储的登录信息
      if(!state.token) {
        state.token = JSON.parse(localStorage.getItem(key))
      }
      return state.token
    }
  },
  mutations: {  //全局方法
    login(state) {
      localStorage.setItem('isLogin', true);
    },
    logout(state) {
      localStorage.removeItem('isLogin');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('token');
    },
    logAdmin(state, value) {
      if(value == 1)  { //登录的是管理员
        localStorage.setItem('isAdmin', true);
      } else {  //是普通用户
        localStorage.setItem('isAdmin', false);
      }
    },
    $_setToken(state,value) { //设置存储token
      state.token = value;
      localStorage.setItem('token', value);
    },
  },
  actions: {
  },
  modules: {
  }
})
