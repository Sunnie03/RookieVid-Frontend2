<template>
  <div class="admin_complain">

    <!--导航栏-->
    <AdminHeader />
    <!--管理栏的导航栏-->
    <AdminGuide />

    <el-container>
      <div :style="{ 'width': '60vw', 'margin-top': '30px', 'justify-content': 'center' }" class="mx-auto">
        <div style="margin-bottom: 15px;">
          <h1>投诉视频列表</h1>
        </div>
        <v-card height="300px" v-for="(video_item, index) in complainVideos" :key="index">
          <div class="complained_video_block" style="padding-top: 20px;padding-bottom: 10px;">
            <v-row>
              <v-col cols="12" md="5">
                <!-- <img :src="recommend_item.cover_url" width="100%" /> -->
                <img :src="video_item.cover_url" height="160px" />
              </v-col>

              <v-col class="complain_introdction" cols="12" md="7">
                <div class="complain_video_title">
                  <h3>{{ video_item.title}}</h3>
                </div>

                

                <div style="margin-top: 10px;margin-bottom: 10px;">
                  <el-tag type="info" effect="plain" size="mini">作者 </el-tag>{{video_item.user_name }}
                </div>

                <div>
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
                    <span>
                      <v-icon
                        style="width: 4px;height: 4px;margin-left: 8px;margin-right: 8px;">mdi-clock-time-nine-outline</v-icon>
                      {{video_item.created_at}}
                    </span>
                </div>

                <div>投诉列表</div>
                <div>
                  投诉人用户名{{ }}
                </div>
                <div>
                  投诉理由{{ }}
                </div>

                <span>
                  <!--将被投诉视频加入待审核列表，和投稿视频一起重新审核-->
                  <el-button type="primary" plain @click="审核列表">重置</el-button>
                </span>

              </v-col>
            </v-row>
          </div>
        </v-card>
      </div>
    </el-container>
    <!--【下面补全该页面代码】-->
  </div>
</template>

<script>
import axios from 'axios';
import AdminHeader from '@/components/AdminPage/AdminHeader.vue'
import AdminGuide from '@/components/AdminPage/AdminGuide.vue'
export default {
  name: 'complaintList',//当前引入页面
  components: {
    AdminHeader,
    AdminGuide,
  },
  data() {
    return {
      complainVideos: [],
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let Headers = { 'Authorization': this.$store.getters.getStorage };/*获取token*/
      console.log(Headers);
      axios.get('/super_admin/get_complain_video', { headers: Headers })
        .then(response => {
          console.log(response);
          if (response.data.errno == 0) {
            response.data.video.forEach((video, index) => {
              this.complainVideos.push(video);/*【这样写】*/
            })
            console.dir(this.complainVideos);
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