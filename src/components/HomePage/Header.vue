<template>
  <div class="header">

    <!-- <v-app-bar> -->
    <!--主页最上方导航栏 链接-->
    <div class="head_guide">
      <!--logo图标-->
        <!-- <v-col cols="12" md="2"> -->
        <div class="logo">
          <img alt="web logo" src="@/assets/web_logo.png" height="80px">
        </div>
      <!-- </v-col>Ï -->

        <!--搜索框-->
        <!-- <v-col cols="12" md="4"> -->
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
      <!-- </v-col> -->

        <!--导航栏菜单-->
        <!-- <v-col cols="12" md="4"> -->
        <div class="guide_menu" v-if="this.$store.state.isAdmin === 'true'"><!--是管理员，就显示有“管理中心”-->
          <el-row type="flex" justify="end">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
              active-text-color="#89d1e8">
              <el-menu-item index="" @click="jumpToHome()">首页</el-menu-item>
              <el-menu-item index="person" @click="jumpTo('person')">用户主页</el-menu-item>
              <el-menu-item index="myCreation" @click="jumpTo('myCreation')">
                创作中心</el-menu-item>

              <el-menu-item index="notification" @click="jumpTo('notification')" style="font-size:15px"><el-badge
                  :max="99" :value="messageNum" class="item">消息</el-badge></el-menu-item>

              <el-menu-item index="admin" @click="jumpTo('admin')">管理中心</el-menu-item>
            </el-menu>
          </el-row>
        </div>
        <div class="guide_menu" v-else> <!--不是管理员-->
          <el-row type="flex" justify="end">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
              active-text-color="#89d1e8">

              <el-menu-item index="" @click="jumpToHome()">首页</el-menu-item>
              <el-menu-item index="person" @click="jumpTo('person')">用户主页</el-menu-item>
              <el-menu-item index="myCreation" @click="jumpTo('myCreation')">创作中心</el-menu-item>
              <el-menu-item index="notification" @click="jumpTo('notification')">消息</el-menu-item>
            </el-menu>
          </el-row>
        </div>
      <!-- </v-col> -->

        <!--没有登录，显示默认样式-->
        <!--当前用户还没登录，为游客-->
        <!-- <v-col cols="12" md="2"> -->
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
            <v-avatar class="el-dropdown-link" @click="jumpTo('person')">
              <img :src="avatar" />
            </v-avatar>
            <!-- {{ username }} -->
            <el-dropdown-menu slot="dropdown" @click="open_login">
              <el-dropdown-item icon="el-icon-s-custom" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      <!-- </v-col> -->
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
      activeIndex: "",/*默认是首页*/
      input: "",
      messageNum: '',
    }
  },
  created() {
    this.getUserData();
    this.$set(this, 'activeIndex', this.$route.meta.index);
    //this.activeIndex = this.$route.meta.index;
    //this.pageName = this.$route.name;
  },
  watch: {
    '$route': function () {
      //this.activeIndex = this.$route.meta.index;
      this.$set(this, 'activeIndex', this.$route.meta.index);
      window.location.reload();
    }

  },
  mounted() {
    // 在原始页面中添加 focus 事件监听器
    window.addEventListener('focus', this.onWindowFocus);
  },
  beforeDestroy() {
    // 在组件销毁前移除事件监听器
    window.removeEventListener('focus', this.onWindowFocus);
  },
  methods: {
    // onWindowFocus() {
    //   // // 通过 $children 访问组件实例
    //   // var myComponent = this.$children[0];

    //   // // 手动调用 activated 钩子函数
    //   // myComponent.activated();
    //   console.log('Component activated');
    //   this.$set(this,'activeIndex',this.$route.meta.index);
    //   //this.activeIndex = this.$route.meta.index;
    //   //console.log('value:'+this.activeIndex);
    // },
    // activated() {
    //   // 当组件从缓存中激活时执行一些代码
    //   console.log('Component activated');
    //   this.activeIndex = this.$route.meta.index;
    // },
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
        this.open_login();
      }
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


        /*获取未读通知的数量*/
        axios.get('notification/count_unread', { headers: { Authorization: this.$store.getters.getStorage } })
          .then(response => {
            console.log(response);

            if (response.errno == 0) {
              this.messageNum = response.data.count;
              console.log('message num');
            }
          })
          .catch(error => {
            console.log('Error: ' + error);
          });
      }
      else {
        console.log('login-no');
      }
    },
    /*跳转对应页*/
    jumpTo(path) {
      //this.$router.push('/video/'+video_id);
      const path_url = '/' + path;
      window.open(path_url, '_blank');
    },
    jumpToHome() {
      const path_url = '/';
      window.open(path_url, '_self');
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
  /* margin-right:5%; */
  /* flex: 1 auto; */
}

.guide_menu {
  align-items: center;
  /* margin-right: 50px; */
  /* flex: 1; */
}

.search {
  /* display: flex; */
  width: 400px;
  /* justify-content: center; */
  align-items: center;
  flex-direction: row;
  /* flex: 1; */
}

.search-input {
  background-color: white;
  width: 80%;
  border-radius: 5px;
  /* text-align: left; */
  /* padding-left: 3%; */
  /* height:100%; */
}

.userPhoto {
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-left: 20px;
  margin-right: 20px;
}

/* .partitions {
  display: flex;
} */

/* .item {
  margin-top: 10px;
  margin-right: 40px;
} */
</style>
