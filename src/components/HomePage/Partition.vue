<template>
  <div class="partition">
    <!--分区-->
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="#ceeef9" text-color="#000000" active-text-color="#ffd04b">
      <el-row type="flex" justify="center">
        <el-menu-item index="1"><router-link to="/" class="no_underline">首页</router-link></el-menu-item>
        <el-menu-item index="2"><router-link to="/entertainment" class="no_underline"
            target="_blank">娱乐</router-link></el-menu-item>
        <el-menu-item index="3"><router-link to="/film" class="no_underline"
            target="_blank">影视</router-link></el-menu-item>
        <el-menu-item index="4"><router-link to="/game" class="no_underline" target="_blank">游戏</router-link>
        </el-menu-item>
        <el-menu-item index="5"><router-link to="/sports" class="no_underline" target="_blank">运动</router-link>
        </el-menu-item>
        <el-menu-item index="6"><router-link to="/food" class="no_underline" target="_blank">美食</router-link>
        </el-menu-item>
        <el-menu-item index="7"><router-link to="technology" class="no_underline" target="_blank">科技</router-link>
        </el-menu-item>
        <el-menu-item index="8"><router-link to="/military" class="no_underline" target="_blank">军事</router-link>
        </el-menu-item>
        <el-menu-item index="9"><router-link to="/music" class="no_underline" target="_blank">音乐</router-link>
        </el-menu-item>
        <el-menu-item index="10"><router-link to="/study" class="no_underline" target="_blank">学习</router-link>
        </el-menu-item>
        <el-menu-item index="11"><router-link to="/study" class="no_underline" target="_blank">生活</router-link>
        </el-menu-item>
      </el-row>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Partition',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
}</style>
