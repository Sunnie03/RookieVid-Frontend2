<template>
  <div class="admin_check">
    <!--导航栏-->
    <AdminHeader />
    <!--管理栏的导航栏-->
    <AdminGuide />

    <!--【下面补全该页面代码】-->
    <h1>This is a check page</h1>
    <div>
      <v-row justify="space-around">
        <v-icon @click="model--">
          mdi-minus
        </v-icon>
        {{ model }}
        <v-icon @click="model++">
          mdi-plus
        </v-icon>
      </v-row>

      <v-carousel v-model="model">
        <v-carousel-item v-for="(color, i) in colors" :key="color">
          <v-sheet :color="color" height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <div class="check_video">
                Slide {{ i + 1 }}
                <!--视频播放器-->
                
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
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
  data() {
    return {
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
      model: 0,
    }
  },
}

</script>