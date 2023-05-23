<template>
  <div class="admin_all_video">
    <!--导航栏-->
    <AdminHeader />
    <!--管理栏的导航栏-->
    <AdminGuide />
    <!--【下面补全该页面代码】-->
    <el-container>
      <div :style="{ 'width': '50vw', 'margin-top': '30px', 'justify-content': 'center' }" class="mx-auto">
        <div style="margin-bottom: 15px;">
          <h1>全部视频</h1>
        </div>
        <!--for循环-->
        <v-card height="200px">
          <div class="show_video_block" style="padding-top: 20px;padding-bottom: 10px;padding-left: 20px;">
            <v-row>
              <v-col cols="12" md="5">
                <!-- <img :src="recommend_item.cover_url" width="100%" /> -->
                <img src="../../assets/web_logo.png" height="160px" />
              </v-col>

              <v-col class="complain_introdction" cols="12" md="7">
                <div class="complain_video_title">
                  <h3>视频标题{{ }}</h3>
                </div>

                <div style="margin-top: 10px;margin-bottom: 10px;">
                  <el-tag type="info" effect="plain" size="mini">作者 </el-tag> 作者{{ }}
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
              </v-col>
            </v-row>
          </div>
        </v-card>
      </div>
    </el-container>
  </div>
</template>

<script>
import AdminHeader from '@/components/AdminPage/AdminHeader.vue'
import AdminGuide from '@/components/AdminPage/AdminGuide.vue'
export default {
  name: 'allVideo',//当前引入页面
  components: {
    AdminHeader,
    AdminGuide,
  },
  data() {
    return {

    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let Headers = { 'Authorization': this.$store.getters.getStorage };/*获取token*/
      axios.get('/super_admin/get_review_video',{headers:Headers, params: { favorite_id: 1 } })
    }
  }
}

</script>