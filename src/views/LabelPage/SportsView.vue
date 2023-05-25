<template>
  <div class="sports">
    <!--导航栏-->
    <Header />
    <!--分区-->
    <Partition></Partition>

    <PartitionPage :partition_label="'运动'"></PartitionPage>
  </div>
</template>

<script>
import Header from '@/components/HomePage/Header.vue'
import Partition from '@/components/HomePage/Partition.vue'
import PartitionPage from '@/components/PartitionPage.vue'
export default {
  name: 'SportsView',//当前引入页面
  components: {
    Header,
    Partition,
    PartitionPage
  },
}
</script>