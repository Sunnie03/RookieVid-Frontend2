<template>
  <div class="admin_check">
    <!--导航栏-->
    <AdminHeader />
    <!--管理栏的导航栏-->
    <AdminGuide />

    <!--【下面补全该页面代码】-->
    <!-- <div>
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
                Slide {{ i + 1 }}视频播放
                
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div> -->

    <el-container>
      <div :style="{ 'width': '60vw', 'margin-top': '30px', 'justify-content': 'center' }" class="mx-auto">
        <div v-for="(video_item, index) in complainVideos" :key="index">
          <!--视频信息-->
          <div>
            标题：{{ video_item.title }}
          </div>
          <div>
            作者:{{ video_item.user_name }}
          </div>
          <div>
            作者:{{ video_item.created_at }}
          </div>
          <div>
            <span>
                <!--通过-->
                <el-button type="primary" plain @click="passVideo(video_item.id)">通过</el-button>
              </span>
            <span>
                <!--删除-->
                <el-button type="primary" plain @click="rejectVideo(video_item.id)">删除</el-button>
              </span>
          </div>
          <!--视频播放器-->
          <div class="video_player" style="margin-top:18px;width:100%;">
            <video controls :src="video_item.video_url" muted style="width:100%;min-height:550px;background-color:black"
              :poster="video_item.cover_url">
              <!-- <source v-bind:src="video.url">
                    </source> -->
            </video>
          </div>

        </div>

      </div>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';
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
      axios.get('/super_admin/get_review_video', { headers: Headers })
        .then(response => {
          console.log(response);
          if (response.data.errno == 1) {
            /*还有视频在审核*/
            response.data.video.forEach((video, index) => {
              this.complainVideos.push(video);/*【这样写】*/
            })
            this.amount = this.complainVideos.length;
            console.dir(this.complainVideos);
          }
          else {
            /*没有视频在审核*/
            this.$message.warning(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    /*弹出拒绝通过该视频的理由填写窗口*/
    openReason(){
      ;
    },
    /*通过该视频*/
    deleteComplainVideo(video_id) {
      let formData = new FormData();
      formData.append("video_id", video_id);
      formData.append("res", "1");
      formData.append("Authorization", this.$store.getters.getStorage);/*Token*/
      axios.post('/super_admin/review_video', formData)
        .then(response => {
          console.log(formData);
          console.log(response);
          if (response.data.errno == 0) {
            console.log('pass');
            this.$message.success(response.data.msg);
            /*重新获取数据|【这样可能比较慢，可以用数组先删一下】*/
            this.fetchData();
          }
          else {
            this.$message.warning(response.data.msg);
            return;
          }
        }).catch(error => {
          console.log('Error: ' + error);
          this.$message({
            message: '发生错误，通过失败',
            type: 'warning'
          });
        });
    },
    /*删除视频*/
    rejectVideo(video_id) {
      let formData = new FormData();
      formData.append("video_id", video_id);
      formData.append("res", "0");
      //formData.append("reason", );
      formData.append("Authorization", this.$store.getters.getStorage);/*Token*/
      axios.post('/super_admin/review_video', formData)
        .then(response => {
          console.log(formData);
          console.log(response);
          if (response.data.errno == 0) {
            console.log('删除成功');
            this.$message.success(response.data.msg);
            /*重新获取数据|【这样可能比较慢，可以用数组先删一下】*/
            this.fetchData();
          }
          else {
            this.$message.warning(response.data.msg);
            return;
          }
        }).catch(error => {
          console.log('Error: ' + error);
          this.$message({
            message: '发生错误，删除视频失败',
            type: 'warning'
          });
        });
    },
  },
}

</script>

<style>
.video_player video {
  display: flex;
  width: 100%;
  min-height: 400px;
  max-height: 550px;
  /* padding-top: 20px;
  padding-bottom: 15px; */
}
</style>