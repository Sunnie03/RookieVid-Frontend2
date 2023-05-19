<template>
    <el-menu 
    class="el-menu-demo"
    mode="horizontal"
    background-color="rgb(157, 223, 100)"
    text-color="#fff"
    hover="#24d24c"
    active-text-color="#09553d" >
        <el-row type="flex" justify="center">
        <el-menu-item index="1">主页</el-menu-item>
        <el-menu-item index="2" v-on:click="openCreated">上传稿件</el-menu-item>
        <el-menu-item index="3">收藏夹</el-menu-item>
        <el-menu-item index="4">关注列表</el-menu-item>
        <el-menu-item index="5">粉丝 </el-menu-item>
        <el-menu-item index="6">消息通知</el-menu-item>
        </el-row> 
    </el-menu>
</template>

<script>
import router from '@/router'

// Vue.component('my-component', NavComponent);
export default {

methods: {
    openCreated(){
        this.$router.push({name:'creation'})
    }
}
}
</script>
