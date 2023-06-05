<template>
  <div class="header">
    <!-- <v-app-bar> -->
    <!--主页最上方导航栏 链接-->
    <div class="head_guide">
      <!--logo图标-->
      <div class="logo">
        <img alt="web logo" src="@/assets/web_logo.png" height="80px">
      </div>

      <!--搜索框-->
      <div class="search">
        <el-row type="flex">
          <input placeholder="请输入内容" v-model="input" class="search-input" @keydown.enter="search_by_key">
          <!-- </el-input> -->
          <!--【下面这个button是用来点击搜索的，绑定方法为search_by_key需完善】-->

          <!-- <router-link :to="{ path: '/search',  query:{'keyword':this.input}}" target="_blank"> -->
          <el-button type="primary" icon="el-icon-search" @click="search_by_key"></el-button>
          <!-- </router-link> -->

        </el-row>
      </div>

      <!--导航栏菜单-->
      <div class="guide_menu" v-if="this.$store.state.isAdmin === 'true'"><!--是管理员，就显示有“管理中心”-->
        <el-row type="flex" justify="end">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            active-text-color="#89d1e8">
            <el-menu-item index="1"><router-link to="/" class="no_underline">首页</router-link></el-menu-item>
            <el-menu-item index="2"><router-link to="/person" class="no_underline"
                target="_blank">用户主页</router-link></el-menu-item>
            <el-menu-item index="3"><router-link to="/myCreation" class="no_underline"
                target="_blank">创作中心</router-link></el-menu-item>
            <el-menu-item index="4"><router-link to="/notification" class="no_underline"
                target="_blank">消息</router-link></el-menu-item>
            <el-menu-item index="5"><router-link to="/admin" class="no_underline"
                target="_blank">管理中心</router-link></el-menu-item>
          </el-menu>
        </el-row>
      </div>
      <div class="guide_menu" v-else> <!--不是管理员-->
        <el-row type="flex" justify="end">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            active-text-color="#89d1e8">

            <el-menu-item index="1"><router-link to="/" class="no_underline">首页</router-link></el-menu-item>
            <el-menu-item index="2"><router-link to="/person" class="no_underline"
                target="_blank">用户主页</router-link></el-menu-item>
            <el-menu-item index="3"><router-link to="/myCreation" class="no_underline"
                target="_blank">创作中心</router-link></el-menu-item>
            <el-menu-item index="4"><router-link to="/notification" class="no_underline"
                target="_blank">消息</router-link></el-menu-item>
          </el-menu>
        </el-row>
      </div>

      <!--没有登录，显示默认样式-->
      <!--当前用户还没登录，为游客-->
      <div v-if="this.$store.state.isLogin === false" class="userPhoto">
        <el-dropdown @command="handleCommandLogin">
          <el-button class="el-dropdown-link" icon="el-icon-user" circle @click="open_login"></el-button>
          <span class="el-dropdown-link" @click="open_login"> 登录</span>
          <el-dropdown-menu slot="dropdown" @click="open_login">
            <el-dropdown-item icon="el-icon-s-custom" command="a">立即登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!--用户已经登录-->
      <div v-else class="userPhoto">
        <el-dropdown @command="handleCommandPerson">
          <v-avatar class="el-dropdown-link" @click="open_login">
            <img :src="avatar" />
          </v-avatar>
          {{ username }}
          <el-dropdown-menu slot="dropdown" @click="open_login">
            <el-dropdown-item icon="el-icon-s-custom" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </div>
    <!-- </v-app-bar> -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Header',
  data() {
    return {
      /*登录用户相关信息*/
      username: '',
      avatar: '',
      userid: '',
      email: '',
      signature: '',
      /*导航栏组件*/
      activeIndex: "1",
      input: "",
    }
  },
  created() {
    this.getUserData();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    /*处理未登录时的下拉菜单*/
    handleCommandLogin(command) {
      //this.$message('click on item ' + command);
      this.open_login();
    },
    /*处理已经登录时的下拉菜单*/
    handleCommandPerson(command) {
      //this.$message('click on item ' + command);
      if (command === 'logout') { 
        /*执行登出*/
        this.open_login(); }
    },
    /*如果已经登录，获取登录者的导航栏相关信息*/
    getUserData() {
      /*如果已经登录*/
      if (this.$store.state.isLogin === "true") {
        axios.get('account/display_myprofile', { headers: { Authorization: this.$store.getters.getStorage } })
          .then(response => {
            console.log(response);

            this.userid = response.data.context.id;
            this.username = response.data.context.username;
            this.avatar = response.data.context.avatar_url;
            console.log('isl111');
            this.signature = response.data.context.signature;
          })
          .catch(error => {
            console.log('Error: ' + error);
          });
      }
      else {
        console.log('login-no');
      }
    },
    search_by_key() {
      // console.log(this.input);
      // console.log(key);
      // console.log(this.input);
      if (this.input === "") {
        console.log('输入内容不能为空');
        this.$message.error('输入内容不能为空');
        return false;
      }
      const currentPath = this.$route.path;
      const currentKeyword = this.$route.query.keyword;

      const targetPath = '/search';
      const targetKeyword = this.input;

      // 判断当前路由是否已经是目标路由
      if (currentPath === targetPath && currentKeyword === targetKeyword) {
        return; // 避免重复导航
      }
      // this.$router.push({ path: '/search', query: { keyword: this.input } })
      const key = this.input;
      this.input = ""
      // console.log('key:'+key)
      const url = '/search?keyword=' + key
      console.log(url);
      window.open(url, '_blank')

    },
    open_login() {
      const currentPath = this.$route.path;

      const loginPath = '/login';
      let Token = this.$store.state.token;
      // 判断当前路由是否已经是目标路由
      if (currentPath === loginPath) {
        return; // 避免重复导航
      } else if (this.$store.state.isLogin || !(Token === 'null' || Token === '' || Token === undefined)) {//已经登录

        if (confirm("您已登录，请确认是否登出？")) {
          this.$store.commit('$_logout')

        } else {
          return;
        }
      }
      // this.$router.push(loginPath)
      let routeData = this.$router.resolve({ path: loginPath });
      window.open(routeData.href);
    }
  },
}
</script>

<style>
.header {
  display: flex;
  flex-direction: column;
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

.search-input {
  background-color: white;
  width: 80%;
  border-radius: 5px;
  /* text-align: left; */
  padding-left: 3%;
  /* height:100%; */
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
