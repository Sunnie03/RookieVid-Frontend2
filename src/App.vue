<template>
  <v-app>
      <router-view />
  </v-app>
  <!-- <div id="app">
    <router-view/>
  </div> -->
</template>

<script>

export default {
  name: 'App',

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
</style>