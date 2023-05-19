<template>
  <div class="header">

    <!--主页最上方导航栏 链接-->
    <div class="head_guide">
      <!--logo图标-->
      <div class="logo">
        <img alt="web logo" src="@/assets/web_logo.png" height="80px">
      </div>

      <!--搜索框-->
      <div class="search">
        <el-row type="flex">
          <el-input placeholder="请输入内容" v-model="input">
          </el-input>
          <el-button type="primary" icon="el-icon-search" @click="search"></el-button>
        </el-row>
      </div>

      <!--导航栏菜单-->
      <div class="guide_menu">
        <el-row type="flex" justify="end">
          <el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            active-text-color="#89d1e8">

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

      <div class="userPhoto">
        <el-button icon="el-icon-user" circle></el-button>
        登录
      </div>

    </div>
  </div>
</template>

<script>
//import HomeView from './views/HomeView.vue'
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
    return {
      input: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: { router }
}
</script>

<style>
.header {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.head_guide {
  display: flex;
  justify-content: space-between;
  /*好像没区别*/
  background-color: #b2deed;
  /* background-color: #ceeef9; */
  padding: 5px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  align-items: center;
  flex-direction: row;
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
  width: 500px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* flex: 2; */
}

.userPhoto {
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-left: 20px;
}

/* .partitions {
  display: flex;
} */

</style>
