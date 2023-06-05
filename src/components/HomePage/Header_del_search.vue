<template>
  <div class="header">
    <!-- <v-app-bar> -->
    <!--主页最上方导航栏 链接-->
    <div class="head_guide">
      <!--logo图标-->
      <div class="logo">
        <img alt="web logo" src="@/assets/web_logo.png" height="80px">
      </div>

  

      <!--导航栏菜单-->
      <div class="guide_menu" v-if="this.$store.state.isAdmin"><!--是管理员，就显示有“管理中心”-->
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

      <div class="userPhoto">
        <el-button icon="el-icon-user" circle @click="open_login"></el-button>
        登录
      </div>

    </div>
    <!-- </v-app-bar> -->
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      activeIndex: "1",
      input: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
