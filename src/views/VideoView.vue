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
              <div>
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
              </div>

              <!--视频播放模块-->
              <div>
                <!--视频播放器-->
                <div class="video_player" style="margin-top:18px;width:100%;">
                  <video id="shipin" ref="video" controls :src="video.url"
                    style="width:100%;min-height:550px;background-color:black" :poster="video.cover_url" volume="0.25">
                    <!-- <source v-bind:src="video.url">
                    </source> -->
                    <!-- <source src="../assets/hz.mp4" /> -->
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
                      <!--点击收藏键，打开收藏夹对话框。把关闭原因设置为空-->
                      <v-btn icon :color="video.stared ? 'blue' : undefined" @click="openStarDialog();" size="large"
                        style="width: 50px;height: 50px;">
                        <v-icon style="font-size: 30px;">{{ video.stared ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
                      </v-btn>
                      <p class="d-flex align-center my-auto">{{ video.star_amount }}</p>
                    </span>

                    <!--收藏夹弹出对话框-->
                    <el-dialog title="添加到收藏夹" :visible.sync="starDialogVisible" width="25%" center
                      @close="closeStarDialog">
                      <!-- <v-divider style="padding-top: 0px;"></v-divider> -->
                      <!--收藏夹展示-->
                      <div class="dialogContent" style="height: 330px;overflow: auto;">
                        <div class="starListShow" @click="judgeChange">
                          <div v-for="(fav_item, index) in favorites" :key="index">
                            <!--点击选项框，就会使对应的favorited变为1-->
                            <!--tsetBox()是为了debug，之后可以删掉-->
                            <v-checkbox v-model="fav_item.favorited" :true-value=1 :false-value=0>
                              <template v-slot:label>
                                {{ fav_item.title }}<span v-if="fav_item.is_private"> [私密]</span>
                              </template>
                            </v-checkbox>
                          </div>
                          <!-- <el-checkbox-group v-model="favedId">
                            <div v-for="(fav_item, index) in favorites" :key="index" style="padding-top: 10px;">
                              <div>
                                <el-checkbox :label="fav_item.id">{{ fav_item.title }}</el-checkbox>
                                <span>[私密]111111111111111111111</span>
                              </div>
                            </div>
                          </el-checkbox-group> -->
                        </div>
                        <!--新建收藏夹选项-->
                        <!--输入收藏夹名字-->
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
                        <!--新建收藏夹 按钮-->
                        <div v-else class="starCreateNewDiv" @click="newStarInput = true">
                          <i class="el-icon-plus" style="margin-left: 5px;margin-right: 5px;"></i> 新建收藏夹
                        </div>
                      </div>

                      <v-divider style="margin-top: 35px;height:8px"></v-divider>
                      <!--收藏夹的对话框底部-->
                      <!--有变化，可以确认-->
                      <div style="height:35px;display: flex;justify-content: center; ">
                        <div v-if="canSaveStar" slot="footer" class="dialog-footer" @click="closeCreateStar">
                          <v-btn color="info" @click="saveStar()" style="margin-top: 13px;">
                            &nbsp;&nbsp;&nbsp;&nbsp;确认&nbsp;&nbsp;&nbsp;&nbsp;
                          </v-btn>
                          <!-- <el-button type="primary" @click="saveStar()">确 定</el-button> -->
                        </div>
                        <!--无变化，不能确认-->
                        <div v-else slot="footer" class="dialog-footer" @click="closeCreateStar"
                          style="margin-top: 13px;">
                          <v-btn depressed disabled>
                            &nbsp;&nbsp;&nbsp;&nbsp;确认&nbsp;&nbsp;&nbsp;&nbsp;
                          </v-btn>
                        </div>
                      </div>
                      <!-- </el-scrollbar> -->
                    </el-dialog>

                    <!--投诉-->
                    <span v-if="isLoginComp" class="complaint videoFuncClick" style="margin-right:30px">
                      <v-btn icon :color="canComplain ? undefined : 'blue'" @click="clickComplain()" size="large"
                        style="width: 50px;height: 50px;">
                        <v-icon class="videoFuncClick">mdi-alert-outline</v-icon>
                      </v-btn>
                      <p class="d-flex align-center my-auto" @click="clickComplain()">稿件投诉</p>
                    </span>
                    <span v-else class="complaint videoFuncClick" style="margin-right:30px">
                      <v-btn icon @click="toLogin()" size="large" style="width: 50px;height: 50px;">
                        <v-icon class="videoFuncClick">mdi-alert-outline</v-icon>
                      </v-btn>
                      <p class="d-flex align-center my-auto" @click="toLogin()">稿件投诉</p>
                    </span>

                    <!--投诉的对话框-->
                    <el-dialog title="稿件投诉" :visible.sync="complainDialog" @close="CancelComplain()" width="29%">
                      <h3 style="margin-bottom: 20px;">请填写投诉原因</h3>
                      <el-input type="textarea" :rows="5" placeholder="请输入投诉原因，限制200字" v-model="complain_textarea"
                        maxlength="200" show-word-limit>
                      </el-input>
                      <!-- <span slot="header">
                        <el-button class="dialog-close-button" icon="el-icon-close""></el-button>
                      </span> -->
                      <!--投诉对话框底部-->
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="complainDialog = false; CancelComplain()">取 消</el-button>
                        <el-button type="primary" @click=" PostComplain()">确 定</el-button>
                      </span>

                    </el-dialog>

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
                <div class="video_dsp" style="margin-left: 20px;margin-top: 30px;margin-bottom: 25px;">
                  <p>{{ video.description }}</p>
                </div>

                <!--视频分区-->
                <div class="video_partition">
                  <el-tag><span style="font-size:14px">&nbsp;&nbsp;{{ video.label }}&nbsp;&nbsp;</span></el-tag>
                  <!-- <el-button plain class="v_part_c">{{ video.label }}</el-button> -->
                </div>
              </div>
            </v-card>

            <!--分隔美化-->
            <v-divider height="6" class="mt-4"></v-divider>
            <img src="@/assets/video/picture4.jpeg" style="margin-top: 27px;" width="100%" height="200px" />

            <!--评论区-->
            <div class="comment_area">
              <v-card class="mt-10 mb-10" flat>
                <v-row :style="{ width: '100%' }">
                  <v-col style="font-weight: bold;font-size: 20px;">评论 {{ video.total_comment_amount }}</v-col>
                </v-row>

                <!--评论区头-->
                <v-row align-content="stretch" :style="{ width: '100%', 'margin-bottom': '30px' }" align="center">
                  <!--justify="center"-->
                  <!--当前用户头像-->
                  <v-col cols="12" md="1" class="d-flex" align="center">
                    <v-avatar v-if="this.$store.state.isLogin" @click="jumpToUser(user.user_id)">
                      <img :src="user.user_avatar" /><!--未登录时有问题【】-->
                    </v-avatar>
                    <v-avatar v-else>
                      <img src="@/assets/my_avatar.png" />
                    </v-avatar>
                  </v-col>
                  <!--一级评论输入框-->
                  <!--登录后，可以输入，发布评论-->
                  <v-col v-if="this.$store.state.isLogin" cols="12" md="11" align="center" class="d-flex">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea_comment"
                      suffix-icon="el-icon-s-promotion">
                    </el-input>
                    <el-button class="comment-btn" type="primary" @click="PostComment()">发布</el-button>
                  </v-col>
                  <!--没有登录，输入不了-->
                  <v-col v-else cols="12" md="11" align="center" class="d-flex" @click="clickSend">
                    <el-input type="textarea" :rows="2" placeholder="登录后才可以发布评论" v-model="textarea_comment"
                      suffix-icon="el-icon-s-promotion" @click="clickSend" :disabled="true">
                    </el-input>
                    <el-button class="comment-btn" type="primary" disabled @click="clickSend">发布</el-button>
                  </v-col>
                </v-row>

                <v-divider /><!--为了调整样式，之后可以删-->

                <!--评论样式-->
                <v-card v-if="video.total_comment_amount" flat class="mb-3" v-for="(comment_item, index) in this.comments"
                  :key="index">
                  <v-row>
                    <v-col cols="12" md="1">
                      <v-avatar @click="jumpToUser(comment_item.user_id)">
                        <img :src="comment_item.avatar_url" />
                      </v-avatar>
                    </v-col>

                    <v-col cols="12" md="11">
                      <!--一级评论部分（不包括二级的）-->
                      <div @mouseover="judgeShowDelete(comment_item.id, comment_item.user_id)"
                        @mouseleave="hideDelete(comment_item.id)">
                        <!--评论者用户名-->
                        <div class="textBtn" style="align-items: center;margin-bottom: 12px;">
                          <span class="textBtn"
                            style="font-weight:500;font-size: 16px;margin-right: 15px;color:rgb(109, 106, 106)"
                            @click="jumpToUser(comment_item.user_id)">
                            {{ comment_item.user_name }}
                          </span>
                          <!--作者的tag-->
                          <span style="align-items: center!important;"><el-tag
                              v-if="comment_item.user_id == video.author_id" type="danger" effect="plain"
                              size="mini">作者</el-tag></span>
                        </div>

                        <!--一级评论内容-->
                        <div>
                          {{ comment_item.content }}</div>
                        <!--一级评论时间，精确到秒-->
                        <div style="align-items: center;margin-top: 5px;">
                          <span style="font-size: 14px;color: grey;margin-right: 40px;">
                            {{ comment_item.created_at }}
                          </span>

                          <!--回复键，点击弹出reply的输入框-->
                          <span style="margin-right: 40px;color:grey">
                            <span style="font-size: 14px;" @click="PopInput(index)" class="replyBtn">回复</span>
                            <!-- <el-button type="text" @click="PopInput(index)">回复</el-button> -->
                          </span>

                          <!--删除一级评论-->
                          <span v-if="showDelete[comment_item.id]" style="font-size: 14px;color:grey"><!--如果删除键可以看到-->
                            <!-- <el-button type="text" v-if="showDelete[comment_item.id]"
                            @click="delDialogVisible = true; clickDel(comment_item.id)">删除</el-button> -->

                            <el-popconfirm title="确定是否删除这条评论？" confirm-button-text='确定' cancel-button-text='取消'
                              icon="el-icon-info" icon-color="red" @confirm="deleteComment(comment_item.id)"
                              @cancel="delCancel(comment_item.id)">
                              <span slot="reference" class="replyBtn" @click="clickDel(comment_item.id)">删除</span>
                              <!-- <el-button slot="reference" type="text" @click="clickDel(comment_item.id)">删除</el-button> -->
                            </el-popconfirm>
                          </span>
                        </div>

                        <!--点击删除键，弹出“确认删除”的对话框-->
                        <!-- <el-dialog title="提示" :visible.sync="delDialogVisible" width="20%" center>
                        <span>确认是否删除</span>
                        <span slot="footer" class="dialog-footer">
                          <el-button @click="delDialogVisible = false; isClickDel = false">取 消</el-button>
                          <el-button type="primary" @click="delDialogVisible = false; deleteComment()">确 定</el-button>
                        </span>
                      </el-dialog> -->
                      </div>

                      <!--二级评论内容-->
                      <div v-if="comment_item.reply_amount"> <!--如果该一级评论的二级评论数量大于0，才显示二级评论-->
                        <div v-if="comment_item.reply_amount <= 2"> <!--【二级评论数量<=2，无需折叠，正常循环数组】-->
                          <v-card flat v-for="(reply_item, r_index) in comment_item.reply" :keys="r_index">
                            <v-row class="mt-4">
                              <!--二级评论用户头像-->
                              <v-col cols="12" md="1">
                                <v-avatar size="40" @click="jumpToUser(reply_item.user_id)">
                                  <img :src="reply_item.avatar_url" />
                                </v-avatar>
                              </v-col>

                              <v-col cols="12" md="11">
                                <div @mouseenter="judgeShowDelete(reply_item.id, reply_item.user_id)"
                                  @mouseleave="hideDelete(reply_item.id)">
                                  <!--二级评论者用户名-->
                                  <div style="align-items: center!important;margin-bottom: 14px;">
                                    <span
                                      style="font-weight:500;font-size: 15px;margin-right: 15px;color:rgb(109, 106, 106)"
                                      @click="jumpToUser(reply_item.user_id)">
                                      {{ reply_item.user_name }}
                                    </span>
                                    <span style="align-items: center!important;"><el-tag
                                        v-if="reply_item.user_id == video.author_id" type="info" effect="plain"
                                        size="mini">作者</el-tag>
                                    </span>
                                  </div>
                                  <!--二级评论内容-->
                                  <div>{{ reply_item.content }}</div>
                                  <!--二级评论时间信息和删除-->
                                  <div style="align-items: center;margin-top: 5px;">
                                    <span style="font-size: 14px;color: grey;margin-right: 40px;">{{
                                      reply_item.created_at }}
                                    </span>
                                    <span v-if="showDelete[reply_item.id]" style="font-size: 14px;color:grey">
                                      <el-popconfirm title="确定是否删除这条评论？" confirm-button-text='确定' cancel-button-text='取消'
                                        icon="el-icon-info" icon-color="red" @confirm="DeleteReply(reply_item.id)"
                                        @cancel="delCancel(reply_item.id)">
                                        <span slot="reference" class="replyBtn" @click="clickDel(reply_item.id)">删除</span>
                                        <!-- <el-button slot="reference" type="text"
                                        @click="clickDel(reply_item.id)">删除</el-button> -->
                                      </el-popconfirm>
                                    </span>
                                  </div>
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
                                  <v-avatar size="40" @click=jumpToUser(reply_item.user_id)>
                                    <img :src="reply_item.avatar_url" />
                                  </v-avatar>
                                </v-col>

                                <v-col cols="12" md="11">
                                  <div @mouseenter="judgeShowDelete(reply_item.id, reply_item.user_id)"
                                    @mouseleave="hideDelete(reply_item.id)">
                                    <!--二级评论者用户名-->
                                    <div style="align-items: center;margin-bottom: 14px;">
                                      <span
                                        style="font-weight:500;font-size: 15px;margin-right: 15px;color:rgb(109, 106, 106)"
                                        @click=jumpToUser(reply_item.user_id)>
                                        {{ reply_item.user_name }}
                                      </span>
                                      <span style="align-items: center!important;"><el-tag
                                          v-if="reply_item.user_id == video.author_id" type="info" effect="plain"
                                          size="mini">作者</el-tag>
                                      </span>
                                    </div>
                                    <!--二级评论内容-->
                                    <div>{{ reply_item.content }}</div>
                                    <!--二级评论时间信息和删除-->
                                    <div style="align-items: center;margin-top: 5px">
                                      <span style="font-size: 14px;color: grey;margin-right: 40px;">{{
                                        reply_item.created_at
                                      }}
                                      </span>
                                      <span v-if="showDelete[reply_item.id]">
                                        <el-popconfirm title="确定是否删除这条评论？" confirm-button-text='确定'
                                          cancel-button-text='取消' icon="el-icon-info" icon-color="red"
                                          @confirm="DeleteReply(reply_item.id)" @cancel="delCancel(reply_item.id)">
                                          <el-button slot="reference" type="text"
                                            @click="clickDel(reply_item.id)">删除</el-button>
                                        </el-popconfirm>
                                      </span>
                                    </div>
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
                                  <v-avatar size="40" @click=jumpToUser(reply_item.user_id)>
                                    <img :src="reply_item.avatar_url" />
                                  </v-avatar>
                                </v-col>

                                <v-col cols="12" md="11">
                                  <div @mouseenter="judgeShowDelete(reply_item.id, reply_item.user_id)"
                                    @mouseleave="hideDelete(reply_item.id)">
                                    <!--二级评论者用户名-->
                                    <div style="align-items: center;margin-bottom: 14px;">
                                      <span
                                        style="font-weight:500;font-size: 15px;margin-right: 15px;color:rgb(109, 106, 106)"
                                        @click=jumpToUser(reply_item.user_id)>
                                        {{ reply_item.user_name }}
                                      </span>
                                      <span style="align-items: center!important;"><el-tag
                                          v-if="reply_item.user_id == video.author_id" type="info" effect="plain"
                                          size="mini">作者</el-tag>
                                      </span>
                                    </div>
                                    <!--二级评论内容-->
                                    <div>{{ reply_item.content }}</div>
                                    <!--二级评论时间信息和删除-->
                                    <div style="align-items: center;margin-top: 5px;">
                                      <span style="font-size: 14px;color: grey;margin-right: 40px;">{{
                                        reply_item.created_at
                                      }}
                                      </span>
                                      <span v-if="showDelete[reply_item.id]">
                                        <el-popconfirm title="确定是否删除这条评论？" confirm-button-text='确定'
                                          cancel-button-text='取消' icon="el-icon-info" icon-color="red"
                                          @confirm="DeleteReply(reply_item.id)" @cancel="delCancel(reply_item.id)">
                                          <el-button slot="reference" type="text"
                                            @click="clickDel(reply_item.id)">删除</el-button>
                                        </el-popconfirm>
                                      </span>
                                    </div>
                                  </div>
                                </v-col>
                              </v-row>
                            </v-card>
                            <!--“查看”-->
                            <div style="margin-top: 20px;">
                              <p style="color:grey;font-size:15px">共{{ comment_item.reply_amount }}条回复，<span
                                  @click="display_comment[index] = true" class="textBtn">点击查看</span></p>
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
                              <span style="font-weight:bolder;font-size: 16px;margin-right: 15px;">
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
                      <v-row v-if="show_comment_input[index]" style="margin-top: 10px;">
                        <!--当前用户头像-->
                        <v-col cols="12" md="1" class="d-flex" align="center">
                          <v-avatar>
                            <img :src="user.user_avatar" />
                          </v-avatar>
                        </v-col>
                        <!--二级评论输入框-->
                        <v-col cols="12" md="11" align="center" class="d-flex">
                          <el-input type="textarea" :rows="2" :placeholder="`回复 @${comment_item.user_name}`"
                            v-model="textarea_comment_l2[index]" suffix-icon="el-icon-s-promotion">
                          </el-input>
                          <el-button class="comment-btn" type="primary"
                            @click="PostReply(comment_item.id, index)">发布</el-button>
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
            </div>
          </v-col>

          <!--右侧-->
          <v-col cols="12" md="4">
            <v-card flat class="right-col" style="width:100%;margin-left: 30px;">
              <!--作者信息-->
              <div>
                <div style="margin:15px;margin-bottom: 20px;">
                  <v-row style="width:100%;margin-top:10px">
                    <!-- <v-col cols="12" md="3"> -->
                    <div style="margin-top: 10px;">
                      <v-avatar @click="jumpToUser(video.author_id)">
                        <img :src="video.author_image_url" />
                      </v-avatar>
                    </div>
                    <!-- </v-col> -->

                    <div style="margin-left: 14px;">
                      <!--作者名字-->
                      <div style="font-size: 17px;font-weight: 500;">
                        <!-- <router-link :to="'/user/' + video.author_id">  -->
                        <span class="textBtn" @click="jumpToUser(video.author_id)">{{ video.author_name }}</span>
                        <!-- </router-link> -->
                      </div>

                      <div>
                        <div style="margin-top: 7px;margin-bottom: 10px;color:rgb(68, 67, 67)">
                          {{ video.author_description }}
                        </div>
                      </div>

                      <div>
                        <div style="margin-bottom: 20px;margin-top: 3px">
                          <span v-if="video.isFollowed"> <!--如果已关注-->
                            <v-btn depressed @click="DisFollow">
                              <i class="el-icon-check"></i> 已关注 {{ video.author_follower_amount }}
                            </v-btn>
                          </span>
                          <span v-else> <!--如果未关注-->
                            <v-btn depressed color="primary" @click="Follow">
                              +关注 {{ video.author_follower_amount }}
                            </v-btn>
                          </span>
                        </div>
                      </div>
                    </div>
                  </v-row>
                </div>
              </div>

              <!--图片2-->
              <img src="@/assets/video/picture2.jpeg" style="margin-top: 20px;" width="100%" height="200px" />
              <v-divider height="6" style="margin-top: 20px;"></v-divider>

              <!--推荐视频列表-->
              <v-card flat>
                <div style="font-size: 18px;margin-top: 20px;margin-bottom: 20px;font-weight: bold;">
                  推荐视频列表
                </div>

                <v-card v-for="(recommend_item, index) in videos_recommend" :key="index" flat>
                  <div class="recommend_block" style="padding-top: 20px;padding-bottom: 10px;margin-bottom: 13px;">
                    <v-row>
                      <v-col cols="12" md="6">
                        <div style="padding-left: 15px;">
                          <img :src="recommend_item.cover_url" width="100%" height="120px"
                            @click="jumpTo(recommend_item.id)" />
                        </div>
                      </v-col>

                      <v-col class="rec_introdction" cols="12" md="6">
                        <div class="rec_video_title" v-bind:title="recommend_item.title"
                          @click="jumpTo(recommend_item.id)" style="font-size: 15px;font-weight: 400;">
                          {{ recommend_item.title }}
                        </div>

                        <div style="margin-top: 10px;margin-bottom: 10px;color:rgb(109, 106, 106);font-size: 14px;">
                          <span class="rec_video_author textBtn" v-bind:title="'作者: ' + recommend_item.user_name"
                            @click="jumpToUser(recommend_item.user_id)"> <el-tag type="info" effect="plain" size="mini">作者
                            </el-tag>
                            {{
                              recommend_item.user_name }}</span>
                        </div>

                        <div style="color:rgb(109, 106, 106);font-size: 14px;">
                          <span style="margin-right: 16px;">
                            <v-icon size="20"
                              style="width: 3px;height: 3px;margin-left: 8px;margin-right: 8px;">mdi-motion-play-outline</v-icon>
                            {{ recommend_item.view_amount }}
                          </span>
                          <span style="margin-right: 16px;">
                            <v-icon size="20"
                              style="width: 3px;height: 3px;margin-left: 8px;margin-right: 8px;">mdi-thumb-up-outline</v-icon>
                            {{ recommend_item.like_amount }}
                          </span>
                          <span>
                            <v-icon size="20"
                              style="width: 3px;height: 3px;margin-left: 8px;margin-right: 8px;">mdi-star-outline</v-icon>
                            {{ recommend_item.fav_amount }}
                          </span>
                        </div>

                      </v-col>
                    </v-row>
                  </div>
                </v-card>

              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </el-container>

    <!--底部-->
    <el-footer height="80px"></el-footer>
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
//import { resolvePtr } from 'dns';
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
      /*视频音量*/
      shouldMute: true,
      /*投诉相关数据*/
      canComplain: false,/*是否可以投诉该视频｜默认不可以投诉（游客未登录就不可以【待确认】）*/
      reasonComplainDisable: '',/*不能投诉该视频的原因，应该是text*/
      complainDialog: false,/*投诉视频的对话框，默认关闭*/
      complain_textarea: '',/*投诉对话框中，填写投诉原因*/
      isLoginComp: false,/*是否登录，来判断投诉*/
      /*评论相关数据*/
      textarea_comment: '',/*发布一级评论的输入框*/
      textarea_comment_l2: [],/*发布二级评论(即reply)的输入框，需要区分*/
      /*关于点击“回复”，输入框的显示*/
      display_comment: [],/*展示"点开查看"，随着一级评论变化*/
      i_display: 0,/*display_comment中的遍历量，数组下标，随着一级评论变化*/
      show_comment_input: [],/*点击回复，展示输入框,随着一级评论变化*/
      clickReplyCnt: [],/*点击回复的次数，点1下就显示输入框，点2下就消失。随着一级评论变化*/
      /*关于鼠标移动，评论的删除键的显示*/
      canDelete: false,/*用来标记当前的登录者是否是管理员或该视频的作者，用以判断删除权限；默认为false*/
      showDelete: [],/*是否显示评论card中的删除键【应该是随着评论总数变化的一个量】*/
      isClickDel: [],/*是否已经点击了删除键【随着评论总数变化的一个量】。如果已经点击了，就设置为true就让删除键显示*/
      forMaxLen: 32000,/*为了for循环遍历清空和设置初始为0【正常的for循环不需要这个】【目前有showDelete和isClickDel使用了】*/

      //delDialogVisible: false,/*确认是否删除一级评论的dialog*/

      /*收藏相关数据*/
      favorites: [],/*收藏夹数组，存放收藏夹的相关数据*/
      starDialogVisible: false,/*是否展示收藏夹的Dialog对话框*/
      sendFavId: [],/*点击确认键之后，将这个通过接口传给后端。每次打开收藏面板时设为[]。*/
      beforeFavedId: [],/*每次打开收藏夹时，已收藏的id*/
      afterFavedId: [],/*每次操作收藏夹时，已收藏的id*/
      canSaveStar: false,/*收藏夹面板能否“确认”，不能就显示为灰色且点击无用*/
      //starBoxTitle: '',/*设置对话框的标题样式*/

      /*下面是一些没用了的，因为我每次打开时，重新get*/
      //closeReasonIsSave: false,/*关闭收藏夹对话框的原因，判断是否是因为“确认”，每次打开面板的时候设置为错（即因取消而关闭）；用在回调函数中*/
      //backupSelectedItems: [],/*用于保存上一次的选中状态*/
      //favedId: [],/*收藏夹清单，其中是已经选中的收藏夹的id*/
      //favAllId: [],/*收藏夹清单，其中是所有的收藏夹的id【后面get数据后换成后端数据】*/


      isActive: false,/*新建收藏夹边框是否呈现蓝色效果【失败了】*/
      newStarInput: false,/*是否显示新建收藏夹输入名字的输入框*/
      starCreateNewInput: '',/*新建收藏夹输入名字的输入框中的内容，有限制最多20个字*/

      /*当前登录用户相关信息*/
      user: {
        user_id: '',
        user_name: '',
        user_avatar: '',
      },
      /*视频相关信息*/
      // videoWidth: 0,
      // videoHeight: 0,
      //videoURL: '../assets/hz.mp4',/*debug用*/
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
        author_follower_amount: 0,
        isFollowed: false,/*默认为未关注*/
        follower_amount: '',
        /*视频相关数据*/
        view_amount: '',
        total_comment_amount: '',/*将一级二级评论都算进去*/
        comment_amount: '',/*一级评论数量*/

        like_amount: 0,
        liked: false,
        star_amount: 0,
        stared: false,
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

    /*每隔一分钟，获取一次评论【答辩时打开】*/
    setInterval(() => {
      this.getComments()
    }, 18000);/*1分钟60000，1s1000，这里的数字单位是毫秒*/
  },
  mounted() {
    // 在 mounted 钩子中设置自定义标题
    // this.title = `
    //     <span style="display: inline-block; border-top: 1px solid #999; padding-top: 8px;">
    //       ${'添加到收藏夹'}
    //     </span>`


    // 将 shouldMute 设为 false，以恢复浏览器记录的音量
    setTimeout(() => {
      this.$nextTick(() => {
        console.log(this.$refs.video.volume);

        //console.log(document.getElementById("shipin").volume);

        this.shouldMute = false;
        this.$refs.video.volume = 0.25; // 设置视频音量为 25%
        console.log('in v');
        console.log(this.$refs.video.volume);
        //console.log(document.getElementById("shipin").volume);
        //document.getElementById("shipin").volume = 0.2;
        //console.log(document.getElementById("shipin").volume);

      });
    });
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
    // onLoadMetadata() {
    //   // 将 shouldMute 设为 false，以恢复浏览器记录的音量
    //   this.$nextTick(() => {
    //  console.log(this.$refs.video.volume); 

    //  //console.log(document.getElementById("shipin").volume);

    //   this.shouldMute = false;
    //   this.$set(this.$refs.video,volume, 0.25);
    //   this.$refs.video.volume = 0.25; // 设置视频音量为 25%
    //   console.log('in v');
    //  console.log(this.$refs.video.volume); 
    //  console.log(document.getElementById("shipin").volume);
    //  this.$set(this,)
    //  document.getElementById("shipin").volume=0.2;
    //  console.log(document.getElementById("shipin").volume);
    //   })

    // },

    /*获取视频详情页相关数据（在刷新时加载一次）*/
    fetchVideoData() {
      /*输出登录信息*/
      console.log(this.$store.state.isLogin);
      console.log('a: ' + this.$store.state.isAdmin);
      /*获取当前登录用户的信息（如果已经登录的话）*/
      if (this.$store.state.isLogin) /*不要用true来判断，不灵敏*/ {
        /*如果已经登录，就打印Token值*/
        let Headers = { 'Authorization': this.$store.getters.getStorage };
        console.log(Headers);

        axios.get('/account/display_myprofile', { headers: Headers })
          .then((response) => {
            console.log(response);
            console.log(Headers);
            if (response.data.errno == 0) {  //获取成功“我”的身份信息
              this.user.user_id = response.data.context.id;
              this.user.user_name = response.data.context.username;
              this.user.user_avatar = response.data.context.avatar_url;   //这是头像
              this.isLoginComp = true;
            }
            else {
              this.$message.warning(response.data.msg);
            }
          }).catch(error => {
            console.log(error);
          })
      }
      else {
        console.log('没登录 头像');
        this.isLoginComp = false;
        /*没有登录的话，把自己的头像显示为未登录*/
        //this.user.user_avatar = "./assets/my_avatar.png";
      }

      /*获取视频信息*/
      axios.get('/videos/view_video', { params: { video_id: this.$route.params.id } }, { headers: Headers })
        .then(response => {
          console.log(response);
          console.log('fetchId' + this.$route.params.id);
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
          this.video.cover_url = response.data.video.cover_url;
          this.video.label = response.data.video.label;
          this.video.description = response.data.video.description;
          // var day = response.data.video.created_at.split('T')[0];
          // var time = response.data.video.created_at.split('T')[1].split('Z')[0];
          // this.video.create_time = day + ' ' + time;
          this.video.create_time = response.data.video.created_at;

          /*视频作者相关信息*/
          this.video.author_id = response.data.video.user_id;
          this.video.author_name = response.data.video.user_name;
          this.video.author_image_url = response.data.video.avatar_url;
          this.video.author_description = response.data.video.user_description;
          this.video.isFollowed = response.data.video.followed;
          this.video.author_follower_amount = response.data.video.follower_amount;

          /*视频相关数据量*/
          this.video.view_amount = response.data.video.view_amount;
          /*评论*/
          this.video.total_comment_amount = response.data.video.total_comment_amount;/*将一级二级评论都算进去*/
          this.video.comment_amount = response.data.video.comment_amount;/*一级评论数量*/

          console.log(response.data.video);

          /*点赞*/
          this.video.like_amount = response.data.video.like_amount;
          this.video.liked = response.data.video.liked;
          /*收藏*/
          this.video.star_amount = response.data.video.fav_amount;
          this.video.stared = response.data.video.favorited;

          if (this.$store.state.isAdmin === "true") /*直接括号判断会出错*/ {
            console.log('is?Admin: ' + this.$store.state.isAdmin);
            this.canDelete = true;//管理员拥有删除评论权限
            console.log('canDelete-isAd: ' + this.canDelete);
          }
          else if (this.$store.state.isAdmin === false) {
            /*不是管理员，判断是不是视频作者*/
            if (this.video.author_id == this.user.user_id) {
              this.canDelete = true;//视频作者拥有删除评论权限
              console.log('canDelete-isAu: ' + this.canDelete);
            }
            console.log('I am here::' + this.$store.state.isAdmin);
          }
          else {
            console.log('isAdmin??: ' + this.$store.state.isAdmin);
          }
          console.log('canDelete: ' + this.canDelete);

          console.log(this.video);
          console.log('c:' + this.comments);

          /*设置for遍历清空或初始赋值最大长度【暂时只有showdelete用到】*/
          if (this.video.total_comment_amount > this.forMaxLen) {
            this.forMaxLen = this.video.total_comment_amount + 2;
          }
          console.log('MaxL: ' + this.forMaxLen);
          /*下面这个for循环的相对位置没那么重要的原因是，都是设置为false*/
          for (let i = 0; i < this.forMaxLen; i++) {
            this.$set(this.showDelete, i, false);
            this.$set(this.isClickDel, i, false);
          }

          /*遍历获取所有一级评论*/
          if (this.video.comment_amount > 0) /*一级评论数量大于0，才显示评论的card，才有comments数组*/ {
            response.data.comment.forEach((comment, index) => {
              this.comments.push(comment);
              this.display_comment.push(false);/*页面刷新时，默认是折叠起来的*/
              this.show_comment_input.push(false);/*页面刷新时，默认该评论框不显示*/
              this.textarea_comment_l2.push('');/*每个回复的输入框【】*/
              this.clickReplyCnt.push(0);
              //this.set(this.display_comment,this.i_display,'');
              //this.comments[index] = comment;
              this.showDelete.push(false);/*每条一级评论是否展示删除键【随着一级评论id变化】*/
              this.isClickDel.push(false);
            })
            console.log('gc_C:' + this.comments);
          }

        })
        .catch(error => {
          console.log(error);
        })

      /*获取推荐视频列表*/
      axios.get('/videos/get_related_video', { params: { video_id: this.$route.params.id, num: 10 } })
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

      /*先通过get接口判断是不是可以投诉，从而显示“投诉键”对应的样式*/
      axios.get('/videos/is_complaint', { params: { video_id: this.$route.params.id }, headers: { Authorization: this.$store.getters.getStorage } })/*【还没测】*/
        .then(response => {
          console.log(response);

          if (response.data.errno == 0) /*说明成功返回*/ {
            if (response.data.is_complaint)/*说明已经投诉，没有投诉权限*/ {//this.$message.warning(response.data.msg);/*弹窗显示报错的返回信息*/
              this.reasonComplainDisable = response.data.msg;
              this.canComplain = false;
            }
            else {
              console.log('可以投诉');
              this.canComplain = true;
            }
          }
          else {
            /*未登录不能投诉*/
            console.log('in get Complain State' + this.$store.state.isLogin);
            // if (this.$store.state.isLogin === false) {
            //   console.log('in get Complain State' + this.$store.state.isLogin);
            //   this.canComplain = true;/*显示为灰色*/
            // }
          }

          /*返回errno不为0，没进这个if，说明不可以投诉*/
          console.log('load canComplian?: ' + this.canComplain);
        })
        .catch(error => {
          console.log('Error: ' + error);
        });

      // /*未登录不能投诉*/
      // console.log('in get Complain State' + this.$store.state.isLogin);
      // if (this.$store.state.isLogin === "false") {
      //   console.log('in get Complain State' + this.$store.state.isLogin);
      //   this.canComplain = true;/*显示为灰色*/
      // }

      /*获取收藏夹*/
      this.getStarList();
      console.log(this.favorites);
    },
    /*获取评论  */
    getComments() {
      console.log('in get_comment');
      axios.get('/videos/get_comment', { params: { video_id: this.$route.params.id } })
        .then(response => {
          console.log(response);
          // console.log(response.data);
          // console.log(response.data.amount);
          // console.log(response.data.amount.total_comment_amount);
          // console.log(response.data.amount.comment_amount);

          this.video.total_comment_amount = response.data.amount.total_comment_amount;/*不知道能否实时响应，不能的话改成set【】*/
          this.video.comment_amount = response.data.amount.comment_amount;/*一级评论的数量*/

          /*要先对之前的comments相关的数组清空*/
          this.comments = [];
          /*显示评论的输入框*/
          this.display_comment = [];
          this.show_comment_input = [];
          this.clickReplyCnt = [];
          /*显示评论的删除键*/
          this.showDelete = [];
          this.isClickDel = [];

          console.log('in total_comment_amount: ' + this.video.total_comment_amount);
          console.log('in comment_amount: ' + this.video.comment_amount);

          /*设置for遍历清空或初始赋值最大长度【暂时只有showdelete用到】*/
          if (this.video.total_comment_amount > this.forMaxLen) {
            this.forMaxLen = this.video.total_comment_amount + 2;
          }
          console.log('in MaxL: ' + this.forMaxLen);
          /*下面这个for循环的相对位置没那么重要的原因是，都是设置为false*/
          for (let i = 0; i < this.forMaxLen; i++) {
            this.$set(this.showDelete, i, false);
            this.$set(this.isClickDel, i, false);
          }

          /*遍历获取所有一级评论*/
          if (this.video.comment_amount > 0) /*一级评论数量大于0，才显示评论的card，才有comments数组*/ {
            response.data.comment.forEach((comment, index) => {
              this.comments.push(comment);
              this.display_comment.push(false);/*页面刷新时，默认是折叠起来的*/
              this.show_comment_input.push(false);/*页面刷新时，默认该评论框不显示*/
              this.textarea_comment_l2.push('');/*每个回复的输入框【】*/
              this.clickReplyCnt.push(0);
              //this.set(this.display_comment,this.i_display,'');
              //this.comments[index] = comment;
              this.showDelete.push(false);/*每条一级评论是否展示删除键【随着一级评论id变化】*/
              this.isClickDel.push(false);
            })
            console.log('getComments: ' + this.comments);
          }
          console.log('in');
          console.log(this.comments);
        })
        .catch(error => {
          console.log('getComments' + error);
        })
    },
    /*处理用户点赞和取消点赞该视频*/
    likeHandle() {
      /*post方法要发formData格式*/
      let formData = new FormData();
      formData.append("video_id", this.$route.params.id);
      axios.post('/videos/like_video', formData) //往后端传数据有问题
        .then((response) => {
          console.log(response);
          console.log('like_id:' + this.$route.params.id);
          console.log(formData);
          if (response.data.errno == 401) /*用户未登录，就跳转到用户登录界面去登录*/ {
            this.$message.warning(response.data.msg);/*先去登录*/
            //this.$router.push('/login');
            // console.log('here');//【】
            // const url = '/login';
            // window.open(url, '_blank');
            // console.log('there');//【】
            return;
          }
          else if (response.data.errno != 0)/*点赞失败的其它错误【待完善】*/ {
            this.$message.warning(response.data.msg);/*弹窗显示报错*/
            return;
          }

          /*到这里说明，已经成功点赞*/
          /*改变相应样式*/
          /*如果是实时更新（async？），就不需要这一段；如果是手动刷新才更新，就需要以下这段*/
          if (this.$data.video.liked) {
            this.$data.video.liked = false;
            this.$data.video.like_amount -= 1;
          }
          else {
            this.$data.video.liked = true;
            this.$data.video.like_amount += 1;
          }
        })
        .catch(function (error) {
          console.log('Error: ' + error);
          /*如果有其它错误，弹窗报错*/
          this.$message.warning('Error: ' + error);
        });
    },
    /*收藏相关方法*/
    /*打开收藏夹对话框*/
    openStarDialog() {
      if (this.$store.state.isLogin === 'true')/*已登录*/ {
        console.log('in open Star');
        console.log(this.favorites);
        this.beforeFavedId = [];/*清空*/
        /*存每次打开收藏夹面板时，选中的id*/
        for (let i = 0, j = 0; i < this.favorites.length; i++) {
          if (this.favorites[i].favorited)/*已经收藏*/ {
            this.beforeFavedId[j] = this.favorites[i].id;
            j++;
          }
        }
        /*打开收藏夹面板*/
        this.starDialogVisible = true;
        this.$set(this, 'canSaveStar', false);/*【不知道可不可以这样写】*/
        console.log(this.canSaveStar);
      }
      else {
        this.$message.warning('请先登录');
        //this.$router.push('/login');
        // const url = '/login';
        // window.open(url, '_blank');
        return;
      }
    },
    /*获取收藏夹*/
    getStarList() {
      /*通过axios.get得到收藏夹，还有已存在的收藏夹*/
      this.favorites = [];/*清空数组*/
      let Headers = { 'Authorization': this.$store.getters.getStorage };
      axios.get('/videos/get_favorite', { params: { video_id: this.$route.params.id } }, { headers: Headers })
        .then(response => {
          console.log(response);
          if (response.data.errno == 0) {
            response.data.favorite.forEach((favorite, index) => {
              this.favorites.push(favorite);
            })
            console.log('in getStarList success');
            console.log(this.favorites);
          }
        })
        .catch(error => {
          console.log('Error: ' + error);
        });
    },
    /*关闭收藏夹对话框时，所做的操作*/
    closeStarDialog() {
      /*关闭对话框时，更新favorites*/
      this.getStarList();
      console.log('in close star');
      //console.log(this.favorites);/*在getStarList中会输出*/
    },
    /*收藏夹对话框的回调函数，用来判断是由于“确认”还是“取消”引起的关闭*/
    // judgeCloseReason(done){
    //   if(this.closeReasonIsSave===true){
    //     this.saveStar();
    //     done(false);
    //   }
    //   else {
    //     this.cancelStar();
    //     done(true);
    //   }
    // },
    /*判断当前收藏夹会不会有变化，来决定确定键按钮的颜色*/
    judgeChange() {
      //this.$set(this,'newStarInput',false);
      this.closeCreateStar();

      this.afterFavedId = [];
      for (let i = 0, j = 0; i < this.favorites.length; i++) {
        if (this.favorites[i].favorited)/*已经收藏*/ {
          this.afterFavedId[j] = this.favorites[i].id;
          j++;
        }
      }

      if (this.afterFavedId.length != this.beforeFavedId.length) {
        /*长度不相等，说明有变化*/
        this.$set(this, 'canSaveStar', true);
        return;
      }

      for (let i = 0; i < this.beforeFavedId.length; i++) {
        if (this.beforeFavedId[i] != this.afterFavedId[i]) {
          this.$set(this, 'canSaveStar', true);
          return;
        }
      }

      /*能到这里，说明没变化；也可以在这个方法开头写这句*/
      this.$set(this, 'canSaveStar', false);
    },
    /*点击收藏框的确认，保存结果，并通过接口发送至后端，改变stared显示*/
    saveStar() {
      console.log('in save star');
      /*无论之前收不收藏，都遍历一遍。*/
      /*发送此次这个视频还存在于其中的收藏夹id*/
      this.sendFavId = [];/*先清空*/
      for (let i = 0; i < this.favorites.length; i++) {
        if (this.favorites[i].favorited == 1) {
          this.sendFavId.push(this.favorites[i].id);//['14,15,16']。最后选用这个形式
          //this.sendFavId.push(this.favorites[i].id.toString());//["14","15","16"]
          //this.sendFavId.push(`'${this.favorites[i].id.toString()}'`);//["'15'", "'16'"]
          //this.sendFavId.push(`'${this.favorites[i].id}'`);//["'15'", "'16'"]
        }
      }
      //this.sendFavId.push();
      console.log('send');
      console.log(this.sendFavId);

      /*调用接口，发送请求*/
      let formData = new FormData();
      formData.append("video_id", this.$route.params.id);
      formData.append("favorite_list", this.sendFavId);
      formData.append("Authorization", this.$store.getters.getStorage);
      axios.post('/videos/favorite_video', formData)
        .then(response => {
          console.log(formData);
          console.log(response);

          if (response.data.errno == 0) {
            console.log('fav success');

            console.log('len: ' + this.sendFavId.length);
            /*更新stared状态*/
            if (this.sendFavId.length === 0)/*经过操作后，没有收藏了*/ {
              /*如果之前收藏了，就做出对应更改*/
              if (this.video.stared) {
                this.video.stared = false;
                this.video.star_amount -= 1;
              }
              /*如果之前就是没收藏的，就不需要变化*/
            }
            else/*经过操作后，变成已经收藏*/ {
              /*如果之前未收藏，就做出对应更改*/
              if (!this.video.stared) {
                this.video.stared = true;
                this.video.star_amount += 1;
              }
              /*如果之前就是收藏的，就不需要变化*/
            }

            /*关闭收藏夹对话框*/
            this.starDialogVisible = false;
          }
          else {
            console.log('1');
            this.$message.warning(response.data.msg);/*弹窗显示报错*/
            return;
          }
        }).catch(error => {
          console.log('2');
          console.log('Error: ' + error);
          this.$message({
            message: '发生错误，确认收藏失败',
            type: 'warning'
          });
        });
    },
    /*点击收藏框的取消，回到之前的结果*/
    // cancelStar() {
    //   if (this.closeReasonIsSave === false)/*因为取消而关闭收藏夹对话框时，才执行以下操作*/ {
    //     console.log('in true cancel Star');
    //     console.log(this.favorites);
    //     this.favorites = this.backupSelectedItems;
    //     console.log(this.favorites);
    //   }
    //   else if(this.closeReasonIsSave===true)/*由于保存而关闭收藏夹对话框*/{
    //     console.log('in virtual cancel Star');
    //     console.log(this.closeReasonIsSave);
    //   }
    // },

    /*检查该视频是否已在收藏夹中*/
    // isStaredCheck(id) {
    //   return this.favedId.includes(id); /*判断标识符id是否在数组favedId中出现过。出现过就是已收藏*/
    // },
    /*更新favedId数组中的值*/
    // updatefavedId(newList) {
    //   this.favedId = newList.filter(id => {
    //     return this.isChecked(id);
    //   });
    // },
    /*边框蓝色效果*/
    toggleActive() {
      this.isActive = !this.isActive;
    },
    /*好像失败了*/
    /*创建新的收藏夹*/
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
        let formData = new FormData();
        formData.append("title", this.starCreateNewInput);
        formData.append("Authorization", this.$store.getters.getStorage);

        let title = this.starCreateNewInput;
        axios.post('/videos/create_favorite', formData)
          .then(response => {
            console.log(formData);
            console.log(response);
            /*创建收藏夹成功*/
            if (response.data.errno === 0) {
              this.getStarList();

              /*接口成功，关闭输入框*/
              //this.newStarInput = false;
              this.$set(this, 'newStarInput', false);
              this.starCreateNewInput = '';
            }
            else/*创建收藏夹失败*/ {
              this.$message.warning(response.data.msg);
              this.starCreateNewInput = title;
            }
          }).catch(error => {
            console.log('Error: ' + error);
            this.$message({
              message: '发生错误，创建收藏夹失败',
              type: 'warning'
            });
            this.starCreateNewInput = title;
          });
      }
    },
    closeCreateStar() {
      this.$set(this, 'newStarInput', false);
      this.newStarInput = '';
      /*把输入框置为空*/
    },
    /*投诉相关方法*/
    CancelComplain() {
      // if (this.textarea_comment)//content为空
      // {
      //   this.complain_textarea = '';
      //   return;
      // }

      // this.$message.info('您的投诉已取消');
      this.complain_textarea = '';

    },
    toLogin() {
      this.$message.warning('请先登录');
      //this.$router.push('/login');
    },
    /*点击投诉键，出现投诉的对话框*/
    clickComplain() {
      //console.log('into complain');
      // /*先通过get接口判断是不是可以投诉*/
      // axios.get('/videos/is_complaint', { params: { video_id: this.$route.params.id }, headers: { Authorization: this.$store.getters.getStorage } })
      //   .then(response => {
      //     console.log(response);

      //     if(response.data.errno!=0){
      //       /*返回不成功，没有投诉权限*/
      //       this.$message.warning(response.data.msg);/*弹窗显示报错的返回信息*/
      //       return;
      //     }
      //   })
      //   .catch(error => {
      //     console.log('Error: ' + error);
      //     this.$message({
      //       message: response.msg,/*如果不能投诉，显示原因*/
      //       type: 'info'
      //     });
      //     return;
      //   });

      /*先通过存好的canComplain来确定是否可以投诉*/
      if (this.canComplain == false) {
        this.$message.warning(this.reasonComplainDisable);/*消息显示原因*/
        console.log('can not complain');
        return;
      }

      /*如果可以投诉*/
      this.complainDialog = true;/*弹出投诉的对话框*/
      /*写入投诉的弹窗MessageBox*/
      // this.$prompt('请输入投诉原因', '稿件投诉', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      // }).then(({ value }) => {
      //   /*投诉视频接口*/
      //   axios.post('/videos/complain_video', { params: { video_id: this.$router.params, content: value } })
      //   this.$message({
      //     type: 'success',
      //     message: '您的投诉已成功发送，正在等待管理员审核'
      //   });
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '取消投诉'
      //   });
      // });

      /*标记投诉状态和记录投诉原因【如果调接口了，还需要存吗？？】*/
      return;
    },
    /*发送投诉*/
    PostComplain() {
      /*能弹出对话框填写，说明肯定可以投诉*/
      /*判断输入框是否为空*/
      if (!this.complain_textarea)//content为空
      {
        this.$message.warning('投诉原因不能为空');
        return;
      }

      let formData = new FormData();
      formData.append("video_id", this.$route.params.id);
      formData.append("content", this.complain_textarea);
      formData.append("Authorization", this.$store.getters.getStorage);

      let content = this.complain_textarea;

      axios.post('/videos/complain_video', formData)
        .then(response => {
          console.log(formData);
          console.log(response);

          if (response.data.errno == 0) {
            this.$message.success('投诉视频成功');
            this.complainDialog = false;
            this.complain_textarea = '';

            this.$set(this, 'canComplain', false);
            //this.reasonComplainDisable = "您已投诉过该视频，请耐心等待管理员审核";

            /*调用get投诉的接口*/
            /*评论成功之后，通过get接口更新投诉状态，从而显示“投诉键”对应的样式*/
            this.getComplainState();
          }
          else {
            /*投诉不成功，对话框不关闭*/
            this.$message.warning(response.data.msg);/*弹窗显示报错*/
            this.complain_textarea = content;
            return;
          }
        })
        .catch(error => {
          console.log('Error: ' + error);
          this.$message.warning('发生错误，投诉视频失败');
          this.complain_textarea = content;
        });
    },
    /*得到投诉状态*/
    getComplainState() {
      /*通过get接口更新投诉状态，从而显示“投诉键”对应的样式 和 返回信息*/
      axios.get('/videos/is_complaint', { params: { video_id: this.$route.params.id }, headers: { Authorization: this.$store.getters.getStorage } })/*【还没测】*/
        .then(response => {
          console.log(response);

          if (response.data.errno == 0) /*说明成功返回*/ {
            if (response.data.is_complaint)/*说明已经投诉，没有投诉权限*/ {//this.$message.warning(response.data.msg);/*弹窗显示报错的返回信息*/
              console.log('in here');
              this.reasonComplainDisable = response.data.msg;
              this.canComplain = false;
            }
            else {
              console.log('in getComplain State: can complain');
              this.canComplain = true;
            }
          }

          /*返回errno不为0，没进这个if，说明不可以投诉*/
          console.log('load canComplian?: ' + this.canComplain);
        })
        .catch(error => {
          console.log('Error: ' + error);
        });
    },
    /*评论相关方法*/
    /*以下4个方法判断是否展示删除键*/
    judgeShowDelete(comment_id, comment_user_id) {
      /*先把所有都设置为false再重新判断*/
      for (let i = 0; i < this.showDelete.length; i++) {
        this.$set(this.showDelete, i, false);
      }


      // console.log('hahaha'+comment_id);
      if (this.isClickDel[comment_id] === false) {
        if (this.canDelete === true)/*是该视频作者或者是管理员*/ {
          //this.showDelete[comment_id]=true;
          this.$set(this.showDelete, comment_id, true);
          //console.log("j1:" + this.showDelete[comment_id]);
        }
        else if (this.canDelete === false) {
          if (comment_user_id === this.user.user_id)/*这条评论的作者是我自己*/ {
            //this.showDelete[comment_id]=true;
            this.$set(this.showDelete, comment_id, true);
            //console.log('mark1');
          }
          // else{
          //   console.log(comment_user_id);
          //   console.log('u:'+this.user.user_id);
          // }
        }
      }
      else if (this.isClickDel[comment_id]) {
        /*把自己这条已经点击了评论的删除键就也要显示*/
        this.$set(this.showDelete, comment_id, true);
      }
      else {
        console.log('not change');
      }
      // console.log(this.isClickDel[comment_id]);
      // console.log(comment_id);
      // console.log('l:' + this.showDelete.length);
      // console.log("judge:" + this.showDelete[comment_id]);
    },
    /*当鼠标移开时，隐藏删除键*/
    hideDelete(comment_id) {
      if (!this.isClickDel[comment_id]) {
        /*先把所有都设置为false再重新判断*/
        for (let i = 0; i < this.showDelete.length; i++) {
          this.$set(this.showDelete, i, false);
        }

        //this.showDelete[comment_id]=false;
        //this.$set(this.showDelete, comment_id, false);
        //console.log("hide:" + this.showDelete[comment_id]);
      }
      else if (this.isClickDel[comment_id]) {
        /*先把所有都设置为false再重新判断*/
        for (let i = 0; i < this.showDelete.length; i++) {
          this.$set(this.showDelete, i, false);
        }

        /*已经点击了评论的删除键就也要显示*/
        this.$set(this.showDelete, comment_id, true);
      }
    },
    /*如果已经点击了评论的删除，就要让删除键显示*/
    clickDel(comment_id) {
      /*先把所有都设置为false再重新判断*/
      for (let i = 0; i < this.showDelete.length; i++) {
        this.$set(this.showDelete, i, false);
      }
      /*清空其它id评论的已点击，设为fasle*/
      for (let i = 0; i < this.isClickDel.length; i++) {
        this.$set(this.isClickDel, i, false);
      }
      /*把当前点击的这个设置为isClick设置为true*/
      this.$set(this.isClickDel, comment_id, true);
      this.$set(this.showDelete, comment_id, true);
    },
    /*点击删除键后，再点击它的气泡确认框的取消键*/
    delCancel(comment_id) {
      /*先把所有都设置为false再重新判断*/
      for (let i = 0; i < this.showDelete.length; i++) {
        this.$set(this.showDelete, i, false);
      }
      /*清空其它id评论的已点击，设为fasle*/
      for (let i = 0; i < this.isClickDel.length; i++) {
        this.$set(this.isClickDel, i, false);
      }
      /*经过清空后（防止出错），再进行之后的操作*/
      //this.$set(this, 'isClickDel', false);
      this.$set(this.isClickDel, comment_id, false);
      this.$set(this.showDelete, comment_id, false);
    },
    /*登录状态下，发布一级评论的接口*/
    PostComment() {
      /*判断当前是否登录，在渲染代码中判断，不需要点击发布键*/
      /*能在这个接口，一定是已经登录了*/

      /*判断评论输入框内容是否为空*/
      if (!this.textarea_comment)//content为空
      {
        this.$message({
          message: '评论不能为空',
          type: 'warning',
        });
        return;
      }
      let content = this.textarea_comment;

      let formData = new FormData();
      formData.append("video_id", this.$route.params.id);
      formData.append("content", this.textarea_comment);
      formData.append("Authorization", this.$store.getters.getStorage);/*Token*/
      axios.post('/videos/comment_video', formData) /*这里没传token*/
        .then(response => {
          console.log(formData);
          console.log(response);

          /*评论成功*/
          if (response.data.errno == 0) {
            this.$message.success('发送评论成功');
            this.textarea_comment = ''; /*清空评论输入框*/
            this.textarea_comment_l2 = [];

            /*重新get新的所有评论【待测试】*/
            this.getComments();/*获取评论*/
          }
          else {
            this.$message.warning(response.data.msg);/*弹窗显示报错*/
            this.textarea_comment = content;
            return;
          }
        })
        .catch(error => {
          console.log('Error: ' + error);
          this.$message({
            message: '发生错误，评论失败',
            type: 'warning'
          });
        });
    },
    /*在未登录状态下，点击评论的输入框或发布，跳转到这里*/
    clickSend() {
      this.$message.warning('还未登录，请先登录');/*先去登录*/
      //this.$router.push('/login');
      // const url = '/login';
      // window.open(url, '_blank');
      return;
    },
    /*删除一级评论*/
    deleteComment(comment_id) {
      /*判断是否登录*/
      /*判断是否有删除权限*/
      /*【如果没有该条评论的删除权限，应该直接看不到删除键，更不会点进来】*/

      let formData = new FormData();
      /*不需要视频id？？【】*/
      formData.append("comment_id", comment_id);
      formData.append("Authorization", this.$store.getters.getStorage);/*Token*/
      axios.post('/videos/delete_comment', formData)//【还没测过】
        .then(response => {
          console.log(response);

          if (response.data.errno == 0) {
            this.$message.success('删除评论成功');
            /*成功点击确认后。根据鼠标位置，来决定是否显示删除键*/
            this.$set(this.showDelete, comment_id, false);
            /*重新get评论，为了实时显示变化*/
            this.getComments();/*获取评论*/
          }
          else {
            this.$message.warning(response.data.msg);/*弹窗显示报错*/
            /*删除评论失败的时候，不关闭”删除键“的显示*/
            return;
          }
        })
        .catch(error => {
          console.log('Error: ' + error);
          this.$message.warning('发生错误，删除评论失败');
          return;
        });

      /*根据鼠标位置，来决定是否显示删除键*/
      //this.hideDelete(comment_id);
      this.$set(this.showDelete, comment_id, false);
      console.log("hide-click:" + this.showDelete[comment_id]);
    },
    /*点击回复键，弹出reply的输入框*/
    /*点击1下是弹出，点击2下是*/
    PopInput(index) {
      /*给删除键debug【之后删掉】*/
      // console.log('show:'+this.showDelete[comm_id]);
      /*如果已经登录，点击“回复”弹出输入框*/
      if (this.$store.state.isLogin) {
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
      }
      else {
        /*没有登录，点击“回复”，显示“未登录”*/
        this.$message.warning('当前未登录，请先去登录');/*先去登录*/
        //this.$router.push('/login');
        // const url = '/login';
        // window.open(url, '_blank');
        return;
      }
    },
    /*回复一级评论，发布二级评论即Reply*/
    PostReply(comment_id, index) { /*这里的comment_id是一级评论id，指此reply属于哪个一级评论*/
      if (!this.textarea_comment_l2[index])/*输入为空，不能发布*/ {
        this.$message({
          message: '评论不能为空',
          type: 'warning'
        });
        return;
      }

      let content = this.textarea_comment_l2[index];
      let formData = new FormData();
      formData.append("comment_id", comment_id);/*所回复的一级评论的id；到底要不要独立有待商榷*/
      formData.append("content", this.textarea_comment_l2[index]);
      formData.append("video_id", this.$route.params.id);
      formData.append("Authorization", this.$store.getters.getStorage);

      axios.post('/videos/reply_comment', formData)
        .then(response => {
          console.log(formData);
          console.log(response);

          if (response.data.errno == 0) {
            this.$message.success('回复评论成功');
            this.textarea_comment_l2[index] = '';
            this.textarea_comment_l2 = [];
            /*将reply输入框关闭*/
            this.show_comment_input[index] = false;
            //this.$set(this.show_comment_input, index, false);

            //this.clickReplyCnt = 0;/*将Cnt设置为0，使得下一次点击“回复”，可以弹出输入框*/
            for (let i = 0; i < this.clickReplyCnt.length; i++) {
              this.clickReplyCnt[i] = 0;
            }

            /*重新get评论，为了实时显示变化*/
            this.getComments();/*获取评论*/
          }
          else {
            this.$message.warning(response.data.msg);/*弹窗显示报错*/
            this.textarea_comment_l2[index] = content;
            return;
          }
        })
        .catch(error => {
          console.log('Error: ' + error);
          this.$message({
            message: '发生错误，回复评论失败',
            type: 'warning'
          });
          this.textarea_comment_l2[index] = content;
        });
    },
    /*删除回复（即二级评论）*/
    /*注意，对应删除回复的地方，要调DeleteReply*/
    DeleteReply(reply_id) {
      /*判断是否有删除权限*/
      /*【如果没有该条评论的删除权限，应该直接看不到删除键，更不会点进来】*/
      let formData = new FormData();
      /*不需要视频id？？【】*/
      formData.append("reply_id", reply_id);
      formData.append("Authorization", this.$store.getters.getStorage);/*Token*/

      axios.post('/videos/delete_reply', formData)//【还没测过】
        .then(response => {
          console.log(response);

          if (response.data.errno == 0) {
            this.$message.success('删除回复成功');
            /*成功点击确认后。根据鼠标位置，来决定是否显示删除键*/
            this.$set(this.showDelete, reply_id, false);

            /*重新get评论，为了实时显示变化*/
            this.getComments();/*获取评论*/
          }
          else {
            this.$message.warning(response.data.msg);/*弹窗显示报错*/
            /*删除评论失败的时候，不关闭”删除键“的显示*/
            return;
          }
        })
        .catch(error => {
          console.log('Error: ' + error);
          this.$message.warning('发生错误，删除回复失败');
          return;
        });

      /*根据鼠标位置，来决定是否显示删除键*/
      this.$set(this.showDelete, reply_id, false);
      console.log("hide-click:" + this.showDelete[reply_id]);
    },
    /*视频作者相关操作*/
    /*关注视频作者*/
    Follow() {

      let formData = new FormData();
      formData.append("following_id", this.video.author_id);
      //console.log(this.video.author_id);
      //formData.append("Authorization", this.$store.getters.getStorage);

      /*已经登录*/
      if (this.$store.state.isLogin === "true") {
        let Headers = { 'Authorization': this.$store.getters.getStorage };

        axios.post('/account/create_follow', formData, { headers: Headers })
          .then(response => {
            console.log(formData);
            console.log(response);
            if (response.data.errno == 401) /*用户未登录，就跳转到用户登录界面去登录*/ {
              this.$message.warning(response.data.msg);/*先去登录*/
              //this.$router.push('/login');
              //const url = '/login';
              //window.open(url, '_blank');
              return;
            }
            else if (response.data.errno == 0) {
              this.$message.success('关注成功');
              this.$data.video.isFollowed = true;
              this.$data.video.author_follower_amount = response.data.follower_num;/*根据后端返回的数量来更新前端【待确定行不行】*/
              //this.$data.video.author_follower_amount++;
            }
            else {
              this.$message.warning(response.data.msg);/*弹窗显示报错*/
              return;
            }
          })
          .catch(error => {
            console.log('Error: ' + error);
            this.$message.warning('发生错误，关注失败');
          });
      }
      else {
        console.log(this.$store.state.isLogin);
        this.$message.warning('还未登录，请先登录');/*先去登录*/
        //this.$router.push('/login');
        //const url = '/login';
        //window.open(url, '_blank');
        return;
      }
    },
    /*取关视频作者*/
    DisFollow() {
      let formData = new FormData();
      formData.append("following_id", this.video.author_id);
      formData.append("Authorization", this.$store.getters.getStorage);
      axios.post('/account/remove_follow', formData)
        .then(response => {
          console.log(formData);
          console.log(response);

          if (response.data.errno == 0) {
            this.$message.success('取关成功');
            this.$data.video.isFollowed = false;
            this.$data.video.author_follower_amount = response.data.follower_num;/*根据后端返回的数量来更新前端【待确定行不行】*/
            //this.$data.video.author_follower_amount--;
          }
          else {
            this.$message.warning(response.data.msg);/*弹窗显示报错*/
            return;
          }
        })
        .catch(error => {
          console.log('Error: ' + error);
          this.$message.warning('发生错误，取关失败');
        });
    },
    /*跳转到推荐视频对应的播放页*/
    jumpTo(video_id) {
      //this.$router.push('/video/'+video_id);
      const video_play_url = '/video/' + video_id;
      window.open(video_play_url, '_self');
    },
    jumpToUser(user_id) {
      const display_user_url = '/lookPerson/' + user_id;
      window.open(display_user_url, '_self');
    },


    /*获取视频宽度*/
    // onResize() {
    //   const boxWidth = this.$refs.box.offsetWidth;
    //   console.log(boxWidth);
    // },

    // submitComment() {
    //   this.submittingComment = true;
    //   // 发布评论逻辑
    //   setTimeout(() => {
    //     this.commentInput = "";
    //     this.submittingComment = false;
    //   }, 1000);
    // },
  },
  /*获取视频块宽度*/
  // mounted() {
  //   this.$nextTick(() => {
  //     window.addEventListener("resize", this.onResize);
  //   });
  // },
  // beforeDestroy() {
  //   window.removeEventListener("resize", this.onResize);
  // },
  // watch: {
  //   /*监听checkList数组的变化。当checkList数组发生变化时，调用updateCheckList方法来更新选中的多选框。*/
  //   favedId(newList) {
  //     this.updatefavedId(newList);
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

