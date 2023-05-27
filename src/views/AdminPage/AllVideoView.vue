<template>
  <div class="admin_all_video">
    <!--导航栏-->
    <AdminHeader />
    <!--管理栏的导航栏-->
    <AdminGuide />


    <!--【下面补全该页面代码】-->
    <el-container>
      <!-- <el-aside width="200px" style="background-color: antiquewhite;">
        <v-navigation-drawer dark src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" width="100%" height="100%"
          permanent>
          <v-list>
            <v-list-item v-for="([icon, text], i) in items" :key="i" link>
              <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </el-aside> -->

      <el-main>
        <div :style="{ 'width': '50vw', 'margin-top': '30px', 'justify-content': 'center' }" class="mx-auto">
          <div style="margin-bottom: 15px;">
            <h1>全部视频</h1>
          </div>
          <!--for循环-->
          <v-card height="200px" v-for="(video_item, index) in videos" :key="index">
            <div class="show_video_block" style="padding-top: 20px;padding-bottom: 10px;padding-left: 20px;">
              <v-row>
                <v-col cols="12" md="5">
                  <!-- <img :src="recommend_item.cover_url" width="100%" /> -->
                  <img :src="video_item.cover_url" height="160px" />
                </v-col>

                <v-col class="video_introdction" cols="12" md="7">
                  <div class="video_title">
                    <h3>视频标题{{ video_item.title}}</h3>
                  </div>

                  <div style="margin-top: 10px;margin-bottom: 10px;">
                    <el-tag type="info" effect="plain" size="mini">作者 </el-tag> 作者{{video_item.user_name }}
                  </div>

                  <div style="margin-bottom: 10px;">
                    {{ video_item.created_at }}
                  </div>

                  <div class="video_playData">
                    <span style="margin-right: 25px;">
                      <v-icon
                        style="width: 4px;height: 4px;margin-left: 8px;margin-right: 8px;">mdi-motion-play-outline</v-icon>
                      {{video_item.view_amount }}
                    </span>
                    <span style="margin-right: 25px;">
                      <v-icon
                        style="width: 4px;height: 4px;margin-left: 8px;margin-right: 8px;">mdi-thumb-up-outline</v-icon>
                      {{video_item.like_amount }}
                    </span>
                    <span style="margin-right: 25px;">
                      <v-icon
                        style="width: 4px;height: 4px;margin-left: 8px;margin-right: 8px;">mdi-star-outline</v-icon>
                      {{video_item.fav_amount }}
                    </span>
                    <span>
                      <v-icon
                        style="width: 4px;height: 4px;margin-left: 8px;margin-right: 8px;">mdi-text-box-outline</v-icon>
                      {{video_item.fav_amount }}
                    </span>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';
import AdminHeader from '@/components/AdminPage/AdminHeader.vue'
import AdminGuide from '@/components/AdminPage/AdminGuide.vue'
export default {
  name: 'allVideo',//当前引入页面
  components: {
    AdminHeader,
    AdminGuide,
  },
  data() {
    return {
      videos: [],
      // items: [
      //   ['mdi-email', 'Inbox'],
      //   ['mdi-account-supervisor-circle', 'Supervisors'],
      //   ['mdi-clock-start', 'Clock-in'],
      // ],
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let Headers = { 'Authorization': this.$store.getters.getStorage };/*获取token*/
      console.log(Headers);
      axios.get('/super_admin/get_all_video', { headers: Headers })
        .then(response => {
          console.log(response);
          if (response.data.errno == 0) {
            response.data.video.forEach((video, index) => {
              this.videos.push(video);/*【这样写】*/
            })
            console.dir(this.videos);
          }
          else {
            this.$message.warning(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}

</script>

<style>
/* .el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
} */
</style>