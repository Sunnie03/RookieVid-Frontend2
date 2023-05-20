<template>
  <div class="admin_complain">

    <!--导航栏-->
    <AdminHeader />
    <!--管理栏的导航栏-->
    <AdminGuide />

    <el-container>
      <div :style="{ 'width': '60vw', 'margin-top': '30px', 'justify-content': 'center' }" class="mx-auto">
        <h1>投诉视频列表</h1>
        <v-card height="200px">
          <div class="complained_video_block" style="padding-top: 20px;padding-bottom: 10px;">
            <v-row>
              <v-col cols="12" md="6">
                <!-- <img :src="recommend_item.cover_url" width="100%" /> -->
                <img src="../../assets/web_logo.png" height="100%" />
              </v-col>

              <v-col class="complain_introdction" cols="12" md="6">
                <div class="complain_video_title">
                  投诉视频标题{{ }}
                </div>

                <div style="margin-top: 10px;margin-bottom: 10px;">
                  <el-tag type="info" effect="plain" size="mini">作者 </el-tag>{{ }}
                </div>

                <div>
                  <span style="margin-right: 25px;">
                    <v-icon
                      style="width: 4px;height: 4px;margin-left: 8px;margin-right: 8px;">mdi-motion-play-outline</v-icon>
                    12{{ }}
                  </span>
                  <span>
                    <v-icon
                      style="width: 4px;height: 4px;margin-left: 8px;margin-right: 8px;">mdi-text-box-outline</v-icon>
                    6{{ }}
                  </span>
                </div>

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
import AdminHeader from '@/components/AdminPage/AdminHeader.vue'
import AdminGuide from '@/components/AdminPage/AdminGuide.vue'
export default {
  name: 'complaintList',//当前引入页面
  components: {
    AdminHeader,
    AdminGuide,
  },
}
</script>