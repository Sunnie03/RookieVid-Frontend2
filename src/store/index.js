import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  //全局管理的数据存储
    isLogin: localStorage.getItem('isLogin') ? localStorage.getItem('isLogin'): false, 
    isAdmin: localStorage.getItem('isAdmin') ? localStorage.getItem('isAdmin'): false, 
    token: localStorage.getItem('token') ? localStorage.getItem('token'):'', //token
    nowUser: localStorage.getItem('nowUser') ? localStorage.getItem('nowUser'):'',

  },
  getters: {  //监听数据变化
    getStorage(state){  //获取本地存储的登录信息
      if(!state.token) {
        state.token = JSON.parse(localStorage.getItem(key))
      }
      return state.token
    },
    getIsLogin(state) {
      if(!state.isLogin) {
        state.isLogin = true
      } else{
        state.isLogin = false
      }
      return state.isLogin
    },
    getIsAdmin(state) {
      if(!state.isAdmin) {
        state.isAdmin = true
      } else {
        state.isAdmin = false
      }
      return state.isAdmin
    },
    getNowUser(state) {
      if(!state.nowUser) {
        state.nowUser = JSON.parse(localStorage.getItem(key))
      } 
      return state.nowUser
    }
  },
  mutations: {  //全局方法
    $_login(state) {
      state.isLogin = true;
      localStorage.setItem('isLogin', true);
    },
    $_logout(state) {
      localStorage.removeItem('isLogin');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('token');
    },
    $_logAdmin(state, value) {
      if(value == 1)  { //登录的是管理员
        state.isAdmin = true;
        localStorage.setItem('isAdmin', true);
      } else {  //是普通用户
        state.isAdmin = false;
        localStorage.setItem('isAdmin', false);
      }
    },
    $_setToken(state,value) { //设置存储token
      state.token = value;
      localStorage.setItem('token', value);
    },
    $_setNowUser(state,user_id) {
      state.nowUser = user_id;
      localStorage.setItem('nowUser', user_id)
    }
  },
  actions: {
  },
  modules: {
  }
})
