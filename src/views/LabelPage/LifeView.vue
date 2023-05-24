<template>
  <div class="life">
    <!--导航栏-->
    <Header />
    <!--分区-->
    <Partition></Partition>
    <PartitionPage :partition_label="'生活'"></PartitionPage>
  </div>
</template>

<script>
import Header from '@/components/HomePage/Header.vue'
import Partition from '@/components/HomePage/Partition.vue'
import PartitionPage from '@/components/PartitionPage.vue'
export default {
  name: 'LifeView',//当前引入页面
  components: {
    Header,
    Partition,
    PartitionPage
  },
}
</script>