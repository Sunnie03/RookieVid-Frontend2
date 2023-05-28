<template>
  <div class="admin_complain">

    <!--导航栏-->
    <AdminHeader />
    <!--管理栏的导航栏-->
    <AdminGuide />

    <el-container>
      <div :style="{ 'width': '60vw', 'margin-top': '30px', 'justify-content': 'center' }" class="mx-auto">
        <div style="margin-bottom: 10px;font-weight: 500;font-size: 22px;">
          <p>全部视频 &nbsp;&nbsp;共{{ amount }}条</p>
        </div>

        <!--for循环-->
        <v-card v-for="(video_item, index) in complainVideos" :key="index" flat>
          <v-row>
            <v-col cols="12" md="5">
              <div class="complained_video_block" style="padding-left: 20px;margin-bottom: 20px;padding-right: 9px;">
                <v-row>
                  <v-col cols="12" md="4">
                    <img :src="video_item.cover_url" width="100%" height="120px" />
                  </v-col>

                  <v-col class="complain_introdction" cols="12" md="7">
                    <div class="complain_video_title" v-bind:title="video_item.title"
                      style="font-weight: 400;font-size: 18px;">
                      <span>{{ video_item.title }}</span>
                    </div>

                    <div style="margin-top: 10px;margin-bottom: 10px;color:rgb(109, 106, 106);font-size: 14px;">
                      <span class="video_author textBtn" v-bind:title="'作者: ' + video_item.user_name"> <el-tag
                          effect="plain" size="mini">作者 </el-tag>
                        {{
                          video_item.user_name }}</span>
                    </div>

                    <div style="margin-bottom: 10px;color:rgb(109, 106, 106);font-size: 14px;">
                      上传时间：{{ video_item.created_at }}
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
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-col>

            <!--投诉信息-->
            <v-col cols="12" md="6">
              <div class="comlain_info">
                <div style="font-weight:bold;font-size: 18px;">投诉列表</div>

                <div class="complain_block" style="color:rgb(109, 106, 106);padding-bottom:10px;"
                  v-for="(c_item, c_index) in video_item.complain" :key="c_index">

                  <div ref="show_block">
                    <div style="margin-top: 10px;margin-bottom: 10px;color:rgb(109, 106, 106);font-size: 14px;">
                      <span class="video_author textBtn" v-bind:title="'作者: ' + c_item.user_name"> <el-tag type="danger"
                          effect="plain" size="mini">投诉用户 </el-tag>&nbsp;
                        {{
                          c_item.username }}</span>
                    </div>

                    <div>
                      <i>投诉理由</i>{{ c_item.reason }}
                    </div>
                    <div>
                      投诉时间{{ c_item.created_at }}
                    </div>
                  </div>
                </div>
              </div>
            </v-col>

            <v-col cols="12" md="1">
              <span>
                <!--将被投诉视频加入待审核列表，和投稿视频一起重新审核-->
                <el-button type="primary" plain @click="reviewComplainVideo(video_item.id)">重置</el-button>
              </span>
              <span>
                <!--将被投诉视频删除，和投稿视频一起重新审核-->
                <el-button type="primary" plain @click="deleteComplainVideo(video_item.id)">删除</el-button>
              </span>
            </v-col>
          </v-row>

          <v-divider style="margin-top: 0px;" />

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
      amount: '',
    }
  },
  created() {
    this.fetchData();
  },
  mounted() {
    /*获取div块高度*/
    setTimeout(() => {
      this.$nextTick(() => {
        console.log(this.$refs.show_block);
        const divHeight = this.$refs.show_block[0].offsetHeight;
        // console.log(div.clientHeight); // 打印div元素的高度
        console.log(divHeight); // 也可以使用offsetHeight属性获取高度
      });
    }, 1000);
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
            //this.$set(this,this.amount,this.complainVideos.length);
            this.amount = this.complainVideos.length;
            console.dir(this.complainVideos);
          }
          else {
            this.$message.warning(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    /*重置*/
    reviewComplainVideo(video_id) {
      let formData = new FormData();
      formData.append("video_id", video_id);
      formData.append("op", "review");
      formData.append("Authorization", this.$store.getters.getStorage);/*Token*/
      axios.post('/super_admin/review_complain_video', formData)
        .then(response => {
          console.log(formData);
          console.log(response);
          if (response.data.errno == 0) {
            console.log('重置成功');
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
            message: '发生错误，重置投诉视频失败',
            type: 'warning'
          });
        });
    },
    /*删除视频*/
    deleteComplainVideo(video_id) {
      let formData = new FormData();
      formData.append("video_id", video_id);
      formData.append("op", "delete");
      formData.append("Authorization", this.$store.getters.getStorage);/*Token*/
      axios.post('/super_admin/review_complain_video', formData)
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
            message: '发生错误，删除投诉视频失败',
            type: 'warning'
          });
        });
    },
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

/* .show_video_block {
  border: 2px solid #d0dcdc9a;
  border-radius: 10px;
  padding: 10px 0 10px 0;
  box-shadow: 0 .5px 0 .5px#e7f6f69a;
} */

.video_cover {
  border-radius: 10px;
}

.complain_video_title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
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
.complain_video_title:hover {
  color: rgb(11, 168, 235);
}

.textBtn:hover {
  color: rgb(0, 179, 255);
  /*这个颜色比较接近链接的颜色*/
}
</style>