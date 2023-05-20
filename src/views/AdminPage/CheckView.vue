<template>
  <div class="admin_check">
    <!--导航栏-->
    <AdminHeader />
     <!--管理栏的导航栏-->
    <AdminGuide/>

    <!--【下面补全该页面代码】-->
    <h1>This is a check page</h1>
  </div>
</template>

<script>
import AdminHeader from '@/components/AdminPage/AdminHeader.vue'
import AdminGuide from '@/components/AdminPage/AdminGuide.vue'
export default {
  name: 'check',//当前引入页面
  components: {
    AdminHeader,
    AdminGuide,
  },
}

</script>