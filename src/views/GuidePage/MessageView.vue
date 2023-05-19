<template>
  <div class="message" title="消息页">
    <Header />
    <h1>This is a message page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/HomePage/Header.vue'
export default {
  name: 'HomeView',//当前引入页面
  components: {
    Header,
  },
}
</script>

