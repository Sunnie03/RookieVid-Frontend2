<template>
  <div class="music">
    <!--导航栏-->
    <Header />
    <!--分区-->
    <Partition></Partition>

    <!--【下面补全该页面代码】-->
    <PartitionPage :partition_label="'音乐'"></PartitionPage>
  </div>
</template>

<script>
import Header from '@/components/HomePage/Header.vue'
import Partition from '@/components/HomePage/Partition.vue'
import PartitionPage from '@/components/PartitionPage.vue'
export default {
  name: 'MusicView',//当前引入页面
  components: {
    Header,
    Partition,
    PartitionPage
  },
}
</script>