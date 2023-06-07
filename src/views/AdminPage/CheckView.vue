<template>
  <div class="admin_check">
    <!--导航栏-->
    <Header />
    <!--管理栏的导航栏-->
    <AdminGuide />

    <!--【下面补全该页面代码】-->
    <el-container>
      <div :style="{ 'width': '60vw', 'margin-top': '30px', 'justify-content': 'center' }" class="mx-auto">

        <div v-if="videoNum > 0">
          <div style="font-weight: 400;font-size: 25px;margin-bottom: 18px;">共有{{ videoNum }}条视频待审核</div>

          <div class="block" style="padding-left: 20px;padding-right: 20px;padding-bottom: 20px;">
            <!--类似轮播器的效果-->
            <v-carousel ref="carousel" :cycle="false" height="850px" style="margin-top: 10px;">
              <v-carousel-item v-for="(video_item, index) in complainVideos" :key="index"
                reverse-transition="fade-transition" transition="fade-transition">
                <!--视频信息-->
                <div>
                  <div class="videoTitle" style="font-weight: 500;font-size: 24px;margin-bottom: 7px;">
                    标题：{{ video_item.title }}
                  </div>
                  <div style="font-weight: 500;font-size: 20px;color:rgb(57, 56, 56);margin-bottom: 7px;">
                    <v-avatar class="avatar"><img :src="video_item.avatar_url" @click="jumpToUser(video_item.user_id)"
                        style="cursor: pointer;" /></v-avatar>
                    &nbsp;&nbsp;<span class="textBtn" @click="jumpToUser(video_item.user_id)">{{ video_item.user_name
                    }}</span>
                  </div>
                  <div style="font-size: 18px;color:rgb(57, 56, 56);margin-bottom: 7px;">
                    <i>投稿时间：{{ video_item.created_at }} </i>
                  </div>
                  <div style="display: flex;">
                    <span style="margin-left: auto;">
                      <span style="margin-right: 20px">
                        <!--通过-->
                        <el-button type="success" plain @click="passVideo(video_item.id)">通过</el-button>
                      </span>
                      <span>
                        <!--删除-->
                        <el-button type="danger" plain @click="reasonDialog = true">删除</el-button>
                      </span>
                    </span>
                  </div>
                </div>

                <!--原因的对话框-->
                <el-dialog title="请填写删除原因" :visible.sync="reasonDialog" @close="CancelDelete()" width="29%"
                  :modal-append-to-body="false">
                  <h3 style="margin-bottom: 20px;">请填删除原因</h3>
                  <el-input type="textarea" :rows="5" placeholder="请填写删除原因，限制200字" v-model="reason_textarea"
                    maxlength="200" show-word-limit>
                  </el-input>
                  <!-- <span slot="header">
                        <el-button class="dialog-close-button" icon="el-icon-close""></el-button>
                      </span> -->
                  <!--投诉对话框底部-->
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="reasonDialog = false; CancelDelete()">取 消</el-button>
                    <el-button type="danger" @click="rejectVideo(video_item.id)">确 定</el-button>
                  </span>

                </el-dialog>

                <!--视频播放器-->
                <div class="video_player" style="margin-top:18px;width:100%;">
                  <video controls id="shipin" ref="video" :src="video_item.video_url"
                    style="width:100%;height:100%;background-color:black" :poster="video_item.cover_url">
                    <!-- <source v-bind:src="video.url">
                    </source> -->
                  </video>
                </div>

              </v-carousel-item>
            </v-carousel>
          </div>
        </div>
        <div v-else style="display: flex;justify-content: center; ">
          <div style="font-size: 30px;color:grey;margin-top: 20px;">没有需要审核的视频～</div>
        </div>
      </div>

      <el-footer height="80px"></el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/HomePage/Header.vue'
import AdminGuide from '@/components/AdminPage/AdminGuide.vue'
export default {
  name: 'check',//当前引入页面
  components: {
    Header,
    AdminGuide,
  },
  data() {
    return {
      complainVideos: [],
      isFinish: false,/*表示还有视频待处理*/
      reasonDialog: false,/*填写原因的窗口是否出现*/
      reason_textarea: '',/*填写删除原因*/
      videoNum: '',
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    // 将 shouldMute 设为 false，以恢复浏览器记录的音量
    setTimeout(() => {
      console.log('hello');
      this.$nextTick(() => {
        console.log(this.$refs.video);
        console.log(this.$refs.video[0].volume);
        //console.log(document.getElementById("shipin").volume);
        this.shouldMute = false;
        for (let i = 0; i < this.$refs.video.length; i++)
          this.$refs.video[i].volume = 0.25; // 设置视频音量为 25%

        console.log('in v');
        //console.log(this.$refs.video.volume);
        //console.log(document.getElementById("shipin").volume);
        //document.getElementById("shipin").volume = 0.2;
        //console.log(document.getElementById("shipin").volume);

      });
    });
  },
  methods: {
    jumpToUser(user_id) {
      const display_user_url = '/lookPerson/' + user_id;
      window.open(display_user_url, '_self');
    },
    fetchData() {
      let Headers = { 'Authorization': this.$store.getters.getStorage };/*获取token*/
      console.log(Headers);
      axios.get('/super_admin/get_review_video', { headers: Headers })
        .then(response => {
          console.log(response);
          this.complainVideos = [];/*先清空*/
          this.videoNum = '';
          if (response.data.errno == 1) {

            if (response.data.video.length > 0)/*还有视频在审核*/ {
              this.isFinish = false;
              this.videoNum = response.data.video.length;
              response.data.video.forEach((video, index) => {
                this.complainVideos.push(video);/*【这样写】*/
              })
              this.videoNum = this.complainVideos.length;
            }
            else {
              this.isFinish = true;
            }
            console.log('isF:' + this.isFinish);
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
    /*点击取消窗口*/
    CancelDelete() {
      this.reason_textarea = '';
    },
    /*通过该视频*/
    passVideo(video_id) {
      let formData = new FormData();
      formData.append("video_id", video_id);
      formData.append("res", "1");/*通过该视频*/
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
      if (!this.reason_textarea) {
        this.$message.warning('删除原因不能为空，请填写原因');
        return;
      }

      let formData = new FormData();
      formData.append("video_id", video_id);
      formData.append("res", "0");/*拒绝通过该视频*/
      formData.append("reason", this.reason_textarea);
      formData.append("Authorization", this.$store.getters.getStorage);/*Token*/
      axios.post('/super_admin/review_video', formData)
        .then(response => {
          console.log(formData);
          console.log(response);
          if (response.data.errno == 0) {
            console.log('删除成功');
            this.$message.success('删除视频成功');
            //this.$message.success(response.data.msg);
            this.reasonDialog = false;
            this.reason_textarea = '';
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

.textBtn:hover {
  color: rgb(0, 179, 255);
  /*这个颜色比较接近链接的颜色*/
  cursor: pointer;
}

.block {
  border: 2px solid #d0dcdc9a;
  border-radius: 10px;
  padding: 10px 0 10px 0;
  box-shadow: 0 .5px 0 .5px#e7f6f69a;
}

.avatar {
  transition: transform 0.2s;
}

.avatar:hover {
  transform: scale(1.2);
}

.videoTitle {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>