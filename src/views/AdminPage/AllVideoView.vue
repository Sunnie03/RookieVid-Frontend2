<template>
  <div class="admin_all_video">
    <!--导航栏-->
    <Header />
    <!--管理栏的导航栏-->
    <AdminGuide />

    <!--【下面补全该页面代码】-->
    <el-container>
      <!--侧边导航栏-->
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
        <div :style="{ 'width': '45vw', 'margin-top': '30px', 'justify-content': 'center' }" class="mx-auto">
          <div v-if="amount > 0">
            <div style="margin-bottom: 10px;font-weight: 500;font-size: 22px;">
              <p>全部视频 &nbsp;&nbsp;共{{ amount }}条</p>
            </div>
            <!--for循环-->
            <v-card v-for="(video_item, index) in videos" :key="index" flat>
              <div class="show_video_block"
                style="padding-top: 20px;padding-left: 20px;margin-bottom: 14px;padding-right: 9px;">
                <v-row>
                  <v-col cols="12" md="4">
                    <img class="video_cover" :src="video_item.cover_url" width="100%" height="128px"
                      @click="jumpTo(video_item.id)" />
                  </v-col>

                  <v-col class="video_introdction" cols="12" md="8">
                    <div class="video_title" v-bind:title="video_item.title" @click="jumpTo(video_item.id)"
                      style="font-weight: 400;font-size: 18px;">
                      <span>{{ video_item.title }}</span>
                    </div>

                    <div style="margin-top: 10px;margin-bottom: 10px;color:rgb(109, 106, 106);font-size: 14px;">
                      <span class="video_author textBtn" v-bind:title="'作者: ' + video_item.user_name"
                        @click="jumpToUser(video_item.user_id)"> <el-tag effect="plain" size="mini">作者 </el-tag>
                        {{
                          video_item.user_name }}</span>
                    </div>

                    <div style="margin-bottom: 10px;color:rgb(109, 106, 106);font-size: 14px;">
                      <v-icon size="20"
                        style="width: 8px;height: 8px;margin-left: 8px;margin-right: 8px;">mdi-clock-time-nine-outline</v-icon>&nbsp;{{
                          video_item.created_at }}
                    </div>

                    <div class="video_playData" style="color:rgb(109, 106, 106);font-size: 14px;">
                      <span style="margin-right: 25px;">
                        <v-icon
                          style="width: 4px;height: 4px;margin-left: 8px;margin-right: 8px;">mdi-motion-play-outline</v-icon>
                        {{ video_item.view_amount }}
                      </span>
                      <span style="margin-right: 25px;">
                        <v-icon
                          style="width: 4px;height: 4px;margin-left: 8px;margin-right: 8px;">mdi-thumb-up-outline</v-icon>
                        {{ video_item.like_amount }}
                      </span>
                      <span style="margin-right: 25px;">
                        <v-icon
                          style="width: 4px;height: 4px;margin-left: 8px;margin-right: 8px;">mdi-star-outline</v-icon>
                        {{ video_item.fav_amount }}
                      </span>
                      <!--评论数量-->
                      <!-- <span>
                      <v-icon
                        style="width: 4px;height: 4px;margin-left: 8px;margin-right: 8px;">mdi-text-box-outline</v-icon>
                      {{video_item.fav_amount }}
                    </span> -->
                    </div>
                  </v-col>
                </v-row>

              </div>
              <v-divider />
            </v-card>
          </div>
          <!--正在加载中-->
          <div v-else style="display: flex;justify-content: center; ">
            <div style="font-size: 30px;color:grey;margin-top: 20px;">视频较多，正在加载中，请耐心等待～</div>
          </div>
        </div>

      </el-main>
    </el-container>
    <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
    <!--底部-->
    <el-footer height="80px"></el-footer>

  </div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/HomePage/Header.vue'
import AdminGuide from '@/components/AdminPage/AdminGuide.vue'
export default {
  name: 'allVideo',//当前引入页面
  components: {
    Header,
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
      amount: '',
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    jumpToUser(user_id) {
      const display_user_url = '/lookPerson/' + user_id;
      window.open(display_user_url, '_self');
    },
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
            this.amount = this.videos.length;
            console.dir(this.videos);
          }
          else {
            this.$message.warning(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    /*跳转到推荐视频对应的播放页*/
    jumpTo(video_id) {
      //this.$router.push('/video/'+video_id);
      const video_play_url = '/video/' + video_id;
      window.open(video_play_url, '_self');
    },
  }
}

</script>

<style >
/* .el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
} */

/* .show_video_block {
  border: 2px solid #d0dcdc9a;
  border-radius: 10px;
  padding: 10px 0 10px 0;
  box-shadow: 0 .5px 0 .5px#e7f6f69a;
} */

.video_cover {
  border-radius: 10px;
}

.video_title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.video_author {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

/*以下样式设置鼠标悬停显示颜色*/
.video_title:hover {
  color: rgb(11, 168, 235);
  cursor: pointer;
}

.textBtn:hover {
  color: rgb(0, 179, 255);
  /*这个颜色比较接近链接的颜色*/
  cursor: pointer;
}
</style>