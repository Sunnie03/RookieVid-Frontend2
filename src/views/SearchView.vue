<template>
  <div class="sreach_return" title="搜索返回页">

    <div class="text-center">
      <v-pagination v-model="page" :length="6"></v-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
      }
    },
  }
</script>
    