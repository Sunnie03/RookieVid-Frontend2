<template>
  <div class="followBlock">
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
  </div>
</template>


<script>
export default {
  name: 'FollowBlock',
  methods:{
    /*关注*/
    Follow() {
      let formData = new FormData();
      formData.append("following_id", this.video.user_id);
      formData.append("Authorization", this.$store.getters.getStorage);
      axios.post('/account/create_follow', formData)
        .then(response => {
          console.log(formData);
          console.log(response);
          if (response.data.errno == 0) {
            this.$message.success('关注成功');
            this.$data.video.isFollowed = true;
            this.$data.video.author_follower_amount = response.data.follower;/*根据后端返回的数量来更新前端【待确定行不行】*/
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
    },
    /*取关视频作者*/
    DisFollow() {
      let formData = new FormData();
      formData.append("following_id", this.video.user_id);
      formData.append("Authorization", this.$store.getters.getStorage);
      axios.post('/account/remove_follow', formData)
        .then(response => {
          console.log(formData);
          console.log(response);

          if (response.data.errno == 0) {
            this.$message.success('取关成功');
            this.$data.video.isFollowed = false;
            this.$data.video.author_follower_amount = response.data.follower;/*根据后端返回的数量来更新前端【待确定行不行】*/
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
  },
}
</script>