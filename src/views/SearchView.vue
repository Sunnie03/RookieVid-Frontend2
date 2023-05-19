<template>
  <div class="video-container" >
      <div class="search-bar">
        <el-row >
          <!-- <el-col :span="12" :offset="6"> -->
            <el-input placeholder="请输入内容" v-model="input" ></el-input>
            <el-button type="primary" icon="el-icon-search" @click="go"></el-button>
          <!-- </el-col> -->
        </el-row>
          <!-- <el-row type="flex"> -->
             
              <!-- <el-button type="primary" icon="el-icon-search" @click="goto()"></el-button> -->
              <!-- <router-link :to="{ path: '/search_result',  query:{'keyword':this.input}}"> -->
              <!-- <el-button type="primary" icon="el-icon-search" @click="go"></el-button> -->
              <!-- </router-link> -->
          <!-- </el-row> -->
      </div>
      <div class="navigation">
         <ul class="nav-list">
           <li class="nav-item">视频</li>
           <li class="nav-item">用户</li>
        </ul>
      </div>
          <div class="search-container">
            <div v-for="(video,index) in this.search_videos" :key="index" class="recommend-item">
              <router-link :to="{name:'video',params:{'id':video.video_id}}">
              <img class="recommend-img" :src="video.cover_url">
              </router-link>
              <div class="overlay">
                <span class="play-info">
                  <img class="play-icon" src="../assets/display/play_circle_outline.svg">
                  {{video.view_amount }}</span>
                <span class="like-info">
                  <img class="like-icon" src="../assets/display/thumb-up.svg">
                  {{ video.like_amount }}
                </span>
              </div>
              <router-link :to="{name:'video',params:{'id':video.video_id}}">
                <div class="recommend-title">{{ video.title }}</div>
              </router-link>
              <div class="author">
                <span class="author-tag">作者</span>
                <span class="author-name">{{ video.user_name }}</span>
                <span class="time">{{ video.created_at.split('T')[0] }}</span>
              </div>
            </div>
          </div>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/HomePage/Header.vue'
// import {mapActions} from 'Vuex'
export default {
  name: 'SearchView',//当前引入页面
  components: {
    Header,
  },
  data(){
    return{
      input:"",
      search_videos:[],
    }
  },
  created(){
    this.getData(this.$route.query.keyword);
  //   console.log(this.$route.query)
  },
  mounted(){
    const keyword=this.$route.query.keyword;
    console.log(keyword);
  //   console.log(this.$route.query.targetdata);
  },
  watch: {
      '$route.query.keyword'(newKeyword, oldKeyword) {
      if (newKeyword !== oldKeyword) {
        this.getData(newKeyword);
     }
   }
  },
  methods: {
    // searchVideo(){ 
      go(){
          console.log(this.input);
          const currentPath = this.$route.path;
          const currentKeyword = this.$route.query.keyword;

          const targetPath = '/search';
          const targetKeyword = this.input;

            // 判断当前路由是否已经是目标路由
          if (currentPath === targetPath && currentKeyword === targetKeyword) {
              return; // 避免重复导航
           }

          this.$router.push({ path: '/search', query: { keyword: this.input } })
      },
      getData(text){
      console.log(text);
      axios.get('videos/search',{params:{keyword:text}})
      .then((response)=>{
          console.log(text);
        console.log(response.data);
        response.data.video.forEach((video,index) => {
                // this.search_videos[index]=video;
                this.$set(this.search_videos,index,video)  
        });
        
      })
      .catch(error => {
      console.log(error);
    });}
     
    
    },
    
  }
</script>

<style>

.search-container {
margin:50px;
margin-top:50px;

display: grid;
grid-template-columns: repeat(5, 1fr) ;
/* grid-template-columns: repeat(auto-fill, minmax(20%, 1fr)); */
grid-gap: 50px;
justify-items: center;
}
.navigation {
display: flex;
justify-content: center;
margin-bottom: 20px;
}

.nav-list {
display: flex;
list-style: none;
}

.nav-item {
margin-right: 10px;
padding: 5px 10px;
border: 1px solid #ccc;
border-radius: 4px;
cursor: pointer;
}

.nav-item:hover {
background-color: #ccc;
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
