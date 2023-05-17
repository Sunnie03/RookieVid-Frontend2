<template>
  <div class="video" title="视频播放页面">
    <v-container>
      <div :style="{ 'width': '80vw', 'margin-top': '30px' }" class="mx-auto">

        <!--左侧-->
        <v-row>
          <v-col cols="12" md="9">
            <v-card class="mt-10 mx-auto" min-height="60vh" outlinedflat>
              <!--视频head介绍-->
              <v-card-title>

                <!--标题-->
                <v-row :style="{width:'100%'}">
                  <v-col>
                    <h2> {{ video.title }}</h2>
                  </v-col>
                  </v-row>
                
                <v-row>
               
                  <v-col >
                    <div style="font-weight: normal;font-size: 17px;color: grey;">
                      <!--发布时间-->
                      <span style="margin-right: 20px;">
                        <v-icon
                          style="width: 8px;height: 8px;margin-left: 8px;margin-right: 8px;">mdi-clock-time-nine-outline</v-icon>
                        {{
                          video.create_time }}
                      </span>

                      <!--观看次数-->
                      <span style="margin-right: 20px;">
                        <v-icon
                          style="width: 8px;height: 8px;margin-left: 8px;margin-right: 8px;">mdi-motion-play-outline</v-icon>
                        {{
                          video.view_amount }}
                      </span>

                      <!--评论数量-->
                      <span style="margin-right: 20px;">
                        <v-icon
                          style="width: 7px;height: 7px;margin-left: 8px;margin-right: 8px;">mdi-text-box-outline</v-icon>
                        {{
                          video.comment_amount }}
                      </span>
                    </div>
                  </v-col>
                </v-row>


              </v-card-title>


              <v-card-text>
                <!--视频播放器-->
                <!-- <v-card> -->
                <v-row>
                  <div class="player" style="margin: 20px;">
                    <video controls style="justify-content: center;width:1300px;height:650px">
                      <source v-bind:src="video.url">
                      </source>
                      <!-- <source src="../assets/hz.mp4">
                  </source> -->
                    </video>
                  </div>
                </v-row>
                <!-- </v-card> -->

                <!--视频功能栏-->
                <v-card>
                  <div class="video_func">

                    <span title="点赞" class="like"><!-- style=" display: flex;flex-direction: column; //按行从上到下"-->
                      <v-card-actions>
                      <div>
                        <!-- 获取是否点赞，并在点击时切换状态和更新数量 -->
                        <v-btn icon :color="video.liked ? 'blue' : undefined" @click="likeHandle" size="large"
                          style="width: 50px;height: 50px;">
                          <v-icon style="font-size: 30px;">{{ video.liked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'
                          }}</v-icon>
                        </v-btn>
                      </div>
                      <div>
                        <!--居中看这里-->
                        <p class="d-flex align-center my-auto">{{ video.like_amount }}</p>
                      </div>
                      </v-card-actions>
                    </span>

                    <span title="收藏" class="star">
                      <!-- 获取是否收藏，并在点击时切换状态和更新数量 -->
                      <v-btn icon :color="video.stared ? 'blue' : undefined" @click="StarHandle" size="large"
                        style="width: 50px;height: 50px;">
                        <v-icon style="font-size: 30px;">{{ video.stared ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
                      </v-btn>
                      <div>
                        <p>{{ video.star_amount }}</p>
                      </div>
                    </span>

                    <span title="投诉" class="complaint" @click="Complain" style="align-items: center;">
                      <v-btn icon size="large" style="width: 50px;height: 50px;">
                        <v-icon>mdi-alert-outline</v-icon>
                      </v-btn>
                      <p style="display=flex;align-items: center;">稿件投诉</p>
                    </span>

                    <span title="转载声明">
                      <v-btn icon disabled size="large" style="width: 50px;height: 50px;">
                        <v-icon>mdi-cancel</v-icon>
                      </v-btn>
                      <p>未经许可，不许转载</p>
                    </span>

                    <!-- <span title="分享" class="share">
                  <img class="img_func" src="@/assets/video/icon_04.png" alt="" />
                </span> -->
                  </div>
                </v-card>
                <!-- <v-card> -->
                <div class="introduction">
                  <p>视频简介{{ video.description }}</p>
                  <p>......</p>
                </div>

                <!--分区-->
                <div class="video_partition">
                  <el-button plain class="v_part_c">分区{{ video.label }}</el-button>
                  <!-- <v-btn @click="test()">press me</v-btn> -->
                </div>

              </v-card-text>
            </v-card>

            <v-divider height="6" class="mt-4"></v-divider>

            <!-- </v-card> -->

            <!--评论区-->
            <v-card class="mt-10 mb-10" flat>
              <v-row class="ptl-3">
                <v-col cols="12" md="1">评论 10 <!--{{ video.comments.review_amount }}--></v-col>
              </v-row>

              <v-row class="pa-4">
                <v-col cols="12" md="1">
                  <v-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                  </v-avatar>
                </v-col>
                <!--评论输入框-->
                <v-col cols="12" md="5">
                  <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入内容"
                    v-model="textarea2">
                  </el-input>
                </v-col>
                <v-col cols="12" md="1">
                  <el-button slot="append" icon="el-icon-search" @click="PostComment()"></el-button>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="1">
                  <v-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                  </v-avatar> </v-col>
                <v-col cols="12" md="5">
                  <h2>lllll</h2>
                  <!-- <p>1,000,000 subscribers</p> -->
                  <!-- <br /> -->
                  <scan>你好！</scan>
                  <br></br>
                  <scan>2023-05-15 14:21{{ video.comments.created_at }}</scan>
                  <scan> <el-link type="primary">回复</el-link></scan>

                  <v-row class="mt-4">
                    <br />
                    <v-col cols="12" md="1">
                      <v-avatar>
                        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                      </v-avatar>
                    </v-col>
                    <v-col cols="12" md="4">
                      <h3>llll</h3>
                      <scan>这条是在回复评论</scan>
                    </v-col>
                  </v-row>

                  <v-row>
                    <p>共1条回复，点击查看</p>
                  </v-row>

                  <v-row>
                    <v-divider height="6" class="ma-2"></v-divider>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!--右侧-->
          <v-col cols="12" md="3">
            <div>
              <v-card>
                <v-card-title><h3>我是右侧</h3></v-card-title>

                <el-button icon="el-icon-user" circle></el-button>
                {{ video.author_name }}

              </v-card>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="8">
            lll
          </v-col>
          <v-col cols="12" md="4">
            aaa
          </v-col>
        </v-row>

      </div>
    </v-container>

    <!-- <v-app-bar app bottom>
      lll
    </v-app-bar> -->

  </div>
</template>



<script>
import axios from 'axios';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// import SvgIcon from '@jamescoyle/vue-icon';
// import { mdiAccount } from '@mdi/js';
//import { allowedGetters } from 'video.js/dist/types/tech/middleware';
export default {
  data() {
    return {
      textarea2: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      video: {
        // path: mdiAccount,
        title: '',
        url: '',
        author_id: '',
        author_name: '',
        author_image: '',
        view_amount: '',
        create_time: '',
        like_amount: 0,
        liked: false,
        star_amount: 0,
        stared: false,
        comments: {
          user_id: '',
          video_id: '',
          content: '',
          created_at: '',
        },
        description: '',
        label: '',
        comment_amount: '',
      },
    }
  },
  created() {
    this.fetchVideoData();
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    test() {
      console.log(this.$route.params.id)
    },
    fetchVideoData() {
      axios.get('/videos/view_video', { params: { video_id: 1 } })
        // axios.get('videos/view_video', { params: { video_id: this.$route.params.id } })
        .then(response => {
          //console.log()
          console.log(response);
          // if(response.errno == 0) {
          //   alert(response.data.msg);
          // }else {
          //   alert(response.data.errno);
          //   alert(response.data.msg);
          // }

          this.video.title = response.data.video.title;
          this.video.author_id = response.data.video.user_id;
          this.video.author_name = response.data.video.user_name;
          this.video.author_image = response.data.video.avatar_url;//这部分还没有？？是这个吗？？

          this.video.view_amount = response.data.video.view_amount;
          this.video.create_time = response.data.video.created_at;
          this.video.comment_amount = response.data.video.comment_amount;

          this.$data.video.url = response.data.video.video_url;
          this.video.like_amount = response.data.video.like_amount;
          //this.video.liked=response.data.liked;
          this.video.star_amount = response.data.video.fav_amount;
          //this.video.stared=response.data.;//还没有

          this.video.description = response.data.video.description;
          this.video.label = response.data.video.label;

          //this.video.comments = response.data.video.comments;
        })
        .catch(error => {
          console.log(error);
        });
    },
    likeHandle() {
      if (this.$data.video.liked) {
        this.$data.video.liked = false;
        this.$data.video.like_amount -= 1;
      }
      else {
        this.$data.video.liked = true;
        this.$data.video.like_amount += 1;
      }//这个行为要在这里立刻传回后端吗？还是已经改变了呢？

      var self = this;//
      axios.post('videos/like_video', { params: { video_id: this.$route.params.id } }) //往后端传数据有问题
        .then(function (response) {
          console.log(response);
          //self.$data.video.liked = response.data.liked;//确定不是反过来吗???
          //self.liked = response.data.liked;//确定不是反过来吗???
          //self.$data.video.like_amount = response.data.like_amount; //这个和上面的那个写法哪一个是对的？？？
        })
        .catch(function (error) {
          console.log('Error: ' + error);
        });
    },
    StarHandle() {
      if (this.$data.video.stared) {
        this.$data.video.stared = false;
        this.$data.video.star_amount -= 1;
      }
      else {
        this.$data.video.stared = true;
        this.$data.video.star_amount += 1;
      }//这个行为要在这里立刻传回后端吗？还是已经改变了呢？

      var self = this;//这两个this不是一个this吧
      axios.post('videos/favorite_video', { params: { video_id: this.$route.params.id, } }) //往后端传数据有问题
        .then(function (response) {
          console.log(response);
          self.$data.video.stared = response.data.stared;//确定不是反过来吗???
          self.$data.video.star_amount = response.data.fav_amount;
        })
        .catch(function (error) {
          console.log('Error: ' + error);
        });
    },
    Complain() {
      this.$prompt('请输入投诉原因', '稿件投诉', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '您的投诉已成功发送，正在等待管理员审核'
        });
        //然后在这里发送回后端吗？
        //axios.???
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消投诉'
        });
      });
    },
    PostComment() {
      var self = this;//
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1; // 月份从 0 开始计算
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      //var second = date.getSeconds();
      var date_time = `${year}-${month}-${day} ${hour}:${minute}`;

      axios.post('videos/comment_video', { params: { video_id: this.$route.params.id, content: this.$data.textarea2, created_at: date_time } }) //往后端传数据有问题
        .then(function (response) {
          console.log(response);
          // self.$data.video.comments.video_id = response.data.;//确定不是反过来吗???
          // self.$data.video.comments.user_id=;
          // self.$data.video.comments.content=;
          // self.$data.video.comments.created_at;
        })
        .catch(function (error) {
          console.log('Error: ' + error);
        });
    }
  }
}
</script>

