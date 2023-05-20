import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vuetify from './plugins/vuetify'
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import axios from 'axios';

axios.defaults.baseURL='http://101.43.159.45:8000/api'
Vue.prototype.$http=axios;

// import SvgIcon from '@jamescoyle/vue-icon'
// import { mdiAccount } from '@mdi/js'
// import axios from 'axios';
// Vue.prototype.$axios = axios; //这样每个Vue文件内都可以直接使用



Vue.config.productionTip = false
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  if(to.matched.some(m => m.meta.requireAuth)) {  //需要登录
    if(window.localStorage.token && window.localStorage.isLogin === '1') {
      next()
    } else if(to.path !== '/login') {
      let token = window.localStorage.token;
      if(token === 'null' || token === '' || token === undefined) {
        next({path: '/login'})
        alert("您还未登录，请登录后操作！")
      }
    } else {
      next()
    }
  } else {  //不需要登录
    next()
  }
})

//添加请求拦截器
axios.interceptors.request.use(
  config => {
    var authorization = localStorage.getItem('token');
    if(authorization) {
      config.headers.authorization = authorization;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

//http response相应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if(error.response) {
      switch(error.response.status) {
        case 401:
          localStorage.removeItem('token');
          router.replace({
            path:'/views/login',
            query :{redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面

          })
      }
    }
  }
)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
