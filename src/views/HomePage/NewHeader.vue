<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="white"
      dark
      shrink-on-scroll
      prominent
      src="@/assets/head/p10.png"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-5"
      scroll-threshold="500"
      height="130"
      min-height="90"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
          
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Title</v-app-bar-title>

      <v-spacer></v-spacer>

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
      
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-5"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1500px;"></v-container>
    </v-sheet>
  </v-card>
</template>
<script>
export default {
  name: 'HomeHeadView',//当前引入页面
}
// @ is an alias to /src
</script>