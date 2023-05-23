<template>
  <div class="person-container">
      <!-- 根标签 -->
      <top-header></top-header>
      <my-component></my-component>

      <el-col :span="4" style="height:100%">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo" style="height:100%;type:flex;justify:center" >
          <el-menu-item index="1" class="verti-menu" v-on:click="openPerson">
            <i class="el-icon-s-order"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item index="2" class="verti-menu is-active" v-on:click="openVideo">
            <i class="el-icon-edit" ></i>
            <span slot="title">我的投稿</span>
          </el-menu-item>
          <el-menu-item index="3" class="verti-menu" v-on:click="openChange">
            <i class="el-icon-setting"></i>
            <span slot="title">修改个人资料</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      
      <div class="info-container">
        <a id="TOPUp" href="#topAnchor">
          <img style="width: 100%;height: 100%;" src="../../assets/top.jpg" alt="">
        </a>
        <div class="titles-container" >
          <img class="photo" :src="avatar">
          <div class="text-title" > 昵称：{{ username }}</div>
        </div>

        
          <div class="recommend-container">
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
                <el-button v-on:click="changeVideo(video.id)" size="small" style="align-self:flex-end; ">修改  </el-button>
                <span class="time">{{ video.created_at ? video.created_at.split('T')[0] : '' }}</span>

              </div>
            </div>
          </div>
        </div>
      <!-- </el-main> -->
        
  </div>
       
</template>

<script>
import router from '@/router'
import axios from 'axios'
// import { callbackify } from 'util'
import NavComponent from '../../components/PersonPage/navMenu.vue';
import Header from '@/components/HomePage/Header.vue'

// Vue.component('my-component', NavComponent);
export default {
  components: {
    'my-component': NavComponent,
    'top-header':Header,
  
  },
data () {
  return {
    username: '',
    avatar: '',
    partition:[''],
  }
},
created() {
  this.getData();
  this.getVideo()
},
methods: {
  openVideo(){
    return 
  },
  openPerson(){
    this.$router.push({name:'person'})
  },
  openChange(){
    this.$router.push({name:'myChange'})
  },
  playVideo(id){
    this.$router.push({ name: 'video', params: { id }})
  },
  changeVideo(id){
    this.$router.push({ name: 'video', params: { id }})//这里是修改稿件的路由，需要设置跳转，以及传入参数
  },
  getData() {
    let Headers={'Authorization': this.$store.getters.getStorage}
    axios.get('/account/display_profile',{ headers: Headers, params:{user_id: 1} })
    .then((res) => {
      console.log(res);
      console.log(Headers);
      if(res.data.errno == 0){  //获取成功
        this.username = res.data.context.username,
        this.avatar = res.data.context.avatar_url   //这是头像
      }else {
        alert(res.data.msg)
        // if(errno == )
      }
    }).catch(
      console.error()
    )
  },
  getVideo() {
    let Headers={'Authorization': this.$store.getters.getStorage}
    axios.get('/account/get_videos',{ headers: Headers, params:{user_id: 1} })
    .then((res) => {
      console.log(res);
      if(res.data.errno == 0){  //获取成功
        if (Array.isArray(res.data.data)) {
            this.partition = res.data.data; 
            console.log(this.partition)
        } else {    //我估计传回来的是空
            alert("获取数据出错")
        }
      }
    }).catch(
      console.error()
    )
  }
}
}
</script>

<style scoped>
.person-container {
  background-color: antiquewhite;
  border: 1px;
  background-size: 100% 100% ;
  background-repeat: no-repeat;
  position: absolute;
  width: 100%;
  height: 100%;
}
.photo {
  border-style: double;
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
}
.verti-menu{
height: 150px;
text-align: center;
}
.info-container{
background-color: antiquewhite;
color: #4a5045;
text-align:justify;
font-size: 15px;
height:100%;
padding-left: 30px;
margin-top: 20px;
}
.titles-container {
  display:flex; 
  justify-content: center;
  align-items: center;
  border:#09553d 1px;
  height: 100px;
  opacity: 0.9;
}
el-main {
  overflow: auto;
}


/*首页抄的视频代码*/
 .recommend-container {
  background-color: antiquewhite;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  margin-top: 30px;
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
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    padding: 10px;
    box-sizing: border-box;
    word-break:break-all;
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
  /* width:50px;
  height:30px; */
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
  color:grey;
  font-size:smaller;
  margin-top:5px;
  text-align: right;
  width: 100%;
}
.v-application ul, .v-application ol {
  padding-left: 0px
}

#TOPUp{
  position: fixed;
  right: 45px;
  bottom: 100px;
  width: 40px;
  height: 40px;
  z-index: 99999999;
  box-shadow: 0px 0px 4px 4px #ecefef;
  border-radius: 600px;
}

</style>
