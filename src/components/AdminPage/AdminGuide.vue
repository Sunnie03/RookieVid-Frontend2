<template>
  <div class="admin_guide">
    <!--管理栏的导航栏-->
    <el-menu :router="true" :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="allVideo">全部视频</el-menu-item>
      <el-menu-item index="complain">投诉视频</el-menu-item>
      <el-menu-item index="check">待审核视频</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AdminGuide',
  data() {
    return {
      activeIndex2: "allVideo",
    };
  },
  created() {
    this.$set(this, 'activeIndex2', this.$route.meta.index2);
    //this.activeIndex = this.$route.meta.index;
    //this.pageName = this.$route.name;
  },
  watch: {
    '$route': function () {
      //this.activeIndex = this.$route.meta.index;
      this.$set(this, 'activeIndex2', this.$route.meta.index2);
      window.location.reload();
    }

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
