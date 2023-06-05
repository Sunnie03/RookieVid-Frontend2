<template>
  <div class="partition">
    <!--分区-->
    <el-menu :router="true" :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
       background-color="#ceeef9" text-color="#000000" active-text-color="#ffd04b">
      <el-row type="flex" justify="center">
        <el-menu-item index="" @click="jumpToHome()"><el-button type="primary" plain round>首页</el-button></el-menu-item>
        <el-menu-item index="entertainment">娱乐</el-menu-item>
        <el-menu-item index="film">影视</el-menu-item>
        <el-menu-item index="game">游戏</el-menu-item>
        <el-menu-item index="sports">运动</el-menu-item>
        <el-menu-item index="food">美食
        </el-menu-item>
        <el-menu-item index="technology">科技
        </el-menu-item>
        <el-menu-item index="military">军事
        </el-menu-item>
        <el-menu-item index="music">音乐
        </el-menu-item>
        <el-menu-item index="study">学习
        </el-menu-item>
        <el-menu-item index="life">生活
        </el-menu-item>
      </el-row>
    </el-menu>
    <!-- <div style="color:rgb(174, 241, 241)"></div> -->
  </div>
</template>

<script>
export default {
  // components: {
  //   Partition,
  // },
  name: 'Partition',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '',
    };
  },
  created() {
    this.$set(this, 'activeIndex2', this.$route.meta.index);
  },
  watch: {
    '$route': function () {
      //this.activeIndex = this.$route.meta.index;
      this.$set(this, 'activeIndex2', this.$route.meta.index);
      //window.location.reload();
    }

  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    jumpTo(path) {
      //this.$router.push('/video/'+video_id);
      const path_url = '/' + path;
      window.open(path_url, '_self');
    },
    jumpToHome(){
      const path_url = '/';
      window.open(path_url, '_self');
    }
  }
}
</script>

<style>
.partitions {
  display: flex;
}

.part.el-button {
  background-color: #b9d3ed !important;
  margin: 5px;
}

.no_underline {
  text-decoration: none;
}
</style>
