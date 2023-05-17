<template>
  <div class="partition">
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="#ceeef9" text-color="#000000" active-text-color="#ffd04b">
      <el-row type="flex" justify="center">
        <el-menu-item index="1"><router-link to="/home">首页</router-link></el-menu-item>
        <el-menu-item index="2"><router-link to="/entertainment">娱乐</router-link></el-menu-item>
        <el-menu-item index="3"><router-link to="/film">影视</router-link></el-menu-item>
        <el-menu-item index="4"> <router-link to="/game">游戏</router-link> </el-menu-item>
        <el-menu-item index="5"><router-link to="/sports">运动</router-link> </el-menu-item>
        <el-menu-item index="6"><router-link to="/food">美食</router-link> </el-menu-item>
        <el-menu-item index="7"><router-link to="/technology">科技</router-link> </el-menu-item>
        <el-menu-item index="8"><router-link to="/military">军事</router-link> </el-menu-item>
        <el-menu-item index="9"><router-link to="/music">音乐</router-link> </el-menu-item>
        <el-menu-item index="10"><router-link to="/study">学习</router-link> </el-menu-item>
      </el-row>
    </el-menu>
  </div>
</template>

<script>
</script>

<style>
.partitions {
  display: flex;
}

.part.el-button {
  background-color: #b9d3ed !important;
  margin: 5px;
}
</style>
