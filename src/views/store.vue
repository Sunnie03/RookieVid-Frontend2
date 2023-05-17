<template>
  <div class="app">

    <!--主页最上方导航栏 链接-->
    <div class="head_guide">
      <!--logo图标-->
      <div class="logo">
        <img alt="web logo" src="./assets/web_logo.png" height="80px">
      </div>

      <!--搜索框-->
      <div class="search">
        <el-input placeholder="请输入内容" v-model="keyword">
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="search"></el-button>
      </div>

      <!--导航栏菜单-->
      <div class="guide_menu">
        <el-row type="flex" justify="end">
          <el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            active-text-color="#409EFF">

            <el-menu-item index="1"><router-link to="/">Home</router-link></el-menu-item>
            <el-submenu index="2">
              <template slot="title">个人中心</template>
              <el-menu-item index="2-1"><router-link to="/person">用户主页</router-link></el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3"><router-link to="/">创作中心</router-link></el-menu-item>
            <el-menu-item index="4"><router-link to="/">消息</router-link></el-menu-item>
          </el-menu>
        </el-row>
      </div>

      <div class="partitions">
      <el-card class="partition" v-for="partition in partitions" :key="partition.id">
        <img :src="partition.img" alt="partition image">
        <h3>{{ partition.title }}</h3>
      </el-card>
    </div>

    </div>





    <!-- <div class="nav">
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/person">个人中心</router-link>
            <router-link to="/creation">创作中心</router-link>
            <router-link to="/message">消息</router-link>
            <div class="nav-box"></div>
        </nav>
      </div> -->




    <!-- <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#7bbfea"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-row type="flex" justify="center">
  <el-menu-item index="1">首页</el-menu-item>
  <el-menu-item index="2">娱乐</el-menu-item>
  <el-menu-item index="3">生活</el-menu-item>
  <el-menu-item index="4"><router-link to="/video" >学习</router-link> </el-menu-item>
  <el-menu-item index="5"><router-link to="/person" >游戏</router-link> </el-menu-item>
  <el-menu-item index="6"><router-link to="/person" >运动</router-link> </el-menu-item>
  <el-menu-item index="7"><router-link to="/person" >美食</router-link> </el-menu-item>
  <el-menu-item index="8"><router-link to="/person" >音乐</router-link> </el-menu-item>
  <el-menu-item index="9"><router-link to="/person" >影视</router-link> </el-menu-item>
  <el-menu-item index="10"><router-link to="/person" >科技</router-link> </el-menu-item>
</el-row>
</el-menu> -->

    <!-- <div id="play">
    <video  autoplay
    controls="controls"
    height:300px
    width:200px>
      <source src="./assets/hz.mp4"></source>
    </video>
  </div> -->
    <!-- <HomeView></HomeView> -->
  </div>
</template>

<script>
//import HomeView from './views/HomeView.vue'
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
    return {
      input: ''
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
}

.head_guide {
  display: flex;
  justify-content: space-between;
  /*好像没区别*/
  background-color: #b2deed;
  padding: 5px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  align-items: center;
}

.logo {
  /* position: relative; */
  /* left: 100px; */
  padding-left: 100px;
  flex: 1;
}

.guide_menu {
  align-items: center;
  /* margin-right: 50px; */
  flex: 1;
}

.search {
  /* display: flex; */
  width: 600px;
  justify-content: center;
  align-items: center;
}

.partitions{
  display: flex;
}

#play {
  position: relative;
  left: 150;
}
</style>
