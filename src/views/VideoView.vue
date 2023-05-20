<template>
  <div class="video" title="视频播放页面">
    <el-container>
      <div :style="{ 'width': '80vw', 'margin-top': '30px', 'justify-content': 'center' }" class="mx-auto">
        <v-row>
          <!--左侧-->
          <v-col cols="12" md="8">
            <v-card flat>
              <!--视频head介绍-->
              <v-card-title>
                <!--标题-->
                <v-row align-content="stretch" height="60px">
                  <v-col cols="12" md="12" style="padding-bottom: 0px;" class="playvideo_title">
                    <h2> {{ video.title }}</h2>
                  </v-col>

                  <v-col cols="12" md="12" height="20px">
                    <div class="video_information"
                      style="font-weight: normal;font-size: 17px;color: grey;max-height: 20px;">
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
                <div class="video_player" :style="{ 'margin-top': '15px' }">
                  <video controls style="width:916px;min-height:550px">
                    <source v-bind:src="video.url">
                    </source>
                    <!-- <source src="../assets/hz.mp4">
                  </source> -->
                  </video>
                </div>

                <!--视频功能栏-->
                <v-card>
                  <div class="video_func">
                    <span class="like" style="margin-right:30px">
                      <!-- 获取是否点赞，并在点击时切换状态和更新数量 -->
                      <v-btn icon :color="video.liked ? 'blue' : undefined" @click="likeHandle" size="large"
                        style="width: 50px;height: 50px;">
                        <v-icon style="font-size: 30px;">{{ video.liked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'
                        }}</v-icon>
                      </v-btn>
                      <!--居中看这里-->
                      <p class="d-flex align-center my-auto">{{ video.like_amount }}</p>
                    </span>

                    <span class="star" style="margin-right:30px">
                      <!-- 获取是否收藏，并在点击时切换状态和更新数量 -->
                      <v-btn icon :color="video.stared ? 'blue' : undefined" @click="OpenStarWindow()" size="large"
                        style="width: 50px;height: 50px;">
                        <v-icon style="font-size: 30px;">{{ video.stared ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
                      </v-btn>
                      <p class="d-flex align-center my-auto">{{ video.star_amount }}</p>
                    </span>



                    <!--投诉-->
                    <span title="投诉" class="complaint" @click="Complain()" style="margin-right:30px">
                      <v-btn icon size="large" style="width: 50px;height: 50px;">
                        <v-icon>mdi-alert-outline</v-icon>
                      </v-btn>
                      <p class="d-flex align-center my-auto">稿件投诉</p>
                    </span>

                    <span title="转载声明">
                      <v-btn icon disabled size="large" style="width: 50px;height: 50px;">
                        <v-icon>mdi-cancel</v-icon>
                      </v-btn>
                      <p class="d-flex align-center my-auto">未经许可，不许转载</p>
                    </span>
                  </div>
                </v-card>

                <div class="video_dsp" style="margin-left: 20px;margin-top: 30px;margin-bottom: 50px;">
                  <p>{{ video.description }}</p>
                </div>

                <!--分区-->
                <div class="video_partition">
                  <el-button plain class="v_part_c">{{ video.label }}</el-button>
                  <!-- <v-btn @click="test()">press me</v-btn> -->
                </div>
              </v-card-text>
            </v-card>

            <v-divider height="6" class="mt-4"></v-divider>
            <img src="@/assets/video/picture4.jpeg" style="margin-top: 27px;" width="100%" height="200px"></img>

            <!--评论区-->
            <v-card class="mt-10 mb-10" flat>
              <v-row :style="{ width: '100%' }">
                <v-col style="font-weight: bold;font-size: 20px;">评论 {{ video.comment_amount }}</v-col>
              </v-row>

              <v-row align-content="stretch" :style="{ width: '100%', 'margin-bottom': '15px' }" align="center">
                <!--justify="center"-->
                <!--当前用户头像-->
                <v-col cols="12" md="1" class="d-flex" align="center">
                  <v-avatar>
                    <img :src="video.author_image_url" />
                    <!-- <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"> -->
                  </v-avatar>
                </v-col>
                <!--评论输入框-->
                <v-col cols="12" md="11" align="center" class="d-flex">
                  <!-- <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入内容"
                    v-model="textarea2">
                  </el-input>
                <el-button slot="append" icon="el-icon-search" @click="PostComment()"></el-button> -->
                  <!-- <v-text-field v-model="commentInput" label="写下你的评论..." outlined append-icon="mdi-send"
                    @click:append="postComment" />
                  <v-btn color="primary" @click="postComment">发布</v-btn> -->

                  <!-- <el-input class="comment-input" v-model="comment" placeholder="写下你的评论..."></el-input> -->
                  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea_comment"
                    suffix-icon="el-icon-s-promotion">
                  </el-input>
                  <el-button class="comment-btn" type="primary" @click="PostComment()">发布</el-button>
                </v-col>
              </v-row>

              <v-divider /><!--为了调整样式，之后可以删-->

              <!--评论样式-->

              <v-card v-if="video.comment_cnt_id > 0" flat class="mb-3" @mouseenter="showDelete = true"
                @mouseleave="showDelete = false" v-for="(comment_item, index) in this.comments" :key="index">
                <v-row>
                  <v-col cols="12" md="1">
                    <v-avatar>
                      <img :src="comment_item.avatar_url" />
                    </v-avatar>
                  </v-col>

                  <v-col cols="12" md="11">
                    <!--评论者用户名-->
                    <div style="align-items: center;margin-bottom: 14px;">
                      <span style="font-weight:bolder;font-size: 22px;margin-right: 15px;">
                        {{ comment_item.user_name }}
                      </span>
                      <span style="align-items: center!important;"><el-tag v-if="comment_item.user_id = video.author_id"
                          type="info" effect="plain" size="mini">作者</el-tag></span>
                    </div>

                    <!--一级评论内容-->
                    <div style="">{{ comment_item.content }}</div>
                    <div style="align-items: center;">
                      <scan style="font-size: 14px;color: grey;margin-right: 40px;">
                        {{ comment_item.created_at }}
                      </scan>
                      <scan style="margin-right: 40px;">
                        <el-button type="text" @click="PostReply(comment_item.id)">回复</el-button>
                      </scan>
                      <pan v-if="showDelete"><el-popconfirm title="确定是否删除这条评论？" confirm-button-text='好的'
                          cancel-button-text='不用了'><el-button slot="reference" type="text"
                            @click="deleteComment(comment_id)">删除</el-button></el-popconfirm>
                      </pan>
                    </div>

                    <!--二级评论内容-->
                    <div v-if="comment_item.reply_amount > 0">
                      <v-card flat v-for="(reply_item, r_index) in comment_item.reply" :keys="r_index">
                        <v-row class="mt-4">
                          <!--二级评论用户头像-->
                          <v-col cols="12" md="1">
                            <v-avatar>
                              <img :src="reply_item.avatar_url" />
                            </v-avatar>
                          </v-col>

                          <v-col cols="12" md="11">
                            <!--二级评论者用户名-->
                            <div style="align-items: center;margin-bottom: 14px;">
                              <span style="font-weight:bolder;font-size: 22px;margin-right: 15px;">
                                {{ reply_item.user_name }}
                              </span>
                              <span style="align-items: center!important;"><el-tag
                                  v-if="reply_item.user_id = video.author_id" type="info" effect="plain"
                                  size="mini">作者</el-tag>
                              </span>
                            </div>
                            <!--二级评论内容-->
                            <div>{{ reply_item.content }}</div>
                            <div style="align-items: center;">
                              <scan style="font-size: 14px;color: grey;margin-right: 40px;">{{ reply_item.created_at }}
                              </scan>
                              <span v-if="showDelete"><el-popconfirm title="确定是否删除这条评论？" confirm-button-text='好的'
                                  cancel-button-text='不用了'><el-button slot="reference" type="text"
                                    @click="deleteComment(comment_id)">删除</el-button></el-popconfirm></span>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card>

                      <div v-if="comment_item.reply_amount > 2">
                        <v-row>
                          <p>共{{ comment_item.reply_amount }}条回复，<el-button type="text" @click="">点击查看</el-button></p>
                        </v-row>
                      </div>
                    </div>

                    <v-row>
                      <v-divider height="6" style="margin-top: 20px;"></v-divider>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-card>
          </v-col>

          <!--右侧-->
          <v-col cols="12" md="4">
            <div class="right-col" style="width:100%;margin-left: 30px;">
              <!--作者信息-->
              <v-card flat>
                <div style="margin:15px;margin-top:20px;margin-bottom: 20px;">
                  <v-row style="width:100%;margin-top:10px">
                    <v-col cols="12" md="3">
                      <div style="margin-top: 10px;">
                        <v-avatar>
                          <img :src="video.author_image_url" />
                        </v-avatar>
                      </div>
                    </v-col>

                    <v-col cols="12" md="9">
                      <v-row style="margin-top: 7px;">
                        <div>
                          <!-- <router-link :to="'/user/' + video.author_id">  -->
                          <h1>{{ video.author_name }}</h1>
                          <!-- </router-link> -->
                        </div>
                      </v-row>

                      <v-row>
                        <div style="margin-top: 7px;margin-bottom: 7px;">
                          {{ video.author_description }}
                        </div>
                      </v-row>

                      <v-row>
                        <div style="margin-bottom: 20px;margin-top: 3px">
                          <span v-if="video.isFollowed"> <!--如果已关注-->
                            <v-btn depressed @click="DisFollow">
                              <i class="el-icon-check"></i> 已关注{{ video.author_follower_amount }}
                            </v-btn>
                          </span>
                          <span v-else> <!--如果未关注-->
                            <v-btn depressed color="primary" @click="Follow">
                              +关注 {{ video.author_follower_amount }}
                            </v-btn>
                          </span>
                        </div>
                      </v-row>
                    </v-col>
                  </v-row>
                </div>
              </v-card>

              <!--图片2-->
              <img src="@/assets/video/picture2.jpeg" style="margin-top: 20px;" width="100%" height="200px"></img>
              <v-divider height="6" style="margin-top: 20px;"></v-divider>

              <!--推荐视频列表-->
              <v-card flat>
                <div style="font-size: 18px;margin-top: 20px;">
                  推荐视频列表
                </div>

                <v-card v-for="(recommend_item, index) in this.videos_recommend" :key="index">
                  <div class="recommend_block" style="padding-top: 20px;padding-bottom: 10px;">
                    <v-row>
                      <v-col cols="12" md="6">
                        <img :src="recommend_item.cover_url" width="100%" />
                      </v-col>

                      <v-col class="rec_introdction" cols="12" md="6">
                        <div class="rec_video_title">
                          {{ recommend_item.title }}
                        </div>

                        <div style="margin-top: 10px;margin-bottom: 10px;">
                          <el-tag type="info" effect="plain" size="mini">作者 </el-tag>{{ recommend_item.user_name }}
                        </div>

                        <div>
                          <span style="margin-right: 25px;">
                            <v-icon
                              style="width: 4px;height: 4px;margin-left: 8px;margin-right: 8px;">mdi-motion-play-outline</v-icon>
                            {{ recommend_item.view_amount }}
                          </span>
                          <span>
                            <v-icon
                              style="width: 4px;height: 4px;margin-left: 8px;margin-right: 8px;">mdi-text-box-outline</v-icon>
                            {{ recommend_item.comment_amount }}
                          </span>
                        </div>

                      </v-col>
                    </v-row>
                  </div>
                </v-card>

              </v-card>
            </div>
          </v-col>
        </v-row>
      </div>
    </el-container>

  </div>
</template>



<script>
import axios from 'axios';
//import { request } from 'http';
//import { response } from 'express';
//import { response } from 'express';
//import { request } from 'http';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// import SvgIcon from '@jamescoyle/vue-icon';
// import { mdiAccount } from '@mdi/js';
//import { allowedGetters } from 'video.js/dist/types/tech/middleware';
export default {
  data() {
    return {
      textarea_comment: '',
      showDelete: false,
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
      videoWidth: 0,
      videoHeight: 0,
      video: {
        // path: mdiAccount,
        title: '',
        url: '',
        author_id: '',
        author_name: '',
        author_image_url: '',
        author_description: '',
        author_follower_amount: '',
        isFollowed: false,
        view_amount: '',
        create_time: '',
        like_amount: 0,
        liked: false,
        star_amount: 0,
        stared: false,
        description: '',
        label: '',
        comment_amount: '',
        comment_cnt_id: '',
      },
      /*以下为评论呈现相关的遍历数组*/
      comments: [""],
      videos_recommend: [""],
      /*遍历数组到此结束*/

      /*收藏相关量*/
      StarWindowVisable: false,
      NewStarV: true,
      starbox: [""],
      starTitle: '',

      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
    }
  },
  created() {
    this.fetchVideoData();
  },
  // mounted() { /*计算视频长宽*/
  //   this.$nextTick(() => {
  //     this.updateVideoSize();
  //     window.addEventListener('resize', this.updateVideoSize);
  //   });
  // },
  // beforeDestroy() { /*计算视频长宽*/
  //   window.removeEventListener('resize', this.updateVideoSize);
  // },
  methods: {
    // updateVideoSize() { /*计算视频长宽*/
    //   const video = this.$refs.video;
    //   const videoAspectRatio = video.videoWidth / video.videoHeight;
    //   const containerAspectRatio = 1030 / 830; // 根据容器的宽高比设置，这里为 1030:830
    //   if (videoAspectRatio > containerAspectRatio) {
    //     this.videoWidth = 1030;
    //     this.videoHeight = 1030 / videoAspectRatio;
    //   } else {
    //     this.videoWidth = 830 * videoAspectRatio;
    //     this.videoHeight = 830;
    //   }
    //   console.log(this.videoWidth,this.videoHeight);
    // },
    onSubmit() {
      console.log('submit!');
    },
    test() {
      console.log(this.$route.params.id)
    },
    fetchVideoData() {
      /*获取视频详情页相关数据（在刷新时加载一次）*/
      // axios.get('/videos/view_video', { params: { video_id: 1 } }) //之后把这个换成参数
      axios.get('/videos/view_video', { params: { video_id: this.$route.params.id } })
        .then(response => {
          console.log(response);
          console.log(this.$route.params.id)
          // if(response.errno == 0) {
          //   alert(response.data.msg);
          // }else {
          //   alert(response.data.errno);
          //   alert(response.data.msg);
          // }

          this.video.title = response.data.video.title;
          this.video.author_id = response.data.video.user_id;
          this.video.author_name = response.data.video.user_name;
          this.video.author_image_url = response.data.video.avatar_url;//这部分还没有？？是这个吗？？
          this.video.author_description = response.data.video.user_description;
          this.video.author_follower_amount = response.data.video.follower_amount;
          //this.video.isFollowed=response.data.video.1;

          this.video.view_amount = response.data.video.view_amount;
          this.video.create_time = response.data.video.created_at;
          this.video.comment_amount = response.data.video.comment_amount;
          this.video.comment_cnt_id = response.data.video.comment.legth;

          this.video.url = response.data.video.video_url;
          this.video.like_amount = response.data.video.like_amount;
          //this.video.liked=response.data.liked;
          this.video.star_amount = response.data.video.fav_amount;
          //this.video.stared=response.data.;//还没有

          this.video.description = response.data.video.description;
          this.video.label = response.data.video.label;
          //console.log("xxx" + this.video.url)
          /*遍历获取所有一级评论*/

          //console.log(this.video.comment_cnt_id);
          //console.log(response.data.comment.length);
          if (response.data.comment.length > 0) {
            response.data.comment.forEach((comment, index) => {
              this.comments[index] = comment;
            })
          }
        })
        .catch(error => {
          console.log(error);
        })

      /*获取推荐视频列表*/
      axios.get('/videos/get_related_video', { params: { video_id: this.$route.params.id, num: 15 } })
        .then(response => {
          console.log(response);
          response.data.video.forEach((video, index) => {
            this.videos_recommend[index] = video;
          })
        })
        .catch(error => {
          console.log(error);
        })
    },
    likeHandle() { /*处理用户是否已点赞该视频*/
      var self = this;//
      axios.post('/videos/like_video', { params: { video_id: this.$route.params.id } }) //往后端传数据有问题
        .then(function (response) {
          console.log(response);

          if (response.data.errno == 1016) /*用户未登录*/ {
            self.$message.warning("请先登录！");
            self.$router.push('/login');
            return;
          }

          /*如果是实时更新（async？），就不需要这一段；如果是手动刷新才更新，就需要以下这段*/
          if (self.$data.video.liked) {
            self.$data.video.liked = false;
            self.$data.video.like_amount -= 1;
          }
          else {
            self.$data.video.liked = true;
            self.$data.video.like_amount += 1;
          }//这个行为要在这里立刻传回后端吗？还是已经改变了呢？
        })
        .catch(function (error) {
          console.log('Error: ' + error);
        });
    },
    /*点击收藏键，打开收藏夹*/
    OpenStarWindow() {
      StarWindowVisable = true;
      axios.get('/videos/get_favorite')
        .then(reponse => {
          console.log(response);
          /*下面这个待完善，获取所有收藏夹的名字和该视频在收藏夹中的情况*/
          response.data.favorite_id.forEach((favorite_id, index) => {
            this.starbox[index] = favorite_id;

          }).catch(error => {
            console.log(error);
          })
        })
    },
    /*创建新的收藏夹*/
    CreateStar() {
      axios.get('/videos/create_favorite', { params: { title: this.$data.starTitle } })
        .then(reponse => {
          console.log(response);
          /*Q??【需要立刻显示，这个该怎么实现】*/
        })
        .catch(error => {
          console.log(error);
        })
      NewStarV = true;
      starTitle = '';
    },
    StarHandle() { //点击收藏键触发
      //先发送，再获取？？
      if (this.$data.video.stared) {
        this.$data.video.stared = false;
        this.$data.video.star_amount -= 1;
      }
      else {
        this.$data.video.stared = true;
        this.$data.video.star_amount += 1;
      }//这个行为要在这里立刻传回后端吗？还是已经改变了呢？

      var self = this;//这两个this不是一个this吧
      axios.post('/videos/favorite_video', { params: { video_id: this.$route.params.id, favorite_id: 1 } }) //往后端传数据有问题
        .then(function (response) {
          console.log(response);
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
        /*投诉视频接口*/
        /*axios.post()*/
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
      /*标记投诉状态？？*/
    },
    PostComment() { //这个是发布评论的接口
      /*判断当前是否登录*/

      /*判断评论输入框内容是否为空*/
      if (!this.textarea_comment)//content为空
      {
        this.$message({
          message: '评论不能为空',
          type: 'warning'
        });
        return;
      }

      var request = {
        video_id: this.$route.params.id,
        content: this.textarea_comment,
      };
      axios.post('/videos/comment_video', { params: request }) //往后端传数据有问题
        .then(response => {
          console.log(request);
          console.log(response);
          this.textarea_comment = ''; /*清空评论输入框*/
        })
        .catch(error => {
          console.log('Error: ' + error);
          this.$message({
            message: '发生错误，评论失败',
            type: 'info'
          });
        });
    },
    popInput() { /*弹出评论框*/

    },//可以删
    /*删除评论*/
    deleteComment(comment_id) {
      /*判断是否登录*/
      /*判断是否有删除权限*/
      axios.post('/videos/delete_comment', { params: { comment_id: 1 } })/*需把1改了*/
        .then(response => {
          console.log(reponse);
        })
        .catch(error => {
          console.log('Error: ' + error);
        });
    },
    /*回复一级评论*/
    PostReply(comment_id) {
      if (!this.textarea_comment)//content为空
      {
        this.$message({
          message: '评论不能为空',
          type: 'warning'
        });
        return;
      }

      var request = {
        comment_id:comment_id, /*所回复的一级评论的id；到底要不要独立有待商榷*/
        content: this.$data.textarea_comment,
        video_id: this.$route.params.id,
      };
      axios.post('/videos/reply_comment', { params:request}) //往后端传数据有问题
        .then(response => {
          console.log(request);
          console.log(response);
          this.textarea_comment = '';
        })
        .catch(error => {
          console.log('Error: ' + error);
          this.$message({
            message: '发生错误，评论失败',
            type: 'info'
          });
        });
    },
    /*删除回复*/
    DeleteReply() {
      ;
    },
    /*关注视频作者*/
    Follow() {
      axios.post('/account/create_follow', { params: { id: 1, following_id: 1 } })//??
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log('Error: ' + error);
        });
      this.$data.video.isFollowed = true;
      this.$data.video.author_follower_amount++;
    },
    /*取关视频作者*/
    DisFollow() {
      axios.post('/account/remove_follow', { params: { id: 1, following_id: 1 } })//??
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log('Error: ' + error);
        });
      this.$data.video.isFollowed = false;
      this.$data.video.author_follower_amount--;
    }

    // submitComment() {
    //   this.submittingComment = true;
    //   // 发布评论逻辑
    //   setTimeout(() => {
    //     this.commentInput = "";
    //     this.submittingComment = false;
    //   }, 1000);
    // },
  }
}
</script>

<style>
/* .video {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  min-height: 100vh;
  width: 80%;
  margin-right: 20px;
} */

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

.playvideo_title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.video_show {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

/* .player {
  display: flex;
} */

.video_player {
  border: 1px solid gray;
  display: inline-block;
}

.video_player video {
  display: flex;
  width: 802px;
  height: 400px;
  padding-top: 20px;
  padding-bottom: 15px;
}

.video_func {
  box-sizing: content-box;
  border-bottom: 1px solid var(--line_regular);
  padding-top: 16px;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  height: 100%;
  flex-direction: row;
  padding-left: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.video_func>span {
  white-space: nowrap;
  position: relative;
  display: inline-flex;
  align-items: center;
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

/* .recommend_block {
  border: 1px solid gray;
  display: inline-block;
} */

.rec_video_title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
