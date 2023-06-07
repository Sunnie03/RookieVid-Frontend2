<template>
      <div class="recommend-container">
        <div v-for="(video,index) in this.partition" :key="index" class="recommend-item">
          <!-- <router-link :to="{name:'video',params:{'id':video.video_id}}"> -->
          <div class="recommend-img-container">
           <img class="recommend-img" :src="video.cover_url" @click="videoPlay(video.id)" >
          
          <!-- </router-link> -->
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
          <!-- <div class="_title"> -->
          <!-- <router-link :to="{name:'video',params:{'id':video.video_id}}"> -->
          <div class="recommend-title" :data-fulltitle="video.title" @click="videoPlay(video.id)">{{ video.title }}</div>
          <!-- </div> -->
            <!-- </router-link> -->
          <div class="author">
            <span class="author-tag">作者</span>
            <span class="author-name" :data-fullname="video.user_name" @click="goPersonPage(video.user_id)">{{ video.user_name }}</span>
            <span class="time">{{ video.created_at?video.created_at.substring(0,10):'' }}</span>
          </div>
        </div>
      </div>
</template>

<script>

export default ({
    props:{
        partition:Array,
    },
    methods: {
        
        videoPlay(id){
        const video_play_url='/video/'+id;
        console.log(video_play_url);
        window.open(video_play_url,'_blank');
        },
        goPersonPage(uid){
          const user_page_url='/lookPerson/'+uid;
          window.open(user_page_url,'_blank');
        }

    },
})
</script>
<style scoped>
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
</style>