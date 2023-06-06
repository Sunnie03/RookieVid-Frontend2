<template>
    <div class="person-container">
        <!-- 根标签 -->
        <top-header></top-header>
        <my-component></my-component>

        
        <div class="info-container">
          <a id="TOPUp" href="#">
            <img style="width: 100%;height: 100%;border-radius:50%" src="../../assets/top.jpg" alt="">
          </a>
          <div class="titles-container" >
            <a class="titles" v-on:click="goBack" style="float:left;width:25%;height:auto">回到上一级</a>
            
            <div class="text-title" > 
              <img class="photo" :src="collectCov"/>
              收藏夹：{{ collect_name }}
            </div>
          </div>
  
          
            <div class="recommend-container" v-if="!this.null_flag">
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
                    <span class="author-tag">作者</span>
                    <span class="author-name">{{ video.user_name | ellipsis}}</span>
                    <span class="time">{{ video.created_at ? video.created_at.substring(0, 10): ''}}</span>
    
                  </div>
                </div>
              
            </div>
          
            <div v-else><h2 style="margin:50px 0 0 500px">这是一个空收藏夹吖</h2></div>
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
        collect_name: '',
        collect_id: '',
        partition:[''],
        collectCov: '',
        null_flag: true
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 5) {
        return value.slice(0, 5) + "...";
      }
      return value;
    }
  },

  created() {
    this.getVideo();
    this.collect_id = this.$route.params.collect_id;
    this.collect_name = this.$route.params.collect_name;
  },
  methods: {
    openVideo(){
      return 
    },
    playVideo(id){
      this.$router.push({ name: 'video/', params: { id }})
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
    goBack() {
        window.close()
    },
    
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
    height: 90%;
  }
  .photo {
    width: 220px;
    height: 150px;
    vertical-align: middle;
    margin-right: 50px;
  }
  .text-title {
    display:inline;
    font-size: 30px;
    background-repeat: repeat;
    margin-left: 20px;
  }
  
  .info-container{
  color: #4a5045;
  text-align:justify;
  font-size: 15px;
  height:100%;
  padding-left: 30px;
  margin-top: 20px;
  }
  .titles-container {
    display:flex; 
    /*justify-content: center;
    align-items: center;*/
    border:#09553d 1px;
    height: 200px;
    opacity: 0.9;
  }
  .el-main {
    height: 100%;
  }
  
  
  /*首页抄的视频代码*/
   .recommend-container {
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
    height:80%;
    object-fit:cover;
    border-radius: 6px;
  }
  
  .overlay {
    position: absolute;
    bottom: 20%;
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
    padding: 2px 6px;
    margin-right: 8px;
    width:60px;
  }
  
  .author-name {
    font-weight: bold;
    color: grey;
    width: 150px;
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
    align-content: center;
  }
  
  </style>
  