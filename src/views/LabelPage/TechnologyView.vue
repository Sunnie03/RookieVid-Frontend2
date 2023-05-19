<template>
  <div class="technology" >
    <!--导航栏-->
    <Header />
    <!--分区-->
    <Partition></Partition>

    <!--【下面补全该页面代码】-->
    <h1>This is a technology page</h1>
  </div>
</template>
<script>
import Header from '@/components/HomePage/Header.vue'
import Partition from '@/components/HomePage/Partition.vue'
export default {
  name: 'TechnologyView',//当前引入页面
  components: {
    Header,
    Partition,
  },
}
</script>