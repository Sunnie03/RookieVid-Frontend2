<template>
  <div class="partition-page">
    <Header/>
    <Partition/>
    <PartitionPage :partition_label="'影视'"></PartitionPage>
  </div>
</template>

<script>
import Header from '@/components/HomePage/Header.vue'
import Partition from '@/components/HomePage/Partition.vue'
import PartitionPage from '@/components/PartitionPage.vue'

export default({
  name:'FileView',
  components: {
    Header,
    Partition,
    PartitionPage
  },
})
</script>
