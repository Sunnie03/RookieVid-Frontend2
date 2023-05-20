<template>
 <div class="home">
   
    <!--导航栏-->
    <Header/>
    <!--分区-->
    <Partition></Partition>

    <!--【需增加部分】HomeView编写代码，显示推荐视频-->
    <!--【注意】点击搜索的跳转的button在Header里-->
    
<!--   
    <div class="partition">
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="#ceeef9" text-color="#000000" active-text-color="#ffd04b">
      <el-row type="flex" justify="center">
        <el-menu-item index="1"><router-link to="/home">首页</router-link></el-menu-item>
        <el-menu-item index="2"><router-link to="/entertainment">娱乐</router-link></el-menu-item>
        <el-menu-item index="3"><router-link to="/film">影视</router-link></el-menu-item>
        <el-menu-item index="4"> <router-link to="/game">游戏</router-link> </el-menu-item>
        <el-menu-item index="5"><router-link to="/sports">运动</router-link> </el-menu-item>
        <el-menu-item index="6"><router-link to="/food">美食</router-link> </el-menu-item>
        <el-menu-item index="7"><router-link to="/technology">科技</router-link> </el-menu-item>
        <el-menu-item index="8"><router-link to="/military">军事</router-link> </el-menu-item>
        <el-menu-item index="9"><router-link to="/music">音乐</router-link> </el-menu-item>
        <el-menu-item index="10"><router-link to="/study">学习</router-link> </el-menu-item>
      </el-row>
    </el-menu>
  </div> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <h1>This is home</h1> -->

    <!--header：logo+导航栏-->
    <!-- <Header: :headerMode="headMode" /> -->
    
    <div class="container">
    <div class="carousel-container" >
     
      <div class="carousel-wrapper">
        <div class="carousel-images">
          <div class="carousel-image" 
          v-for="(img,index) in this.images" 
          :key="index" 
          :style="{ backgroundImage: 'url(' + img + ')' }"
          :class="{
            'carousel-image': true,
            'active': index === currentIndex,
            'prev': index === getImageIndex(-1),
            'next': index === getImageIndex(1),
          }">
          </div>
        </div>
      </div>
    </div>
    <!-- <router-link :to="'search'">
      <el-button>test</el-button>
    </router-link> -->
    <div class="recommend">
      <div class="menu">娱乐
        <!-- <router-link :to="'/entertainment'" v-slot="{ navigate }" custom> -->
          <el-button @click="goPartition('entertainment')" size="small" style="align-self:flex-end;">查看全部  ></el-button>
        <!-- </router-link> -->
      </div>
      <div class="recommend-container">
        <div v-for="(video,index) in this.partition1" :key="index" class="recommend-item">
          <!-- <router-link :to="{name:'video',params:{'id':video.video_id}}"> -->
           <img class="recommend-img" :src="video.cover_url" @click="videoPlay(video.video_id)">
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
          <!-- <router-link :to="{name:'video',params:{'id':video.video_id}}"> -->
            <div class="recommend-title" @click="videoPlay(video.video_id)">{{ video.title }}</div>
          <!-- </router-link> -->
          <div class="author">
            <span class="author-tag">作者</span>
            <span class="author-name">{{ video.user_name }}</span>
            <span class="time">{{ video.created_at.split('T')[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="menu">生活</div>
      <div class="recommend-container">
        <div v-for="(video,index) in this.partition2" :key="index" class="recommend-item">
          <img class="recommend-img" :src="video.cover_url">
          <div class="overlay">
            <span class="play-info">
              <img class="play-icon" src="../../assets/display/play_circle_outline.svg">
              {{video.view_amount }}</span>
            <span class="like-info">
              <img class="like-icon" src="../../assets/display/thumb-up.svg">
              {{ video.like_amount }}
            </span>
          </div>
          <div class="title">{{ video.title }}</div>
          <div class="author">
            <span class="author-tag">作者</span>
            <span class="author-name">{{ video.user_name }}</span>
            <span class="time">{{ video.created_at.split('T')[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="menu">学习</div>
      <div class="recommend-container">
        <div v-for="(video,index) in this.partition3" :key="index" class="recommend-item">
          <img class="recommend-img" :src="video.cover_url">
          <div class="overlay">
            <span class="play-info">
              <img class="play-icon" src="../../assets/display/play_circle_outline.svg">
              {{video.view_amount }}</span>
            <span class="like-info">
              <img class="like-icon" src="../../assets/display/thumb-up.svg">
              {{ video.like_amount }}
            </span>
          </div>
          <div class="title">{{ video.title }}</div>
          <div class="author">
            <span class="author-tag">作者</span>
            <span class="author-name">{{ video.user_name }}</span>
            <span class="time">{{ video.created_at.split('T')[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="menu">游戏</div>
      <div class="recommend-container">
        <div v-for="(video,index) in this.partition4" :key="index" class="recommend-item">
          <img class="recommend-img" :src="video.cover_url">
          <div class="overlay">
            <span class="play-info">
              <img class="play-icon" src="../../assets/display/play_circle_outline.svg">
              {{video.view_amount }}</span>
            <span class="like-info">
              <img class="like-icon" src="../../assets/display/thumb-up.svg">
              {{ video.like_amount }}
            </span>
          </div>
          <div class="title">{{ video.title }}</div>
          <div class="author">
            <span class="author-tag">作者</span>
            <span class="author-name">{{ video.user_name }}</span>
            <span class="time">{{ video.created_at.split('T')[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="menu">运动</div>
      <div class="recommend-container">
        <div v-for="(video,index) in this.partition5" :key="index" class="recommend-item">
          <img class="recommend-img" :src="video.cover_url">
          <div class="overlay">
            <span class="play-info">
              <img class="play-icon" src="../../assets/display/play_circle_outline.svg">
              {{video.view_amount }}</span>
            <span class="like-info">
              <img class="like-icon" src="../../assets/display/thumb-up.svg">
              {{ video.like_amount }}
            </span>
          </div>
          <div class="title">{{ video.title }}</div>
          <div class="author">
            <span class="author-tag">作者</span>
            <span class="author-name">{{ video.user_name }}</span>
            <span class="time">{{ video.created_at.split('T')[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="menu">美食</div>
      <div class="recommend-container">
        <div v-for="(video,index) in this.partition6" :key="index" class="recommend-item">
          <img class="recommend-img" :src="video.cover_url" @click="video_play">
          <div class="overlay">
            <span class="play-info">
              <img class="play-icon" src="../../assets/display/play_circle_outline.svg">
              {{video.view_amount }}</span>
            <span class="like-info">
              <img class="like-icon" src="../../assets/display/thumb-up.svg">
              {{ video.like_amount }}
            </span>
          </div>
          <div class="title">{{ video.title }}</div>
          <div class="author">
            <span class="author-tag">作者</span>
            <span class="author-name">{{ video.user_name }}</span>
            <span class="time">{{ video.created_at.split('T')[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="menu">音乐</div>
      <div class="recommend-container">
        <div v-for="(video,index) in this.partition7" :key="index" class="recommend-item">
          <img class="recommend-img" :src="video.cover_url">
          <div class="overlay">
            <span class="play-info">
              <img class="play-icon" src="../../assets/display/play_circle_outline.svg">
              {{video.view_amount }}</span>
            <span class="like-info">
              <img class="like-icon" src="../../assets/display/thumb-up.svg">
              {{ video.like_amount }}
            </span>
          </div>
          <div class="title">{{ video.title }}</div>
          <div class="author">
            <span class="author-tag">作者</span>
            <span class="author-name">{{ video.user_name }}</span>
            <span class="time">{{ video.created_at.split('T')[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="menu">影视</div>
      <div class="recommend-container">
        <div v-for="(video,index) in this.partition8" :key="index" class="recommend-item">
          <img class="recommend-img" :src="video.cover_url">
          <div class="overlay">
            <span class="play-info">
              <img class="play-icon" src="../../assets/display/play_circle_outline.svg">
              {{video.view_amount }}</span>
            <span class="like-info">
              <img class="like-icon" src="../../assets/display/thumb-up.svg">
              {{ video.like_amount }}
            </span>
          </div>
          <div class="title">{{ video.title }}</div>
          <div class="author">
            <span class="author-tag">作者</span>
            <span class="author-name">{{ video.user_name }}</span>
            <span class="time">{{ video.created_at.split('T')[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="menu">科技</div>
      <div class="recommend-container">
        <div v-for="(video,index) in this.partition9" :key="index" class="recommend-item">
          <img class="recommend-img" :src="video.cover_url">
          <div class="overlay">
            <span class="play-info">
              <img class="play-icon" src="../../assets/display/play_circle_outline.svg">
              {{video.view_amount }}</span>
            <span class="like-info">
              <img class="like-icon" src="../../assets/display/thumb-up.svg">
              {{ video.like_amount }}
            </span>
          </div>
          <div class="title">{{ video.title }}</div>
          <div class="author">
            <span class="author-tag">作者</span>
            <span class="author-name">{{ video.user_name }}</span>
            <span class="time">{{ video.created_at.split('T')[0] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/HomePage/Header.vue'
import Partition from '@/components/HomePage/Partition.vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'
export default {
  name: 'HomeView',//当前引入页面
  components: {
    Header,
    Partition,
  },



  data(){
    return{
      images:[
        ""
        // "../assets/testImg/1.jpeg",
        // "../assets/testImg/2.jpeg"
      ],
      titles:[""],
      videos:[""],
      partition1:[""],
      partition2:[""],
      partition3:[""],
      partition4:[""],
      partition5:[""],
      partition6:[""],
      partition7:[""],
      partition8:[""],
      partition9:[""],

      currentIndex: 0,
    }
  },
  created(){
    this.getData(),
    this.getData('娱乐')
    this.getData('生活')
    this.getData('学习')
    this.getData('游戏')
    this.getData('运动')
    this.getData('美食')
    this.getData('音乐')
    this.getData('影视')
    this.getData('科技')
    
    // this.getData("")
  },
  mounted() {
  // this.getData("mounted");
  
  setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      
    }, 3000);
  },
  methods: {

    getImageIndex(offset) {
      return (
        (this.currentIndex + this.images.length + offset) % this.images.length
      );
    },
    goPartition(partition){
        const partition_url='/'+partition;
        console.log(partition_url);
        window.open(partition_url,'_blank');
    },
    videoPlay(id){
        const video_play_url='/video/'+id;
        window.open(video_play_url,'_blank');
      },
    getData(text){
      Promise.all([
        axios.get('/videos/get_video_by_hotness'),
        axios.get('/videos/get_video_by_label',{params:{label:text,num:5}})
      ])
      .then(([response1,response2])=>{
        console.log(response1.data);
        console.log(response2.data);
        if (Array.isArray(response1.data.video)) {
          response1.data.video.forEach((video, index) => {
            this.images[index] = video.cover_url;
            this.titles[index] = video.title;
            this.videos[index] = video.video_url;
          });
        } else {
          console.log(`Error in getData(${text}): response.data is not an array`);
        }
        // console.log(response.data);
        response2.data.video.forEach((video,index)=>{
          console.log(text);
          if(text==='娱乐'){this.partition1[index]=video;}  
          if(text==='生活'){this.partition2[index]=video;}
          if(text==='学习'){this.partition3[index]=video;}
          if(text==='游戏'){this.partition4[index]=video;}  
          if(text==='运动'){this.partition5[index]=video;}
          if(text==='美食'){this.partition6[index]=video;}
          if(text==='音乐'){this.partition7[index]=video;}  
          if(text==='影视'){this.partition8[index]=video;}
          if(text==='科技'){this.partition9[index]=video;}
          // console.log(this.partition1[index]);
        })
      })
      .catch(error => {
        console.log(error);
      });
    }
      // axios.get('/videos/get_video_by_hotness')
    //   .then(response=>{
    //     console.log(response.data);
    //     if (Array.isArray(response.data.videos)) {
    //       response.data.videos.forEach((video, index) => {
    //         this.images[index] = video.cover_url;
    //         this.titles[index] = video.title;
    //         this.videos[index] = video.video_url;
    //       });
    //     } else {
    //       console.log(`Error in getData(${text}): response.data is not an array`);
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    //   axios.get('/videos/get_video_by_label',{
    //     params:{
    //       label:'娱乐'
    //     }
    //   })
    //   .then(response=>{
    //     console.log(response.data);
    //     response.data.videos.forEach((video,index)=>{
    //       this.partition1[index]=video;
    //       console.log(this.partition1[index]);
    //     })
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // }
    
    //   async getData(text) {
    //   try {
    //     const response = await axios.get('/videos/get_video_by_hotness');
    //     console.log(response.data);
    //     if (Array.isArray(response.data.videos)) {
    //       response.data.videos.forEach((video, index) => {
    //         // console.log(video.title);
    //         this.images[index] = video.cover_url;
    //         this.titles[index] = video.title;
    //         this.videos[index] = video.video_url;
    //         console.log(index,":",this.images[index]);
    //       });
    //     } else {
    //       console.log(`Error in getData(${text}): response.data is not an array`);
    //     }
    //   } catch (error) {
    //     console.log(`Error in getData(${text}): ${error}`);
    //   }
    // }
    
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    }
  }
  
}
</script>

<style>
.home_container{
  display: flex;
  flex-direction: column;
}
.menu{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  line-height: 60px;
  margin-top:20px;
  font-size: 30px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.5;
  text-shadow: 2px 2px 2px #ccc;
  flex:1;
 }
 .recommend-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 50px;
  justify-items: center;
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
  background-color:rgba(255, 255, 255,0.5); 
  display: flex;
  justify-content: space-between;
  /* background-color: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.8)); */
}
  
.play-info, .like-info {
  display: flex;
  align-items: center;
  color: rgb(78, 77, 77);
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
    font-size: 15px !important;
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

.carousel-container {
  padding-top:10px;
  width: 80%;
  height: 400px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}

.carousel-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left:0;
  right: 0;
}

.carousel-images {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* transform: translateX(calc(-40% - 20px)); */
  position: relative;
  top: 0;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
}

.carousel-image {
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  transition: all 0.5s ease-in-out;
  /* width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.2;
  transition: all 1s ease;
  z-index: 1;
  transform: scale(1.1); */
}

.carousel-image.active {
  opacity: 1;
  transform: translateX(0) scale(1);
  z-index: 2;
}

.carousel-image.prev {
  opacity: 0.6;
  transform: translateX(calc(-100% - 20px)) scale(0.8);
  z-index: 1;
}

.carousel-image.next {
  opacity: 0.6;
  transform: translateX(calc(100% + 20px)) scale(0.8);
  z-index: 1;
}
.container{
  margin:50px;
}
</style>
