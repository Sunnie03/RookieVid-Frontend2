<template>
  <div class="home_container">
   
    <!--导航栏-->
    <Header/>
    <!--分区-->
    <Partition></Partition>

    <!--【需增加部分】HomeView编写代码，显示推荐视频-->
    <!--【注意】点击搜索的跳转的button在Header里-->
    
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/HomePage/Header.vue'
import Partition from '@/components/HomePage/Partition.vue'
export default {
  name: 'HomeView',//当前引入页面
  components: {
    Header,
    Partition,
  },
}
</script>

<style>
.home_container{
  display: flex;
  flex-direction: column;
}
</style>
