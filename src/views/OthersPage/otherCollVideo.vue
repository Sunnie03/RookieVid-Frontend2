<template>
    <div class="person-container">
        <!-- 根标签 -->
        <top-header></top-header>
        <div class="info-container">
        <div class="title-container" >
          <img class="photo" :src="avatar">
          <div class="text-container" style="flex:1;">
            <div class="text-title" > 昵称：{{ username }}</div>
            <div class="user-sign" v-if="signature">个性签名：{{signature}}</div>
            <div class="user-sign" v-else>个性签名：这个人很懒，什么都没写吖</div>
            <div class="user-sign">邮箱：{{email}}</div>
          </div>
          <button class="follow-button">+关注</button>
          
        </div>

        

        <el-main>
         
          <el-col :span="4" style="height:100%">
            <el-menu
              default-active="1-4-1"
              class="el-menu-vertical-demo" style="height:100%;type:flex;justify:center" >
              <el-menu-item index="1" class="verti-menu" v-on:click="openVideo">
                <i class="el-icon-edit"></i>
                <span slot="title">TA的投稿</span>
              </el-menu-item>
              <el-menu-item index="2" class="verti-menu is-active" v-on:click="openCollect">
                <i class="el-icon-star-off" ></i>
                <span slot="title">TA的收藏夹</span>
              </el-menu-item>
              
            </el-menu>
          </el-col>

          <div class="titles-container" style="margin-top:40px">
                <a class="titles" v-on:click="goBack" style="float:left;width:10%;height:auto">回到上一级</a>
                
                <div class="text-title" > 
                  <img class="photo" :src="collectCov" style="border-radius:3%;height:120px;width:180px"/>
                  收藏夹：{{ collect_name }}
                </div>
              </div>

          <div class="recommend-container" v-if="!this.null_flag">
            <!-- 这里要改，v-if的逻辑不对，title-container应该是始终显示的 -->
            
            <!-- <div id="collect-video-container" v-if="!this.null_flag"> -->
              <div v-for="(video,index) in this.partition" :key="index" class="recommend-item" >
                <!-- <router-link :to="{name:'video',params:{'id':video.id}}"> -->
                <img class="recommend-img" :src="video.cover_url" v-on:click="playVideo(video.id)">
                <!-- </router-link> -->
                <div class="overlay">
                  <span class="play-info">
                    <img class="play-icon" src="../../assets/display/play_circle_outline.svg">
                    {{video.view_amount }}</span>
                  <span class="like-info">
                    <img class="like-icon" src="../../assets/display/thumb-up.svg">
                    {{ video.like_amount }}
                  </span>
                </div>
                  <a class="titles" v-on:click="playVideo(video.id)">{{ video.title }}</a>
                <div class="author">
                  <!-- <span class="time">{{ video.created_at.split('T')[0] }}</span> -->
                  <span class="author-tag">作者</span>
                  <span class="author-name">{{ video.user_name }}</span>
                  <span class="time">{{ video.created_at ? video.created_at.split('T')[0] : '' }}</span>
  
                </div>
              </div>
            
          </div>
        
          <div v-else><h2 style="margin:50px 0 0 500px">这是一个空收藏夹吖</h2></div>
          
        </el-main>
      </div>
          
    </div>
         
</template>

<script>
import router from '@/router'
import axios from 'axios'
// import { callbackify } from 'util'
import Header from '@/components/HomePage/Header.vue'

// Vue.component('my-component', NavComponent);
export default {
  components: {
    'top-header':Header,
  },
  data () {
    return {
      look_user: 0,
      username: '',
      avatar: '',
      userid: '',
      email: '',
      signature: '',
      null_flag: false,
      partition:[''],
      collect_name: '',
      collect_id: '',
      collectCov:''
    }
  },
  created() {
    this.getData();
    this.getVideo();
    this.collect_id = this.$route.params.collect_id;
    this.collect_name = this.$route.params.collect_name;
    console.log(this.$store.state)
  },
  methods: {
    openVideo(){
        this.$router.push({name:'lookPerson',params:this.look_user})//注意看应该是获取到的user_id
       
    },
    openCollect(){
      // window.open(collect_url,'_blank');
      return 
      
    },
    getData() { //获取个人资料
      this.look_user = this.$route.params.user_id
      let Headers={'Authorization': this.$store.state.token}
      axios.get('/account/display_profile',{ headers: Headers, params:{user_id: this.look_user} })
      .then((res) => {
        console.log(res);
        console.log(Headers);
        if(res.data.errno == 0){  //获取成功
          this.userid = res.data.context.uid,
          this.username = res.data.context.username,
          this.email = res.data.context.email
          this.signature = res.data.context.signature  //这是个性签名
          this.avatar = res.data.context.avatar_url   //这是头像
        }else {
            alert(res.data.msg)
            // if(res.data.errno == )
        }
      }).catch(
        console.error()
      )
    },
    getVideo() {
      let Headers={'Authorization': this.$store.getters.getStorage}
      let collect_id = this.$route.params.collect_id
      axios.get('/account/get_favlist',{ headers: Headers, params:{favorite_id: collect_id} })
      .then((res) => {
        console.log(res);
        if(res.data.errno == 0){  //获取成功
          this.collectCov = res.data.cover_url;
          if (Array.isArray(res.data.data) && res.data.data.length>0) {
              this.partition = res.data.data; 
              this.null_flag = false;
              console.log(this.partition)
          } else {    
              //空收藏夹
              this.null_flag = true
          }
        }
        else{
          alert(res.data.msg)
          window.close()
        }
      }).catch(
        console.error()
      )
    },
    goBack(){
        this.$router.push({name:'lookOthersCollect',params:this.look_user})
    }
  }
}
</script>

