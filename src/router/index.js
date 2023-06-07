import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/register/RegisterView.vue'
import Login from '../views/login/LoginView.vue'
//import Header from '@/components/HomePage/Header'
import HomeView from '@/views/HomePage/HomeView.vue'

Vue.use(VueRouter)

const routes = [
   /*导航栏跳转页面*/
  {
    path: '/',
    name: 'home',
    // component: () => import(/* webpackChunkName: "about" */ '../views/HomePage/HomeView.vue')
    component: HomeView,
    meta: { index: '' }
  },
  {
    path: '/homeHeader',
    name: 'homeHeader',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomePage/NewHeader.vue')
  },
 
  {
    path: '/creation',
    name: 'creation',
    component: () => import(/* webpackChunkName: "about" */ '../views/GuidePage/CreationView.vue'),
    meta: { index: 'creation' }
  },
  {
    path: '/message',
    name: 'message',
    component: () => import(/* webpackChunkName: "about" */ '../views/GuidePage/MessageView.vue'),
    meta: { index: 'message' }
  },
   /*视频播放页面*/
  {
    path: '/video/:id',/*注意这里*/
    name: 'video/',
    component: () => import(/* webpackChunkName: "about" */ '../views/VideoView.vue'),
    meta: { index: 'noShow'},
  },
  /*搜索页面*/
  {
    path:'/search',
    name:'search',
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchView.vue'),
    meta: { index: 'noShow'},
  },
  /*用户的个人主页页面*/
  {
    path: '/user/:id',/*注意这里*/
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/VideoView.vue')
  },
   /*分区的标签页面*/
   {
    path:'/life',
    name:'life',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/LifeView.vue')
  },
  {
    path:'/entertainment',
    name:'entertainment',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/EntertainmentView.vue')
  },
  {
    path:'/film',
    name:'film',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/FilmView.vue')
  },
  {
    path:'/game',
    name:'game',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/GameView.vue')
  },
  {
    path:'/sports',
    name:'sports',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/SportsView.vue')
  },
  {
    path:'/food',
    name:'food',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/FoodView.vue')
  },
  {
    path:'/technology',
    name:'technology',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/TechnologyView.vue')
  },
  {
    path:'/military',
    name:'military',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/MilitaryView.vue')
  },
  {
    path:'/music',
    name:'music',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/MusicView.vue')
  },
  {
    path:'/study',
    name:'study',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/StudyView.vue')
  },
  // {
  //   path: '/search_result',/*注意这里*/
  //   name: 'search_result',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/SearchResult.vue')
  // },
  /*Y 0517 第一次合并*/
  {
     path: '/register', 
    name: 'register',
    component: Register,
  },
  {
    path: '/login', 
    name: 'login',
    component: Login,
  },
  /*管理端页面*/
  /*投诉列表*/
  {
    path: '/admin/allVideo', 
    name: 'allVideo',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminPage/AllVideoView.vue'),
    meta: { index: 'admin',index2:'allVideo' },
  },
  {
    path: '/admin/complain', 
    name: 'complainList',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminPage/ComplainView.vue'),
    meta: { index: 'admin' ,index2: 'complain'},
  },
  {
    path: '/admin/check', 
    name: 'check',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminPage/CheckView.vue'),
    meta: { index: 'admin',index2: 'check'},
  },
  /* Person页面 */

  {
    path: '/person',
    name: 'person',
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonPage/PersonView.vue'),
    meta: { index: 'person' }
  },
  {
    path: '/person/myVideo',
    name: 'myVideo',
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonPage/myVideoView.vue')
  },
  {
    path: '/person/myChange',
    name: 'myChange',
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonPage/myChangeView.vue')
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonPage/collectView.vue')
  },
  {
    path: '/collect/:collect_id/:collect_name',
    name: 'collectVideo',
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonPage/collVideoView.vue')
  },
  {
    path: '/following',
    name: 'myFollow',
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonPage/myFollow.vue')
  },
  {
    path: '/followers',
    name: 'myFans',
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonPage/myFans.vue')
  },
  {
    path: '/notification',
    name: 'myNotify',
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonPage/myNotify.vue'),
    meta: { index: 'notification' }
  },
  /*别人的主页 */
  {
    path: '/lookPerson/:user_id',
    name: 'lookPerson',
    component: () => import(/* webpackChunkName: "about" */ '../views/OthersPage/lookPersonView.vue')
  },
  {
    path: '/othersCollect/:user_id',
    name: 'lookOthersCollect',
    component: () => import(/* webpackChunkName: "about" */ '../views/OthersPage/othersCollectView.vue')
  },
  {
    path: '/othersCollect/collectVideos/:user_id/:collect_id/:collect_name',
    name: 'lookOthersCollectVideo',
    component: () => import(/* webpackChunkName: "about" */ '../views/OthersPage/otherCollVideo.vue')
  },
  
  {
    path: '/myCreation',
    name: 'myCreation',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreationManagement/MyCreation.vue'),
    meta: { index: 'myCreation' }
  },
  {
    path: '/amendCreation/:id',
    name: 'amendCreation',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreationManagement/AmendCreation.vue')
  },
  {
    path: '/history',
    name: 'history',
    component: () => import(/* webpackChunkName: "about" */ '../views/GuidePage/HistoryView.vue'),
    meta: { index: 'history' }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
