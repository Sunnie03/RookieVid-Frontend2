<template>
  <v-app :dark="isDark" class="my-app">
    <v-main>
      <router-view />
    </v-main>
    
  </v-app>
  <!-- <div id="app">
    <router-view/>
  </div> -->
</template>

<script>
// import Header from '@/components/HomePage/Header.vue' //导致有问题

export default {
  name: 'App',
  // components:{ 
  //   header:Header
  // },

  data: () => ({
    //
  }),


};
</script>

<style>
.my-app {
  font-family: sans-serif;
  background-color: white;
}

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
