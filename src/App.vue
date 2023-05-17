<template>
  <v-app>
    <v-app-bar app color="primary" dark> 
      <!-- 这部分固定了？？？？ -->
      <!--主页最上方导航栏 链接-->
     
      <div class="head_guide">
        
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>

<script>
import router from './router';
// import Header from '@/components/HomePage/Header.vue' //导致有问题

export default {
  name: 'App',
  // components:{ Header},

  data: () => ({
    //
  }),


};
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.head_guide {
  display: flex;
  justify-content: space-between;
  /*好像没区别*/
  background-color: #b2deed;
  /* background-color: #ceeef9; */
  padding: 5px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  align-items: center;
  flex-direction: row;
}

.logo {
  /* position: relative; */
  /* left: 100px; */
  padding-left: 100px;
  flex: 1;
}

.guide_menu {
  align-items: center;
  /* margin-right: 50px; */
  flex: 1;
}

.search {
  /* display: flex; */
  width: 500px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* flex: 2; */
}

.userPhoto {
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-left: 20px;
}

/* .partitions {
  display: flex;
} */
</style>
