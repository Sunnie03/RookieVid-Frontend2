<template>
 <div class="home">
   
    <!--导航栏-->
    <Header/>
    <!--分区-->
    <Partition></Partition>

    <!--【需增加部分】HomeView编写代码，显示推荐视频-->
    <!--【注意】点击搜索的跳转的button在Header里-->
  
    <!--header：logo+导航栏-->
    <!-- <Header: :headerMode="headMode" /> -->
    
    <div class="container">


      <div class="hot-display">
        <el-carousel class="hot-carousel" indicator-position="outside" height="470px" >
          <el-carousel-item v-for="(video,index) in this.hot_videos" :key="index" >
            <div class="hot-carousel-container">
              <img :src="video.cover_url" class="hot-carousel-img" @click="videoPlay(video.id)" >
            </div>
            <div class="hot-carousel-overlay" @click="videoPlay(video.id)">
              <div class="hot-carousel-title" @click="videoPlay(video.id)">{{ video.title }}</div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="hot-video-display">

          <div v-for="(video,index) in top_videos" :key="index" class="recommend-item">
            <div class="recommend-img-container">
            <img class="recommend-img" :src="video.cover_url" @click="videoPlay(video.id)">
            <div class="overlay" >
              <span class="play-info">
                <img class="play-icon" src="../../assets/display/play_circle_outline.svg">
                {{video.view_amount }}</span>
              <span class="like-info">
                <img class="like-icon" src="../../assets/display/thumb-up.svg">
                {{ video.like_amount }}
              </span>
            </div>
          </div>
            <!-- <router-link :to="{name:'video',params:{'id':video.video_id}}"> -->
              <div class="recommend-title" @click="videoPlay(video.id)">{{ video.title }}</div>
            <!-- </router-link> -->
            <div class="author">
              <span class="author-tag">作者</span>
              <span class="author-name" :data-fullname="video.user_name" @click="goPersonPage(video.user_id)">{{ video.user_name }}</span>
              <span class="time">{{ video.created_at?video.created_at.substring(0, 10):'' }}</span>
            </div>

          </div>
          </div>
      </div>
     
    <!-- <div class="carousel-container" >
     
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
    </div> -->
    <!-- <router-link :to="'search'">
      <el-button>test</el-button>
    </router-link> -->
    <!-- <div class="recommend">
      <div class="menu">娱乐  
          <el-button @click="goPartition('entertainment')" size="small" style="align-self:flex-end;">查看全部  ></el-button>
      </div>   
      <div class="recommend-container">
        <div v-for="(video,index) in this.partition1" :key="index" class="recommend-item">
           <img class="recommend-img" :src="video.cover_url" @click="videoPlay(video.video_id)" >
          <div class="overlay">
            <span class="play-info">
              <img class="play-icon" src="../../assets/display/play_circle_outline.svg">
              {{video.view_amount }}</span>
            <span class="like-info">
              <img class="like-icon" src="../../assets/display/thumb-up.svg">
              {{ video.like_amount }}
            </span>
          </div>
            <div class="recommend-title" @click="videoPlay(video.video_id)">{{ video.title }}</div>
          <div class="author">
            <span class="author-tag">作者</span>
            <span class="author-name">{{ video.user_name }}</span>
            <span class="time">{{ video.created_at.split('T')[0] }}</span>
          </div>
        </div>
      </div>
    </div> -->
    <div class="recommend">
      <div class="menu">娱乐
          <el-button @click="goPartition('entertainment')" size="small" class="lookTotalButton" >查看全部 <i class="el-icon-arrow-right"></i></el-button>
      </div>   
      <Partitionvideo  :partition="partition1" ></Partitionvideo>
    </div>
    <div class="recommend">
      <div class="menu">影视
          <el-button @click="goPartition('film')" size="small" class="lookTotalButton">查看全部 <i class="el-icon-arrow-right"></i></el-button>
      </div>   
      <Partitionvideo  :partition="partition2" ></Partitionvideo>
    </div>
    <div class="recommend">
      <div class="menu">游戏
          <el-button @click="goPartition('game')" size="small" class="lookTotalButton">查看全部  <i class="el-icon-arrow-right"></i></el-button>
      </div>   
      <Partitionvideo  :partition="partition3" ></Partitionvideo>
    </div>
    <div class="recommend">
      <div class="menu">运动
          <el-button @click="goPartition('sports')" size="small" class="lookTotalButton">查看全部  <i class="el-icon-arrow-right"></i></el-button>
      </div>   
      <Partitionvideo  :partition="partition4" ></Partitionvideo>
    </div>
    <div class="recommend">
      <div class="menu">美食
          <el-button @click="goPartition('food')" size="small" class="lookTotalButton">查看全部  <i class="el-icon-arrow-right"></i></el-button>
      </div>   
      <Partitionvideo  :partition="partition5" ></Partitionvideo>
    </div>
    <div class="recommend">
      <div class="menu">科技
          <el-button @click="goPartition('technology')" size="small" class="lookTotalButton">查看全部 <i class="el-icon-arrow-right"></i></el-button>
      </div>   
      <Partitionvideo  :partition="partition6" ></Partitionvideo>
    </div>
    <div class="recommend">
      <div class="menu">军事
          <el-button @click="goPartition('military')" size="small" class="lookTotalButton">查看全部  <i class="el-icon-arrow-right"></i></el-button>
      </div>   
      <Partitionvideo  :partition="partition7" ></Partitionvideo>
    </div>
    <div class="recommend">
      <div class="menu">音乐
          <el-button @click="goPartition('music')" size="small" class="lookTotalButton">查看全部 <i class="el-icon-arrow-right"></i></el-button>
      </div>   
      <Partitionvideo  :partition="partition8" ></Partitionvideo>
    </div>
    <div class="recommend">
      <div class="menu">学习
          <el-button @click="goPartition('study')" size="small" class="lookTotalButton">查看全部  <i class="el-icon-arrow-right"></i></el-button>
      </div>   
      <Partitionvideo  :partition="partition9" ></Partitionvideo>
    </div>
    <div class="recommend">
      <div class="menu">生活
          <el-button @click="goPartition('life')" size="small" class="lookTotalButton">查看全部  <i class="el-icon-arrow-right"></i></el-button>
      </div>   
      <Partitionvideo  :partition="partition10" ></Partitionvideo>
    </div>
    <!-- <Partitionvideo :menu_name="'影视'" :partition="partition2" :partition_name="'film'"></Partitionvideo>
    <Partitionvideo :menu_name="'游戏'" :partition="partition3" :partition_name="'game'"></Partitionvideo> -->
    <!-- <Partitionvideo :menu_name="'运动'" :partition="partition4" :partition_name="'sports'"></Partitionvideo>
    <Partitionvideo :menu_name="'美食'" :partition="partition5" :partition_name="'food'"></Partitionvideo> -->
    <!-- <Partitionvideo :menu_name="'科技'" :partition="partition6" :partition_name="'technology'"></Partitionvideo>
    <Partitionvideo :menu_name="'军事'" :partition="partition7" :partition_name="'military'"></Partitionvideo>
    <Partitionvideo :menu_name="'音乐'" :partition="partition8" :partition_name="'music'"></Partitionvideo>
    <Partitionvideo :menu_name="'学习'" :partition="partition9" :partition_name="'study'"></Partitionvideo>
    <Partitionvideo :menu_name="'生活'" :partition="partition10" :partition_name="'life'"></Partitionvideo> -->

    <!-- <div class="recommend">
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
    </div> -->
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/HomePage/Header.vue'
import Partition from '@/components/HomePage/Partition.vue'
import Partitionvideo from '@/components/HomePage/PartitionVideoShow.vue'
import axios from 'axios'
export default {
  name: 'HomeView',//当前引入页面
  components: {
    Header,
    Partition,
    Partitionvideo
  },

  data(){
    return{
      // images:[
      //   ""
      //   // "../assets/testImg/1.jpeg",
      //   // "../assets/testImg/2.jpeg"
      // ],
      // titles:[""],
      hot_videos:[""],
      top_videos:[""],
      partition1:[""],
      partition2:[""],
      partition3:[""],
      partition4:[""],
      partition5:[""],
      partition6:[""],
      partition7:[""],
      partition8:[""],
      partition9:[""],
      partition10:[""],

      // currentIndex: 0,
    }
  },
  created(){
    this.getHotData(),
    this.getData('娱乐')
    this.getData('影视')
    this.getData('游戏')
    this.getData('运动')
    this.getData('美食')
    this.getData('科技')
    this.getData('军事')
    this.getData('音乐')
    this.getData('学习')
    this.getData('生活')
    // this.getData("")
  },
  mounted() {
  // this.getData("mounted");
  
  // setInterval(() => {
  //     this.currentIndex = (this.currentIndex + 1) % this.images.length;
      
  //   }, 3000);
  },
  methods: {
    
    // getImageIndex(offset) {
    //   return (
    //     (this.currentIndex + this.images.length + offset) % this.images.length
    //   );
    // },
    goPersonPage(id){
        const user_page_url='/lookPerson/'+id;
        window.open(user_page_url,'_blank');
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
    getHotData(){
      axios.get('/videos/get_video_by_hotness',{params:{num:10}})
      .then((response)=>{
        console.log(response);
        if(response.data.errno!=0){
            console.log(response.data.msg);
            alert(response.data.msg);
          }
        else{
          if (Array.isArray(response.data.video)) {
            response.data.video.forEach((video, index) => {
              if(index<6){ 
                this.$set(this.hot_videos,index,video)
              }
              else {
                this.$set(this.top_videos,index-6,video);
              }
            });
          }
          else {
            console.log(`Error in getData(${text}): response.data is not an array`);
          }
        }
      })
      .catch(error => {
         console.log(error);
       });
    },
    getData(text){
      axios.get('/videos/get_video_by_label',{params:{label:text,num:5}})
      .then((response)=>{
        console.log(response.data);
        if(response.data.errno!=0){
            console.log(response.data.msg);
            alert(response.data.msg);
          }
        else{
          response.data.video.forEach((video,index)=>{
          // console.log(text);
          if(text==='娱乐'){this.$set(this.partition1,index,video)}  
          if(text==='影视'){this.$set(this.partition2,index,video)}
          if(text==='游戏'){this.$set(this.partition3,index,video)}
          if(text==='运动'){this.$set(this.partition4,index,video)}  
          if(text==='美食'){this.$set(this.partition5,index,video)}
          if(text==='科技'){this.$set(this.partition6,index,video)}
          if(text==='军事'){this.$set(this.partition7,index,video)}  
          if(text==='音乐'){this.$set(this.partition8,index,video)}
          if(text==='学习'){this.$set(this.partition9,index,video)}
          if(text==='生活'){this.$set(this.partition10,index,video)}
          // console.log(this.partition2[index]);
        })
        }
       
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
  // computed: {
  //   currentImage() {
  //     return this.images[this.currentIndex];
  //   }
  // }
  
}
</script>

<style scoped>
.home{
  display: flex;
  flex-direction: column;
}
.container{
  height:100%;
  margin:50px;
}
.hot-display{
  display:flex;
}
.hot-carousel{
  width:58%;
  /* border-radius: 5px; */
  /* backgroud-color:rgba(255,255,255,0); */

}
.el-carousel-item{
  height:100%;
  /* border-radius: 5px; */
}
.hot-carousel-container{
  height:100%;
  width:100%;
  overflow: hidden;
}
.hot-carousel-img{
  height:100%;
  width:100%;
  /* border-radius:10px; */
  object-fit: cover; 
  cursor:pointer;
  /* border-radius:20px; */
}
.hot-carousel-overlay{
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  /* background-color:rgba(154, 104, 54, 0.5);  */
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  /* border-radius:20px; */
}
/* .hot-carousel:hover .hot-carousel-overlay{
  opacity: 0;
} */
.hot-carousel-title{
  cursor:pointer;
  position: relative;
  bottom: -60%;
  /* top:0; */
  left: 0;
  width: 100%;
  height: 30%;
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


.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color:transparent;
     /* border-radius: 20px; */
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: transparent;
     /* border-radius: 20px; */
  }


 .hot-video-display{
  margin-left:50px;
  width:40%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
  grid-row-gap:0;
  justify-items: center;
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
 .lookTotalButton{
  align-self:flex-end;
  margin-bottom:8px;
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
    margin-bottom: 10px;
}
.recommend-img-container{
  width:100%;
  height:60%;
}
.recommend-img{
  cursor:pointer;
  width:100%;
  height:100%;
  object-fit:cover;
  border-radius: 10px;
  border-color: rgb(175, 174, 174);
  transition: transform 0.3s ease;
}
.recommend-img-container:hover .recommend-img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  border-radius:10px;
  bottom: 40%;
  left: 0;
  width: 100%;
  height: 10%;
  /* background-color:rgba(255, 255, 255,0.4);  */
  background-image: linear-gradient(to bottom, rgba(0,0,0, 0), rgba(0,0,0, 0.7));
  display: flex;
  justify-content: space-between;
  /* background-color: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.8)); */
}

.recommend-img-container:hover .overlay {
  opacity: 0;
}

.play-info, .like-info {
  display: flex;
  align-items: center;
  color: rgb(255, 255, 255);
  font-weight:bold;
  /* margin-top:20px; */
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
._title{
  height:20%;
  width:100%;
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
    cursor:pointer;
  }
 
.recommend-title:hover{
    color:#1e90ff;
  }
.recommend-title:hover::before {
  content: attr(data-fulltitle);
  position: absolute;
  border-radius:5px;
  background: rgb(228, 228, 228);
  border: 1px solid rgb(180, 180, 180);
  padding: 2px 8px;
  font-weight: normal;
  color:black;
  font-size: 10px;
  top: 100%;
  left: 30%;
  white-space: nowrap;
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
  /* margin-right: 8px; */
}

.author-name {
  width:47%;
  font-weight: bold;
  color: grey;
  padding: 2px 8px;
  font-size:15px;
  cursor:pointer;
  box-sizing: border-box;
    word-break:break-all;
    text-overflow:ellipsis;
    word-break:break-all;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
    overflow:hidden;
  
  
  /* margin-right:0; */
}
.author-name:hover{
  color:orange
}
.author-name:hover::before {
  content: attr(data-fullname);
  position: absolute;
  border-radius:5px;
  background: rgb(228, 228, 228);
  border: 1px solid rgb(180, 180, 180);
  padding: 2px 8px;
  font-weight: normal;
  color:black;
  font-size: 10px;
  top: 100%;
  left: 30%;
  white-space: nowrap;
  z-index:1;
}
.time{
  color:grey;
  font-size:smaller;
  margin-top:5px;
  margin-left:0;
  
}
 
/* .carousel-container {
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
  transition: all 0.5s ease-in-out; */
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
/* } */

/* .carousel-image.active {
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
} */
</style>
