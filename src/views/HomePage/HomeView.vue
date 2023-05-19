<template>
  <div class="home">
    <!--导航栏-->
    <Header></Header>
    <!--分区-->
    <Partition></Partition>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/HomePage/Header.vue'
import Partition from '@/components/HomePage/Partition.vue'
export default {
  name: "HomeView",//当前引入页面
  components: {
    Header,
    Partition
  },
}
</script>

<style></style>
