<template>
  <div class="studyPage">
    <!--导航栏-->
    <Header />
    <!--分区-->
    <Partition></Partition>

    <PartitionPage :partition_label="'学习'"></PartitionPage>
  </div>
</template>

<script>
import Header from '@/components/HomePage/Header.vue'
import Partition from '@/components/HomePage/Partition.vue'
import PartitionPage from '@/components/PartitionPage.vue'
export default {
  name: 'StudyView',//当前引入页面
  components: {
    Header,
    Partition,
    PartitionPage
  },
}
</script>