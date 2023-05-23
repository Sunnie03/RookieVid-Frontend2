<template>
  <div class="video">
    <!--引入导航栏-->
    <Header />
    <!--视频界面-->
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
                  <v-col cols="12" md="12" style="padding-bottom: 0px;" class="playvideo_title"
                    v-bind:title="video.title">
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
                          video.total_comment_amount }}
                      </span>
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>

              <v-card-text>
                <!--视频播放器-->
                <div class="video_player" :style="{ 'margin-top': '15px' }">
                  <video controls style="width:916px;min-height:550px">
                    <!-- <source v-bind:src="video.url">
                    </source> -->
                    <source src="../assets/hz.mp4"/>
                    <!--【有问题，本地也播放不了】-->
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
                      <!--##【这个点击收藏触发的动作待完善】-->
                      <v-btn icon :color="video.stared ? 'blue' : undefined"
                        @click="starDialogVisible = true; getStarList()" size="large" style="width: 50px;height: 50px;">
                        <v-icon style="font-size: 30px;">{{ video.stared ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
                      </v-btn>
                      <p class="d-flex align-center my-auto">{{ video.star_amount }}</p>
                    </span>

                    <!--收藏夹弹出对话框-->
                    <el-dialog title="添加到收藏夹" :visible.sync="starDialogVisible" width="20%" height="auto" center>
                      <!--收藏夹展示-->
                      <el-scrollbar style="max-height:100%;overflow:auto;">
                        <div class="starListShow">
                          <el-checkbox-group v-model="starHavedList">
                            <div v-for="(item, index) in starList" :key="index" style="padding-top: 10px;">
                              <el-checkbox :label="item">收藏夹{{ item }}</el-checkbox>
                            </div>
                          </el-checkbox-group>
                        </div>
                        <div>
                          <div v-if="newStarInput" style="display:flex;margin-top: 15px;">
                            <div style="flex:2;">
                              <el-input type="text" placeholder="最多可输入20个字" v-model="starCreateNewInput" maxlength="20"
                                show-word-limit>
                              </el-input>
                            </div>
                            <div style="flex:0;">
                              <el-button slot="append" @click="createFav(starCreateNewInput)">新建</el-button>
                            </div>
                          </div>
                          <div v-else class="starCreateNewDiv" @click="newStarInput = true">
                            <i class="el-icon-plus" style="margin-left: 5px;margin-right: 5px;"></i> 新建收藏夹
                          </div>
                        </div>
                      </el-scrollbar>
                      <!--收藏夹的对话框底部-->
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="starDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="starDialogVisible = false">确 定</el-button>
                      </span>
                    </el-dialog>

                    <!--投诉-->
                    <span class="complaint" style="margin-right:30px">
                      <v-btn icon :color="video.complained ? 'blue' : undefined" @click="Complain()" size="large"
                        style="width: 50px;height: 50px;">
                        <v-icon>mdi-alert-outline</v-icon>
                      </v-btn>
                      <p class="d-flex align-center my-auto">稿件投诉</p>
                    </span>

                    <!--转载声明-->
                    <span title="转载声明">
                      <v-btn icon disabled size="large" style="width: 50px;height: 50px;">
                        <v-icon>mdi-cancel</v-icon>
                      </v-btn>
                      <p class="d-flex align-center my-auto">未经许可，不许转载</p>
                    </span>
                  </div>
                </v-card>

                <!--视频文字描述-->
                <div class="video_dsp" style="margin-left: 20px;margin-top: 30px;margin-bottom: 50px;">
                  <p>{{ video.description }}</p>
                </div>

                <!--视频分区-->
                <div class="video_partition">
                  <el-button plain class="v_part_c">{{ video.label }}</el-button>
                </div>
              </v-card-text>
            </v-card>

            <!--分隔美化-->
            <v-divider height="6" class="mt-4"></v-divider>
            <img src="@/assets/video/picture4.jpeg" style="margin-top: 27px;" width="100%" height="200px"></img>

            <!--评论区-->
            <v-card class="mt-10 mb-10" flat>
              <v-row :style="{ width: '100%' }">
                <v-col style="font-weight: bold;font-size: 20px;">评论 {{ video.total_comment_amount }}</v-col>
              </v-row>

              <!--评论区头-->
              <v-row align-content="stretch" :style="{ width: '100%', 'margin-bottom': '15px' }" align="center">
                <!--justify="center"-->
                <!--当前用户头像-->
                <v-col cols="12" md="1" class="d-flex" align="center">
                  <v-avatar>
                    <img :src="video.author_image_url" />
                  </v-avatar>
                </v-col>
                <!--一级评论输入框-->
                <v-col cols="12" md="11" align="center" class="d-flex">
                  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea_comment"
                    suffix-icon="el-icon-s-promotion">
                  </el-input>
                  <el-button class="comment-btn" type="primary" @click="PostComment()">发布</el-button>
                </v-col>
              </v-row>

              <v-divider /><!--为了调整样式，之后可以删-->

              <!--评论样式-->
              <v-card v-if="video.total_comment_amount" flat class="mb-3" @mouseenter="showDelete = true"
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
                      <!--作者的tag-->
                      <span style="align-items: center!important;"><el-tag v-if="comment_item.user_id = video.author_id"
                          type="info" effect="plain" size="mini">作者</el-tag></span>
                    </div>

                    <!--一级评论内容-->
                    <div style="">{{ comment_item.content }}</div>
                    <!--一级评论时间【需要精确到什么程度？】-->
                    <div style="align-items: center;">
                      <span style="font-size: 14px;color: grey;margin-right: 40px;">
                        {{ comment_item.created_at.split('T')[0] }}
                      </span>

                      <!--回复键，点击弹出reply的输入框-->
                      <span style="margin-right: 40px;">
                        <el-button type="text" @click="PopInput(index)">回复</el-button>
                      </span>

                      <!--删除一级评论-->
                      <span v-if="showDelete"><!--如果删除键可以看到-->
                        <el-popconfirm title="确定是否删除这条评论？" confirm-button-text='确定' cancel-button-text='取消'>
                          <el-button slot="reference" type="text" @click="deleteComment()">删除</el-button>
                        </el-popconfirm>
                      </span>
                    </div>

                    <!--二级评论内容-->
                    <div v-if="comment_item.reply_amount"> <!--如果该一级评论的二级评论数量大于0，才显示二级评论-->
                      <div v-if="comment_item.reply_amount <= 2"> <!--【二级评论数量<=2，无需折叠，正常循环数组】-->
                        <v-card flat v-for="(reply_item, r_index) in comment_item.reply" :keys="r_index">
                          <v-row class="mt-4">
                            <!--二级评论用户头像-->
                            <v-col cols="12" md="1">
                              <v-avatar size="40">
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
                                <span style="font-size: 14px;color: grey;margin-right: 40px;">{{
                                  reply_item.created_at.split('T')[0] }}
                                </span>
                                <span v-if="showDelete"><el-popconfirm title="确定是否删除这条评论？" confirm-button-text='好的'
                                    cancel-button-text='不用了'><el-button slot="reference" type="text"
                                      @click="deleteComment(comment_id)">删除</el-button></el-popconfirm></span>
                              </div>
                            </v-col>
                          </v-row>
                        </v-card>
                      </div>

                      <!--代码分隔-->
                      <div v-else> <!--reply数量大于2【这时需要考虑到底是否展开】-->
                        <div v-if="display_comment[index]"><!--【若为true】则该条一级评论需要显示所有的reply-->
                          <!--小于6条，没有分页【分页显示待完善】-->
                          <!-- <div v-if="display_comment[index]<6"> -->
                          <v-card flat v-for="(reply_item, r_index_dis) in comment_item.reply" :key="r_index_dis">
                            <!--指定从2开始循环-->
                            <v-row class="mt-4">
                              <!--二级评论用户头像-->
                              <v-col cols="12" md="1">
                                <v-avatar size="40">
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
                                  <span style="font-size: 14px;color: grey;margin-right: 40px;">{{
                                    reply_item.created_at.split('T')[0]
                                  }}
                                  </span>
                                  <span v-if="showDelete"><el-popconfirm title="确定是否删除这条评论？" confirm-button-text='好的'
                                      cancel-button-text='不用了'><el-button slot="reference" type="text"
                                        @click="deleteComment(comment_id)">删除</el-button></el-popconfirm></span>
                                </div>
                              </v-col>
                            </v-row>
                          </v-card>
                          <!-- </div> -->
                          <!--大于6条，有分页，一页6条【还没想好分页要怎么写，待后续完善】-->
                          <!-- <div v-else>
                            <el-pagination :current-page="currentPage[index]" :page-size="5" :total="comment.replies.length" @current-change="handlePageChange(index, $event)">
                            </el-pagination>
                          </div> -->

                        </div>
                        <div v-else> <!--只显示前两条reply，而且要有“查看“-->
                          <v-card flat v-for="(reply_item, r_index) in comment_item.reply.slice(0, 2)" :keys="r_index">
                            <v-row class="mt-4">
                              <!--二级评论用户头像-->
                              <v-col cols="12" md="1">
                                <v-avatar size="40">
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
                                  <span style="font-size: 14px;color: grey;margin-right: 40px;">{{
                                    reply_item.created_at.split('T')[0]
                                  }}
                                  </span>
                                  <span v-if="showDelete"><el-popconfirm title="确定是否删除这条评论？" confirm-button-text='好的'
                                      cancel-button-text='不用了'><el-button slot="reference" type="text"
                                        @click="deleteComment(comment_id)">删除</el-button></el-popconfirm></span>
                                </div>
                              </v-col>
                            </v-row>
                          </v-card>
                          <!--“查看”-->
                          <div>
                            <p>共{{ comment_item.reply_amount }}条回复，<el-button type="text"
                                @click="display_comment[index] = true">点击查看</el-button></p>
                          </div>
                        </div>
                      </div>

                      <!--显示所有的评论，注释掉-->
                      <!-- <v-card flat v-for="(reply_item, r_index) in comment_item.reply" :keys="r_index">
                        <v-row class="mt-4"> -->
                      <!--二级评论用户头像-->
                      <!-- <v-col cols="12" md="1">
                            <v-avatar size="40">
                              <img :src="reply_item.avatar_url" />
                            </v-avatar>
                          </v-col>

                          <v-col cols="12" md="11"> -->
                      <!--二级评论者用户名-->
                      <!-- <div style="align-items: center;margin-bottom: 14px;">
                              <span style="font-weight:bolder;font-size: 22px;margin-right: 15px;">
                                {{ reply_item.user_name }}
                              </span>
                              <span style="align-items: center!important;"><el-tag
                                  v-if="reply_item.user_id = video.author_id" type="info" effect="plain"
                                  size="mini">作者</el-tag>
                              </span>
                            </div> -->
                      <!--二级评论内容-->
                      <!-- <div>{{ reply_item.content }}</div>
                            <div style="align-items: center;">
                              <span style="font-size: 14px;color: grey;margin-right: 40px;">{{ reply_item.created_at }}
                              </span>
                              <span v-if="showDelete"><el-popconfirm title="确定是否删除这条评论？" confirm-button-text='好的'
                                  cancel-button-text='不用了'><el-button slot="reference" type="text"
                                    @click="deleteComment(comment_id)">删除</el-button></el-popconfirm></span>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card> -->

                      <!-- <div v-if="comment_item.reply_amount > 2">
                        <v-row>
                          <p>共{{ comment_item.reply_amount }}条回复，<el-button type="text" @click="">点击查看</el-button></p>
                        </v-row>
                      </div> -->
                    </div>

                    <!--点击回复，弹出的输入框；点击发布后，要收起-->
                    <v-row v-if="show_comment_input[index]">
                      <!--当前用户头像-->
                      <v-col cols="12" md="1" class="d-flex" align="center">
                        <v-avatar>
                          <img :src="video.author_image_url" />
                        </v-avatar>
                      </v-col>
                      <!--二级评论输入框-->
                      <v-col cols="12" md="11" align="center" class="d-flex">
                        <el-input type="textarea" :rows="2" :placeholder="`回复 @${comment_item.user_name}`"
                          v-model="textarea_comment_l2" suffix-icon="el-icon-s-promotion">
                        </el-input>
                        <el-button class="comment-btn" type="primary"
                          @click="PostReply(comment_item.id, index, textarea_comment_l2)">发布</el-button>
                      </v-col>
                    </v-row>

                    <!--一级评论之间的评论分隔线-->
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
                <div style="font-size: 18px;margin-top: 20px;margin-bottom: 20px;">
                  推荐视频列表
                </div>

                <v-card v-for="(recommend_item, index) in videos_recommend" :key="index">
                  <div class="recommend_block" style="padding-top: 20px;padding-bottom: 10px;">
                    <v-row>
                      <v-col cols="12" md="6">
                        <img :src="recommend_item.cover_url" width="100%" @click="jumpTo(recommend_item.id)" />
                      </v-col>

                      <v-col class="rec_introdction" cols="12" md="6">
                        <div class="rec_video_title" @click="jumpTo(recommend_item.id)">
                          {{ recommend_item.title }}
                        </div>

                        <div style="margin-top: 10px;margin-bottom: 10px;">
                          <el-tag type="info" effect="plain" size="mini">作者 </el-tag> {{ recommend_item.user_name }}
                        </div>

                        <div>
                          <span style="margin-right: 25px;">
                            <v-icon
                              style="width: 4px;height: 4px;margin-left: 8px;margin-right: 8px;">mdi-motion-play-outline</v-icon>
                            {{ recommend_item.view_amount }}
                          </span>
                          <span>
                            <v-icon
                              style="width: 4px;height: 4px;margin-left: 8px;margin-right: 8px;">mdi-thumb-up-outline</v-icon>
                            {{ recommend_item.like_amount }}
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
import Header from '@/components/HomePage/Header.vue'
//import { response } from 'express';

// import SvgIcon from '@jamescoyle/vue-icon';
// import { mdiAccount } from '@mdi/js';
//import { allowedGetters } from 'video.js/dist/types/tech/middleware';
export default {
  name: 'VideoView',//当前引入页面
  components: {
    Header,
  },
  data() {
    return {
      /*评论相关数据*/
      textarea_comment: '',/*发布一级评论的输入框*/
      textarea_comment_l2: '',/*发布二级评论(即reply)的输入框，需要区分*/
      showDelete: false,/*是否显示评论card中的删除键【应该是随着评论总数变化的一个量】*/
      display_comment: [],/*展示"点开查看"，随着一级评论变化*/
      i_display: 0,/*display_comment中的遍历量，数组下标，随着一级评论变化*/
      show_comment_input: [],/*点击回复，展示输入框,随着一级评论变化*/
      clickReplyCnt: [],/*点击回复的次数，点1下就显示输入框，点2下就消失。随着一级评论变化*/

      /*收藏相关数据*/
      starDialogVisible: false,/*是否展示收藏夹的Dialog对话框*/
      starHavedList: [1, 3, 4, 5, 6, 8],/*收藏夹清单，其中是已经选中的收藏夹的id*/
      starList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],/*收藏夹清单，其中是所有的收藏夹的id【后面get数据后换成后端数据】*/
      isActive: false,/*新建收藏夹边框是否呈现蓝色效果【失败了】*/
      newStarInput: false,/*是否显示新建收藏夹输入名字的输入框*/
      starCreateNewInput: '',/*新建收藏夹输入名字的输入框中的内容，有限制最多20个字*/

      /*视频相关信息*/
      // videoWidth: 0,
      // videoHeight: 0,
      video: {
        // path: mdiAccount,
        /*视频*/
        id: '',
        title: '',
        url: '',
        label: '',
        description: '',
        create_time: '',
        /*视频作者*/
        author_id: '',
        author_name: '',
        author_image_url: '',
        author_description: '',
        author_follower_amount: '',
        isFollowed: false,/*待完善；默认为未关注*/
        follower_amount: '',
        /*视频相关数据*/
        view_amount: '',
        total_comment_amount: '',/*将一级二级评论都算进去*/
        comment_amount: '',/*一级评论数量*/

        like_amount: 0,
        liked: false,
        star_amount: 0,
        stared: false,
        complained: false,
      },
      /*以下为遍历数组*/
      /*一级评论数组（一级评论里有一个reply的数组）*/
      comments: [],
      /*推荐视频列表*/
      videos_recommend: [],
      /*遍历数组到此结束*/

      /*收藏相关量*/
      // StarWindowVisable: false,
      // NewStarV: true,
      // starbox: [""],
      // starTitle: '',
    }
  },
  created() {
    this.fetchVideoData();
    this.getComments();/*获取评论*/
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

    /*获取视频详情页相关数据（在刷新时加载一次）*/
    fetchVideoData() {
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

          /*获取视频相关信息*/
          this.video.id = this.$route.params.id;
          this.video.title = response.data.video.title;
          this.video.url = response.data.video.video_url;
          this.video.label = response.data.video.label;
          this.video.description = response.data.video.description;
          var day = response.data.video.created_at.split('T')[0];
          var time = response.data.video.created_at.split('T')[1].split('Z')[0];
          this.video.create_time = day + ' ' + time;

          /*视频作者相关信息*/
          this.video.author_id = response.data.video.user_id;
          this.video.author_name = response.data.video.user_name;
          this.video.author_image_url = response.data.video.avatar_url;
          this.video.author_description = response.data.video.user_description;
          //this.video.isFollowed=response.data.video.1;
          this.video.author_follower_amount = response.data.video.follower_amount;

          /*视频相关数据量*/
          this.video.view_amount = response.data.video.view_amount;
          /*评论*/
          this.video.total_comment_amount = response.data.video.total_comment_amount;/*将一级二级评论都算进去*/
          this.video.comment_amount = response.data.video.comment_amount;/*一级评论数量*/

          /*点赞*/
          this.video.like_amount = response.data.video.like_amount;
          this.video.liked = response.data.liked;
          /*收藏*/
          this.video.star_amount = response.data.video.fav_amount;
          this.video.stared = response.data.favorited;
          this.video.test_debug1 = 5;

          console.log(this.video);
          console.log('c:' + this.comments);

          /*遍历获取所有一级评论*/
          if (this.video.comment_amount > 0) /*一级评论数量大于0，才显示评论的card，才有comments数组*/ {
            response.data.comment.forEach((comment, index) => {
              this.comments.push(comment);
              this.display_comment.push(false);/*页面刷新时，默认是折叠起来的*/
              this.show_comment_input.push(false);/*页面刷新时，默认该评论框不显示*/
              this.clickReplyCnt.push(0);
              //this.set(this.display_comment,this.i_display,'');
              //this.comments[index] = comment;
            })
            console.log('gc_C:' + this.comments);
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
            this.videos_recommend.push(video);/*【这样写】*/
            //this.videos_recommend[index] = video;
            //console.log(this.videos_recommend[index]);
          })
          console.dir(this.videos_recommend);
        })
        .catch(error => {
          console.log(error);
        })
    },
    getComments() {
      if (this.video.comment_amount > 0 && this.video.total_comment_amount > 0) {
        /*评论数量不为0，获取后评论数组不为空*/
        axios.get('/videos/get_comment', { params: { video_id: this.$route.params.id } })
          .then(response => {
            console.log(response);
            /*遍历获取所有一级评论*/
            if (this.video.comment_amount > 0) /*一级评论数量大于0，才显示评论的card，才有comments数组*/ {
              response.data.comment.forEach((comment, index) => {
                this.comments[index] = comment;
              })
              console.log('gc_C:' + this.comments);
            }
          })
          .catch(error => {
            console.log('getComments' + error);
          })
      }
      else {
        console.log('Comments_amount=0');
      }
    },
    /*处理用户是否已点赞该视频*/
    likeHandle() {
      var self = this;//
      axios.post('/videos/like_video', { params: { video_id: this.$route.params.id } }) //往后端传数据有问题
        .then(function (response) {
          console.log(response);

          if (response.data.errno == 2) /*用户未登录*/ {
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
    /*收藏相关方法*/
    getStarList() {
      /*通过axios.get得到收藏夹，还有已存在的收藏夹，需要返回我一个arrayList，就像starList那样*/
    },
    /*检查该视频是否已在收藏夹中*/
    isStaredCheck(id) {
      return this.starHavedList.includes(id); /*判断标识符id是否在数组starHavedList中出现过。出现过就是已收藏*/
    },
    /*更新StarHavedList数组中的值*/
    updateStarHavedList(newList) {
      this.starHavedList = newList.filter(id => {
        return this.isChecked(id);
      });
    },
    /*边框蓝色效果*/
    toggleActive() {
      this.isActive = !this.isActive;
    },
    /*好像失败了*/
    createFav(content) {
      if (!content)//content为空
      {
        this.$message({
          message: '收藏夹名字不能为空',
          type: 'warning',
        });
        return;
      }
      else {
        /*接口成功*/
        this.newStarInput = false;
        this.starCreateNewInput='';
      }
    },
    /*点击收藏键，打开收藏夹*/
    // OpenStarWindow() {
    // StarWindowVisable = true;
    // axios.get('/videos/get_favorite')
    //   .then(reponse => {
    //     console.log(response);
    //     /*下面这个待完善，获取所有收藏夹的名字和该视频在收藏夹中的情况*/
    //     response.data.favorite_id.forEach((favorite_id, index) => {
    //       this.starbox[index] = favorite_id;

    //     }).catch(error => {
    //       console.log(error);
    //     })
    //   })
    // },
    /*创建新的收藏夹*/
    // CreateStar() {
    //   axios.get('/videos/create_favorite', { params: { title: this.$data.starTitle } })
    //     .then(reponse => {
    //       console.log(response);
    //       /*Q??【需要立刻显示，这个该怎么实现】*/
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     })
    //   NewStarV = true;
    //   starTitle = '';
    // },
    StarHandle() { //点击收藏键触发

      if (this.$data.video.stared) {
        this.$data.video.stared = false;
        this.$data.video.star_amount -= 1;
      }
      else {
        this.$data.video.stared = true;
        this.$data.video.star_amount += 1;
      }//这个行为要在这里立刻传回后端吗？还是已经改变了呢？

      var self = this;
      // axios.post('/videos/favorite_video', { params: { video_id: this.$route.params.id, favorite_id: 1 } }) //往后端传数据有问题
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log('Error: ' + error);
      //   });
    },
    /*投诉的方法*/
    Complain() {
      /*先通过get接口判断是不是可以投诉*/
      axios.get('/videos/is_complaint', { params: {} })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log('Error: ' + error);
          this.$message({
            message: response.msg,/*如果不能投诉，显示原因*/
            type: 'info'
          });
          return;
        });
      /*如果可以投诉*/
      /*写入投诉的弹窗*/
      this.$prompt('请输入投诉原因', '稿件投诉', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        /*投诉视频接口*/
        axios.post('/videos/complain_video', { params: { video_id: this.$router.params, content: value } })
        this.$message({
          type: 'success',
          message: '您的投诉已成功发送，正在等待管理员审核'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消投诉'
        });
      });
      /*标记投诉状态？？*/
    },
    /*评论相关方法*/
    /*发布一级评论的接口*/
    PostComment() {
      /*判断当前是否登录【待完善】*/

      /*判断评论输入框内容是否为空*/
      if (!this.textarea_comment)//content为空
      {
        this.$message({
          message: '评论不能为空',
          type: 'warning',
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
    /*点击回复键，弹出reply的输入框*/
    /*点击1下是弹出，点击2下是*/
    PopInput(index) {
      /*先遍历，使其它所有的输入框都为false*/
      for (let i = 0; i < this.show_comment_input.length; i++) {
        //this.set(this.show_comment_input,i,false);
        this.show_comment_input[i] = false;
      }
      if (this.clickReplyCnt[index] == 0) /*此时要弹出输入框*/ {
        /*只有所选的一级评论才弹出输入框*/
        //this.set(this.show_comment_input,index,true);
        this.show_comment_input[index] = true;

        for (let i = 0; i < this.clickReplyCnt.length; i++) {
          this.clickReplyCnt[i] = 0;
        }
        this.clickReplyCnt[index] = 1;
      }
      else  /*此时点击回复，是要输入框消失*/ {
        for (let i = 0; i < this.clickReplyCnt.length; i++) {
          this.clickReplyCnt[i] = 0;
        }
        //this.clickReplyCnt[index] = 0;
      }
    },
    /*回复一级评论，发布二级评论即Reply*/
    PostReply(comment_id, index, content) { /*这里的comment_id是一级评论id，指此reply属于哪个一级评论*/
      if (!this.textarea_comment_l2)//content为空
      {
        this.$message({
          message: '评论不能为空',
          type: 'warning'
        });
        return;
      }

      var request = {
        comment_id: comment_id, /*所回复的一级评论的id；到底要不要独立有待商榷*/
        content: this.$data.textarea_comment_l2,
        video_id: this.$route.params.id,
      };
      axios.post('/videos/reply_comment', { params: request }) //往后端传数据有问题
        .then(response => {
          console.log(request);
          console.log(response);
          this.textarea_comment_l2 = '';
          this.set(this.show_comment_input, index, false);/*将reply输入框关闭*/

          //this.clickReplyCnt = 0;/*将Cnt设置为0，使得下一次点击“回复”，可以弹出输入框*/
          for (let i = 0; i < this.clickReplyCnt.length; i++) {
            this.clickReplyCnt[i] = 0;
          }
        })
        .catch(error => {
          console.log('Error: ' + error);
          this.$message({
            message: '发生错误，评论失败',
            type: 'info'
          });
          this.textarea_comment_l2 = content;
        });
    },
    /*删除回复*/
    DeleteReply() {
      ;
    },
    /*关注视频作者*/
    Follow() {
      // axios.post('/account/create_follow', { params: { id: 1, following_id: 1 } })//??
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(error => {
      //     console.log('Error: ' + error);
      //   });
      this.$data.video.isFollowed = true;
      this.$data.video.author_follower_amount++;
    },
    /*取关视频作者*/
    DisFollow() {
      // axios.post('/account/remove_follow', { params: { id: 1, following_id: 1 } })//??
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(error => {
      //     console.log('Error: ' + error);
      //   });
      this.$data.video.isFollowed = false;
      this.$data.video.author_follower_amount--;
    },
    /*跳转到推荐视频对应的播放页*/
    jumpTo(video_id) {
      //this.$router.push('/video/'+video_id);
      const video_play_url = '/video/' + video_id;
      window.open(video_play_url, '_self');
    },

    // submitComment() {
    //   this.submittingComment = true;
    //   // 发布评论逻辑
    //   setTimeout(() => {
    //     this.commentInput = "";
    //     this.submittingComment = false;
    //   }, 1000);
    // },
  },
  // watch: {
  //   /*监听checkList数组的变化。当checkList数组发生变化时，调用updateCheckList方法来更新选中的多选框。*/
  //   starHavedList(newList) {
  //     this.updateStarHavedList(newList);
  //   }
  // },
}
</script>

<style scoped>
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
  -webkit-line-clamp: 1;
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

.starCreateNewDiv {
  margin-top: 15px;
  border: 1px solid rgba(176, 170, 170, 0.703);
  height: 42px;
  display: flex;
  align-items: center;
  /*边框点击效果*/
  transition: border 0.2s;
}

.starCreateNewDiv.active {
  border: 2px solid blue;
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
