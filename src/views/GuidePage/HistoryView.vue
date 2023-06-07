<template>
    <div class="CreationManagement">
        <Header/>
        <div class="creation-display">
            
            <!-- <div class="aside-wrapper">
             <i class="el-icon-time" style="color:rgb(252, 163, 60);font-size: 25px;"></i>
               <span style="font-size:20px;color:rgb(137, 137, 137);font-weight:bold;margin-bottom:3px;">历史记录</span>
            </div> -->
            <el-tabs v-model="selectedTab"  type="card">
            <el-tab-pane label="历史记录" name="video">
            
            <div class="content-display">
                <div class="video-container">
                    <div v-if="historys.length===0" class="blank-container">
                        <div class="blank-msg">这里什么都没有吖</div>
                        </div>
                    <div v-else>
                        <ul class="video-list-container">
                        
                        <li  v-for="(history,index) in this.displayedVideosPassed" :key="index">
                            <div class="video-list-item">
                                <div class="video-img-container">
                                    <img class="video-img" :src="history.video.cover_url" @click="videoPlay(history.video.id)">
                                </div>
                                <div class="video-info">
                                    <div class="video-title" @click="videoPlay(history.video.id)">{{ history.video.title }}</div>
                                    <div class="history-info">
                                        <div class="video-time"><i class="el-icon-s-platform"></i>{{ history.created_at? history.created_at:'' }}</div>
                                        <div class="partition-label-info">
                                            <el-tag type="success">{{ history.video.label }}</el-tag>
                                        </div>
                                        <div class="author-info-container">
                                            <div class="author-avatar-container">
                                                <img class="author-info-avatar" :src="history.avatar_url" @click="goPersonPage(history.user_id)">
                                            </div>
                                            <div class="author-name" @click="goPersonPage(history.user_id)"> {{ history.user_name }}</div>
                                            <!-- <div class="partition-label-info">{{ history.video.label }}</div> -->
                                           
                                        </div>
                                        
                                    </div>
                                    <!-- <i class="el-icon-video-play">{{ history.video.view_amount }}</i>
                                    <i class="el-icon-thumb">{{ history.video.like_amount }}</i>
                                    <i class="el-icon-star-off">{{ history.video.fav_amount }}</i> -->
                                </div>
                                </div>
                            <el-divider></el-divider>
                        </li>
                        </ul>
                    </div>
                </div>
                <el-pagination
                v-if="totalPagesPassed > 1 "
                class="pagination"
                :page-size="pageSize"
                :current-page="currentPagePassed"
                :total="historys.length"
                @current-change="handlePageChangePassed"
                ></el-pagination>
               
            </div>
        </el-tab-pane>
    </el-tabs>
         </div>
    </div>
</template>

<script>
import Header from '@/components/HomePage/Header_del_search.vue'
import VideoContent from '@/components/HomePage/PartitionVideoShow.vue'
import axios from 'axios'

export default {
    name: 'myCreation',//当前引入页面
    components: {
       VideoContent,
       Header
  },
    data(){
       return {
        // videoPassed:[],
        historys:[],
        selectedTab:'video',
        // videoOnAudit:[],
        // currentPage: 1,
        currentPagePassed: 1,
        // currentPageOnAudit: 1,
        pageSize: 8,
       } 
    },
    computed:{
        totalPagesPassed() {
            return Math.ceil(this.historys.length / this.pageSize);
        },
     
        displayedVideosPassed() {
            const startIndex = (this.currentPagePassed - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.historys.slice(startIndex, endIndex);
        },
        
    },
    created(){
        this.getData();
    },
    methods:{
        goPersonPage(id){
        const user_page_url='/lookPerson/'+id;
        window.open(user_page_url,'_blank');
      },
        handlePageChangePassed(newPage) {
            this.currentPagePassed = newPage;
        },
        handlePageChangeOnAudit(newPage) {
            this.currentPageOnAudit = newPage;
        },
        videoPlay(id){
            const video_play_url='/video/'+id
            window.open(video_play_url,'_blank');
        },
     
      showDeleteConfirmation(videoId) {
        this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
        // 用户点击了确定按钮，执行删除操作
        this.deleteVideo(videoId);
        }).catch(() => {
        // 用户点击了取消按钮，不执行任何操作
        });
    },
      
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
     
        getData(){
            let Headers={'Authorization': this.$store.getters.getStorage}
            axios.get('/videos/get_history',{headers:Headers})
            .then((response)=>{
                // console.log(response);
                if(response.data.errno!=0){
                    console.log(response.data.msg);
                    this.$message.warning(response.data.msg);
                }
                else{
                    response.data.history.forEach((history,index)=>{
                        // if(video.reviewed_status===1){
                            this.$set(this.historys,index,history);
                            console.log(history.video);
                            console.log(history.created_at)
                            // console.log(this.videoPassed.length);
                            // this.videoPassed.append(video);
                        // }
                        // else if(video.reviewed_status===0){
                        //     this.videoOnAudit.append(video);
                        // }
                    })
                    // if(Array.isArray(response.data.vid))
                }
            })
            .catch(error=>{
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>
.creation-display{
    margin:30px;
    display:flex;
}
/* .aside-wrapper{
    width:10%;
    
} */

.content-display{
    margin-left:100px;
    width:80%;
 
}
.blank-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* 根据需要调整容器的高度 */
}
.blank-msg{
  font-size: 24px;
  font-weight: bold;
  color:rgb(163, 154, 154)
}
.video-list-container{
    width:100%;
    list-style-type: none;
    /* border:1px; */
}
.video-list-item{
    width:100%;
    display:flex;
    margin:20px;
    /* height:112px; */
    /* border-bottom: 1px solid #ccc; */

}
.video-img-container{
    width:18%;
    height:112px;
}
.video-img{
    width:100%;
    height:100%;
    object-fit: cover;
    /* width:199px; */
    border-radius:10px;
    cursor:pointer
}
.video-info{
    /* display:flex; */
    margin-top:1%;
    margin-left:3%;
    width:80%;
}
.video-title{
    height:34%;
    padding-bottom:4%;
    font-weight:bold;
    font-size:19px;
    color:rgb(74, 74, 74);
   
  box-sizing: border-box;
  word-break:break-all;
  text-overflow:ellipsis;
  word-break:break-all;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  overflow:hidden;
  cursor:pointer
  /* flex:1; */
}
.video-title:hover{
    color:rgb(25, 147, 239);
}
.video-time{
    height:33.3%;
    font-weight:bold;
    font-size:16px;
    color:grey;
    /* flex:1; */
     vertical-align: middle;
    line-height: 30px;
    height:30px;
}
.history-info{
    display:flex;
    justify-content: flex-start;
    height:40px;
    margin-top:4%;
    /* text-align:center; */
    
}
.author-info-container{
    display:flex;
    width:20%;
    line-height: 30px;
    height:30px;
    margin-left:40%;
}
.author-info-container:hover .author-info-avatar{
    transform: scale(1.1);
}
.author-avatar-container{
    height:30px;
    width:40px;
}
.author-info-avatar{
    
    border-radius:50%;
    vertical-align: middle;
    line-height: 30px;
    height:100%;
    width:100%;
    transition: transform 0.3s ease;
    
}
.author-name{
    width:100%;
    margin-left:10px;
    vertical-align: middle;
    line-height: 30px;
    height:30px;
    box-sizing: border-box;
    word-break:break-all;
    text-overflow:ellipsis;
    word-break:break-all;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
    overflow:hidden;
}
.partition-label-info{
    margin-left:40px;;
}
</style>