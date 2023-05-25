<template>
  <div class="military">
    <!--导航栏-->
    <Header />
    <!--分区-->
    <Partition></Partition>

    <PartitionPage :partition_label="'军事'"></PartitionPage>
  </div>
</template>

<script>
import Header from '@/components/HomePage/Header.vue'
import Partition from '@/components/HomePage/Partition.vue'
import PartitionPage from '@/components/PartitionPage.vue'
export default {
  name: 'MilitrayView',//当前引入页面
  components: {
    Header,
    Partition,
    PartitionPage
  },
}
</script>