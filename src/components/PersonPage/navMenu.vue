<template>
    <el-menu 
    class="el-menu-demo"
    mode="horizontal"
    text-color="#fff"
    hover="#24d24c"
    active-text-color="#09553d" >
        <el-row type="flex" justify="center">
        <el-menu-item index="1">
            <router-link to="/person" custom>主页</router-link>
        </el-menu-item>
        <!-- <el-menu-item index="2" >
            <router-link to="/creation" custom>上传稿件</router-link>
        </el-menu-item> -->
        <el-menu-item index="3" >
            <router-link to="/collect" custom>收藏夹</router-link>
        </el-menu-item>
        <el-menu-item index="4">
            <router-link :to="{name:'myFollow'}" custom>关注列表</router-link>
        </el-menu-item>
        <el-menu-item index="5">
            <router-link :to="{name:'myFans'}" custom>粉丝</router-link>
        </el-menu-item>
        <el-menu-item index="6">
            <router-link :to="{name:'myNotify'}" custom>消息通知</router-link>
        </el-menu-item>
        </el-row> 
    </el-menu>
</template>

<script>
import router from '@/router'

// Vue.component('my-component', NavComponent);
export default {

methods: {
}
}
</script>

<style scoped>
.el-menu-demo{
    overflow: hidden;
    background-color:rgb(142, 208, 217);
}
/*设置点击前的样式 */
a{
    text-decoration: none;
    color: #fff;
      }
  /*设置点击后的样式 */
  .router-link-active {
      text-decoration: none;
      
      color: rgb(135, 80, 16);
    }
</style>