<style>
.video {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  min-height: 100vh;
  width: 80%;
  margin-right: 20px;
}

.info {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  padding: 20px;
  /*有什么用吗？*/
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.authorPhoto {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* float: inline-end; */
  flex: 1;
}

.video_show {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.player {
  /* display: flex; */
  display: flex;
  justify-content: center;
}

.player video {
  display: flex;
  width: 1300px;
  height: 650px;
  padding: 10px;
}

.video_func {
  box-sizing: content-box;
  border-bottom: 1px solid var(--line_regular);
  padding-top: 16px;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  height: 100%;
  /* height: 28px; */
  /* line-height: 28px; */
  /**/
  flex-direction: row;
  padding-left: 30px;
  /* justify-content: space-between;
  position: relative; */
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.video_func>span {
  width: 92px;
  margin-right: 8px;
  white-space: nowrap;
  position: relative;
  display: inline-flex;
  align-items: center;
  /* flex: 1; */
  fill: var(--text2);
}

.img_func {
  height: 50px;
  line-height: 50px;
}

.introduction {
  width: 600px;
  padding-left: 50px;
  padding-top: 15px;
  padding-bottom: 15px;
  box-sizing: border-box;
}

.video_partition {
  margin: 20px;
}

.v_part_c.el-button {
  background-color: #d6feff !important;
  margin: 5px;
}

.comment {
  display: flex;
  margin-top: 20px;
  margin-left: 50px;
  z-index: 0;
  position: relative;
}

.comment-header {
  flex-direction: row;
}

.comment-title {
  flex-direction: row;
  flex: 1;
}

.comment-count {
  flex-direction: row;
  flex: 1;
}
</style>