<style scoped>
.person-container {
    border: 1px;
    background-size: 100% 100% ;
    background-repeat: no-repeat;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.info-container {
  height: 100%;
}
.photo {
    /*border-style: double;*/
    width: 80px;
    height: 80px;
    border-radius: 50% ;
    vertical-align: middle;
}
.text-title {
    display:inline;
    font-size: 30px;
    background-repeat: repeat;
    margin-left: 40px;
    margin-bottom: 100px;
}
.titles-container {
    display:flex; 
    /*justify-content: center;
    align-items: center;*/
    border-bottom:#81928c 1px solid;
    height: 150px;
    opacity: 0.9;
  }
  
.user-sign {
  font-size: 16px;
  margin-right: 10px;
  width: 600px;
  margin-left: 40px;
  color: rgb(61, 59, 59);
}

.el-main {
  color: #4a5045;
  text-align:justify;
  height:100%;
  padding: 0;
}
.title-container {
    display:flex; 
    justify-content: flex-start;
    align-items: center;
    border:#09553d 1px;
    height: 260px;
    padding-left: 5% ;
    background-image: url("@/../image/titleBack1.png");
    background-size:cover;
}

.v-application {
  font-family: "Roboto", sans-serif;
  line-height: 1.6;
}
.follow-button {
  margin-right: 5%;
  background-color: #22b8cf;

  color: white;
  border-radius: 4px;
  padding: 6px 10px;
  font-weight: bold;
  cursor: pointer;
}

.el-menu-vertical-demo {
  border-right: grey 1px solid;
  background-color:rgb(252, 252, 247);
  height: 100%;
}
.v-application ul, .v-application ol {
   padding-left: 0px; 
}
.verti-menu{
  height: 200px;
  text-align: center;
  vertical-align: middle;
  line-height: 200px;
  }

  /*从我的投稿抄过来的代码*/
  .recommend-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    padding-top: 40px;
  }
  .recommend-item {
      width: 85%;
      height: 250px;
      position: relative;
      /*margin-bottom: 20px;*/
  }
  .recommend-img{
    width:100%;
    height:60%;
    object-fit:cover;
    border-radius: 6px;
  }
  
  .overlay {
    position: absolute;
    bottom: 40%;
    left: 0;
    width: 100%;
    height: 10%;
    /*background-color:rgba(255, 255, 255,0.5); */
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)); 
  }
    
  .play-info, .like-info {
    display: flex;
    align-items: center;
    color: #fff;/*rgb(78, 77, 77);*/
    font-weight:bold;
    margin-left: 8px;
    margin-right:8px;
  }
  .play-icon, .like-icon{
    margin:5px;
  }
  a{
    text-decoration: none;
  }
  .titles {
      position: relative;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 20%;
      /* background-color: rgba(0, 0, 0, 0.5); */
      color: black;
      display: flex;
     /* justify-content: center;
      align-items: center;*/
      font-size: 14px;
      font-weight: bold;
      padding: 10px;
      box-sizing: border-box;
      text-overflow:ellipsis;
      word-break:break-all;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
      overflow:hidden;
    }
   
  .titles:hover{
      color:#1e90ff;
    }
  
  .author {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    margin-top: 8px;
    margin-left:5px;
  }
  
  .author-tag {
    width:50px;
    /*height:30px; */
    border: 1px solid #20bcf0;
    font-weight:bold;
    color: #20bcf0;
    font-size: 10px;
    background-color: rgba(35, 179, 241, 0.1);
    border-radius: 4px;
    padding: 2px 8px;
    margin-right: 8px;
  }
  
  .author-name {
    font-weight: bold;
    color: grey;
    padding: 2px 8px;
    /* margin-right:0; */
  }
  .time{
    font-size:smaller;
    margin-top:5px;
    margin-left: 0px;
    width: 100%;
  }
</style>