/* .info {
  display: flex;
  justify-content: space-between;
  padding: 20px;
} */

/* .title {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
} */

/*
.authorPhoto {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  //float: inline-end;
  flex: 1;
}
*/

.playvideo_title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* .video_show {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
} */

/* .player {
  display: flex;
} */

.video_player {
  /* border: 1px solid gray; */
  display: inline-block;
}

.video_player video {
  display: flex;
  width: 100%;
  min-height: 400px;
  max-height: 550px;
  /* padding-top: 20px;
  padding-bottom: 15px; */
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

/* .introduction {
  width: 600px;
  padding-left: 50px;
  padding-top: 15px;
  padding-bottom: 15px;
  box-sizing: border-box;
} */

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

.recommend_block {
  /* border: 1px solid rgba(176, 170, 170, 0.703);
  border-radius: 4px; */
  border: 2px solid #d0dcdc9a;
  border-radius: 10px;
  padding: 10px 0 10px 0;
  box-shadow: 0 .5px 0 .5px#e7f6f69a;
}

/* 
.comment {
  display: flex;
  margin-top: 20px;
  margin-left: 50px;
  z-index: 0;
  position: relative;
} */
/* 
.comment-header {
  flex-direction: row;
} */

/* .comment-title {
  flex-direction: row;
  flex: 1;
} */

/* .comment-count {
  flex-direction: row;
  flex: 1;
} */

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

.rec_video_author {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

/*以下样式设置鼠标悬停显示颜色*/
.rec_video_title:hover {
  color: rgb(11, 168, 235);
  cursor: pointer;
}

.videoFuncClick:hover {
  color: rgb(0, 179, 255);
  /*这个颜色比较接近链接的颜色*/
  cursor: pointer;
}

.replyBtn:hover {
  color: rgb(0, 179, 255);
  /*这个颜色比较接近链接的颜色*/
  cursor: pointer;
}

.textBtn:hover {
  color: rgb(0, 179, 255);
  /*这个颜色比较接近链接的颜色*/
  cursor: pointer;
}
</style>
