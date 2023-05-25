<template>
   
    <div class="recreation">
       <!--导航栏-->
       <Header />
      <!--分区-->
      <Partition></Partition>
  
      <div class="top-carousel">
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="(video,index) in this.top_videos" :key="index" >
            <!-- <router-link :to="{name:'video',params:{'id':video.video_id}}"> -->
              <img class="top-img" :src="video.cover_url" style="height:100%" @click="videoPlay(video.id)">
                <div class="top-overlay" @click="videoPlay(video.id)">
                 <div class="top-title">{{ video.title }}</div>
                </div>
            <!-- </router-link> -->
            
          </el-carousel-item>
  
        </el-carousel>
  
      </div>
      <div class="recommend-display">
        <div class="recommend-container">
          <div v-for="(video,index) in this.videos" :key="index" class="recommend-item">
            <!-- <router-link :to="{name:'video',params:{'id':video.video_id}}"> -->
            <img class="recommend-img" :src="video.cover_url" @click="videoPlay(video.video_id)">
            <!-- </router-link> -->
            <div class="overlay">
              <span class="play-info">
                <img class="play-icon" src="../assets/display/play_circle_outline.svg">
                {{video.view_amount }}</span>
              <span class="like-info">
                <img class="like-icon" src="../assets/display/thumb-up.svg">
                {{ video.like_amount }}
              </span>
            </div>
            <!-- <router-link :to="{name:'video',params:{'id':video.video_id}}"> -->
              <div class="recommend-title" @click="videoPlay(video.video_id)">{{ video.title }} </div>
            <!-- </router-link> -->
            <div class="author">
              <span class="author-tag">作者</span>
              <span class="author-name" @click="goPersonPage(video.user_id)">{{ video.user_name }}</span>
              <span class="time">{{ video.created_at?video.created_at.split('T')[0]:''}}</span>
            </div>
          </div>
        </div>
        <div class="ranking-display">
          <div style="font-weight:bold;font-size:23px;margin-bottom:10px;margin-left:20px;">热播</div>
          <ul class="ranking-container">
            
            <li class="ranking-item" v-for="(video,index) in this.ranking_list" :key="index">
              <span class="ranking-number">{{ index+1 }}</span>
                <img v-if="index===0" :src="video.cover_url" class="top-cover" @click="videoPlay(video.id)">
  
              <span class="ranking-video-title" @click="videoPlay(video.id)">{{ video.title }}</span>
            </li>
          </ul>
         
        </div>
        
      </div>
      
    </div>
  </template>
  
  <script>
  
  import axios from 'axios'
  export default {
    
    // name: 'EntertainmentView',//当前引入页面
   
    props:{
        partition_label:String,
    },
    data(){
        return {
            videos:[""],
            top_videos:[""],
            ranking_list:[""],
        }
    },
    created(){
        this.getAll(this.partition_label,-1);
        this.getData(this.partition_label,5);
        this.getData(this.partition_label,8);
    },
    methods:{
        videoPlay(id){
          const video_play_url='/video/'+id
          window.open(video_play_url,'_blank');
        },
        goPersonPage(uid){
            const user_page_url='/lookPerson/'+uid;
            window.open(user_page_url,'_blank');
          },
        getAll(text,id){
          axios.get('/videos/get_video_by_label',{params:{label:text,num:id}})
          .then((response)=>{
            console.log(response.data);
            if(response.data.errno!=0){
              console.log(response.data.msg);
              alert(response.data.msg);
            }
            else{
              response.data.video.forEach((video,index)=>{
                this.$set(this.videos,index,video);
              })
            }
          })
          .catch(error=>{
            console.log(error);
          })
        },
        getData(text,id){
            axios.get('/videos/get_video_by_label',{params:{label:text,num:id}})
            .then((response)=>{
                console.log(id);
                console.log(response.data);
                if(id===5){
                  if(response.data.errno!=0){
                    console.log(response.data.msg);
                    alert(response.data.msg);
                   }
                   else{response.data.video.forEach((video,index) => {
                    // this.videos[index]=video;
                    this.$set(this.top_videos,index,video)
                   });}  
                }
                else if(id===8){
                  if(response.data.errno!=0){
                    console.log(response.data.msg);
                    alert(response.data.msg);
                  }
                  else{
                    response.data.video.forEach((video,index)=>{
                       this.$set(this.ranking_list,index,video)
                    });
                  }
                }
            })
            .catch(error => {
               console.log(error);
            })
        }
    }
  
  }
  </script>
  <style>
  
  .recreation{
  height:100%;
  width:100%;
  /* margin-top:5%; */
  }
  
  .top-carousel{
    margin:50px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 100px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .recommend-display{
    margin:50px;
    display: flex;
    padding: 10px;
    flex-direction:row;
  }
  .recommend-container {
    width:80%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    justify-items: center;
  }
  .ranking-display{
    width:20%;
    /* display:flex; */
    
    margin-left:20px;
    /* border: 1px solid var(--line_light);
    border-radius: 6px;
    background-color: var(--bg2);
    overflow: hidden; */
  }
  .ranking-container{
    width:100%;
    /* height:80%; */
    /* border: 1px solid var(--line_light);
    border-radius: 6px;
    background-color: var(--bg2);
    overflow: hidden; */
    
  }
  .ranking-item {
    
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height:48px;
    width:100%;
    /* margin-bottom: 10px; */
    /* background-color: rgba(230, 230, 230,0.5); */
  }
  .ranking-item:first-child{
    height:118px;
  }
  
  .ranking-item:nth-child(odd){
    background-color: white;
  }
  .ranking-item:nth-child(even){
    background-color: rgba(208, 208, 208, 0.3);
  }
  .top-cover{
    height:50%;
    width:35%;
    border-radius:15%;
  }
  
  .ranking-number {
    font-weight: bold;
    margin-top:3%;
    margin-right: 10px;
    margin-left:10px;
    color:grey;
  }
  .ranking-item:first-child .ranking-number{
    color:red;
  }
  .ranking-item:nth-child(2) .ranking-number{
    color:rgb(255, 111, 0);
  }
  .ranking-item:nth-child(3) .ranking-number{
    color:rgb(255, 157, 0);
  }
  .ranking-video-title {
    
    /* background-color: rgba(0, 0, 0, 0.5); */
    /* color: black;
    
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; */
    height:65%;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    word-break: break-word!important;
    word-break: break-all;
    line-break: anywhere;
    -webkit-line-clamp: 1;
    font-size: 14px;
    font-weight: bold;
    padding: 10px;
  }
  .ranking-video-title:hover{
    color:rgb(0, 191, 255);
  }
  .ranking-item:first-child .ranking-video-title{
    -webkit-line-clamp: var(--rank-title-line, 3);
  }
  .recommend-item {
    width: 100%;
    height: 250px;
    position: relative;
    margin-bottom: 20px;
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
  /* background-color:rgba(255, 255, 255,0.5);  */
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
  }
  .top-img{
    height:100%;
    width:100%;
  }
  .top-overlay{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  /* background-color:rgba(255, 255, 255,0.5);  */
  background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1));
  display: flex;
  justify-content: space-between;
    
  }
  .top-title{
    position: relative;
    bottom: -50%;
    left: 0;
    width: 100%;
    height: 50%;
    /* background-color: rgba(0, 0, 0, 0.5); */
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    box-sizing: border-box;
    word-break:break-all;
    text-overflow:ellipsis;
    word-break:break-all;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
    overflow:hidden;
  }
  
  .play-info, .like-info {
  display: flex;
  align-items: center;
  color: white;
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
  .router-link-active {
  text-decoration: none;
  }
  
  .recommend-title {
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
  
  .recommend-title:hover{
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
  margin-left:30px;
  
  }
  
  </style>
  