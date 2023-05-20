<template>
  <div class="admin_guide">
    <!--管理栏的导航栏-->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><router-link to="/admin/check" class="no_underline">全部视频</router-link></el-menu-item>
      <el-menu-item index="2"><router-link to="/admin/complain" class="no_underline">投诉视频</router-link></el-menu-item>
      <el-menu-item index="3"><router-link to="/admin/check" class="no_underline">待审核视频</router-link></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AdminGuide',
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
}
</script>

<style>

</style>
