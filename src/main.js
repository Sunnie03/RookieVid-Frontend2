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

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount } from '@mdi/js'
// import axios from 'axios';
// Vue.prototype.$axios = axios; //这样每个Vue文件内都可以直接使用



Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
