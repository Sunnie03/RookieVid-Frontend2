import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/register/RegisterView.vue'
import Login from '../views/login/LoginView.vue'
Vue.use(VueRouter)

const routes = [
   /*导航栏跳转页面*/
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomePage/HomeView.vue')
  },
  {
    path: '/creation',
    name: 'creation',
    component: () => import(/* webpackChunkName: "about" */ '../views/GuidePage/CreationView.vue')
  },
  {
    path: '/person',
    name: 'person',
    component: () => import(/* webpackChunkName: "about" */ '../views/GuidePage/PersonView.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import(/* webpackChunkName: "about" */ '../views/GuidePage/MessageView.vue')
  },
   /*其它页面*/
  {
    path: '/video/:id',/*注意这里*/
    name: 'video',
    component: () => import(/* webpackChunkName: "about" */ '../views/VideoView.vue')
  },
  {
    path:'/search',
    name:'search',
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchView.vue')
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
  /*Y 0517 第一次合并*/
  {
     path: '/register', 
    name: 'register',
    component: Register
  },
  {
    path: '/login', 
    name: 'login',
    component: Login
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
