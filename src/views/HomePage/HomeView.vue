<template>
  <div class="home">

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <h1>This is home</h1> -->

    <!--header：logo+导航栏-->
    <!-- <Header: :headerMode="headMode" /> -->
    <div class="partition">
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        background-color="#ceeef9" text-color="#000000" active-text-color="#ffd04b">
        <el-row type="flex" justify="center">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">娱乐</el-menu-item>
          <el-menu-item index="3">生活</el-menu-item>
          <el-menu-item index="4"> <router-link :to="{name:'video',params:{'id':'BV123123'}}">学习</router-link> </el-menu-item>
          <el-menu-item index="5"><router-link to="/video">游戏</router-link> </el-menu-item>
          <el-menu-item index="6"><router-link to="/person">运动</router-link> </el-menu-item>
          <el-menu-item index="7"><router-link to="/person">美食</router-link> </el-menu-item>
          <el-menu-item index="8"><el-link :to="{path:'/person'}">音乐</el-link> </el-menu-item>
          <el-menu-item index="9"><router-link to="/person">影视</router-link> </el-menu-item>
          <el-menu-item index="10"><router-link to="/person">科技</router-link> </el-menu-item>
          <el-button class="part" round><router-link to="/person">主要按钮</router-link></el-button>
        </el-row>
      </el-menu>
    </div>
    <v-btn
      depressed
      color="primary"
    >
    PPPP
    </v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
// import Header from '@/components/HomePage/Header.vue'
// export default {
//   name: "HomeView",//当前引入页面
//   components:{ Header}
// }

// import HelloWorld from '@/components/HelloWorld.vue'  /*显示之前的*/

// export default {
//   name: 'HomeView',
//   components: {
//     HelloWorld
//   }
// }
</script>

<style>
.partitions {
  display: flex;
}
.part.el-button{
  background-color: #b9d3ed!important;
  margin:5px;
}
</style>
