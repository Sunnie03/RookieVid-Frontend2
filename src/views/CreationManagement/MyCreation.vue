<template>
    <div class="CreationManagement">
        <Header/>
        <div class="creation-display">
            
            <div class="aside-wrapper">
                <el-button class="upload-button" @click="upload_video">
                    <i class="el-icon-upload" ></i>
                    投稿
                </el-button>
                <el-menu :default-active="activeIndex" class="el-menu-demo" @select="handleSelect">
                <!-- <el-menu-item index="1">首页</el-menu-item> -->
                <el-menu-item index="1">稿件管理</el-menu-item>
                </el-menu>
            </div>
        
            <div class="content-display">
                <el-tabs class="videoClass" v-model="selectTab">
                    <el-tab-pane label="已通过" name="VideoPassed">
                        <div class="video-container">
                            <div v-if="videoPassed.length===0" class="blank-container">
                                <div class="blank-msg">这里什么都没有吖</div>
                             </div>
                            <div v-else>
                              <ul class="video-list-container">
                               
                                <li  v-for="(video,index) in this.displayedVideosPassed" :key="index">
                                    <div class="video-list-item">
                                    <div class="video-img-container">
                                        <img class="video-img" :src="video.cover_url" @click="videoPlay(video.id)">
                                    </div>
                                    <div class="video-info">
                                        <div class="video-title">{{ video.title }}</div>
                                        <div class="video-time">{{ video.created_at?video.created_at:'' }}</div>
                                        <i class="el-icon-video-play">{{ video.view_amount }}</i>
                                        <i class="el-icon-thumb">{{ video.like_amount }}</i>
                                        <i class="el-icon-star-off">{{ video.fav_amount }}</i>
                                    </div>
                                    <el-button class="delete-button" @click="showDeleteConfirmation(video.id)">
                                        <i class="el-icon-delete"></i>删除
                                    </el-button>
                                    <el-button class="amend-button" @click="amendVideo(video.id)">
                                        <i class="el-icon-edit"></i>修改
                                    </el-button>
                                     </div>
                                    <el-divider></el-divider>
                                </li>
                              </ul>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="审核中" name="VideoOnAudit">
                        <div v-if="videoOnAudit.length===0"  class="blank-container">
                            <div class="blank-msg">这里什么都没有吖</div>
                        </div>
                        <div v-else>
                            <ul class="video-list-container">
                               <li  v-for="(video,index) in this.displayedVideosOnAudit" :key="index">
                                <div class="video-list-item">
                                    <div class="video-img-container">
                                        <img class="video-img" :src="video.cover_url" @click="videoPlay(video.id)">
                                    </div>
                                    <div class="video-info">
                                        <div class="video-title">{{ video.title }}</div>
                                        <div class="video-time">{{ video.created_at?video.created_at:'' }}</div>
                                        <i class="el-icon-video-play">{{ video.view_amount }}</i>
                                        <i class="el-icon-thumb">{{ video.like_amount }}</i>
                                        <i class="el-icon-star-off">{{ video.fav_amount }}</i>
                                    </div>
                                    <el-button class="delete-button" @click="showDeleteConfirmation(video.id)">
                                        <i class="el-icon-delete"></i>删除
                                    </el-button>
                                    <el-button class="amend-button" @click="amendVideo(video.id)">
                                        <i class="el-icon-edit"></i>修改
                                    </el-button>
                                     </div>
                                    <el-divider></el-divider>
                                </li>
                             </ul>
                             
                        </div>
                            <!-- <VideoContent :partition="videoOnAudit"></VideoContent> -->
                    </el-tab-pane>
                </el-tabs>
                <el-pagination
                v-if="totalPagesPassed > 1 && selectTab === 'VideoPassed'"
                class="pagination"
                :page-size="pageSize"
                :current-page="currentPagePassed"
                :total="videoPassed.length"
                @current-change="handlePageChangePassed"
                ></el-pagination>
                <el-pagination
                v-if="totalPagesOnAudit > 1 && selectTab === 'VideoOnAudit'"
                class="pagination"
                :page-size="pageSize"
                :current-page="currentPageOnAudit"
                :total="videoOnAudit.length"
                @current-change="handlePageChangeOnAudit"
                ></el-pagination>
            </div>
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
        videoPassed:[],
        videoOnAudit:[],
        selectTab:"VideoPassed",
        activeIndex: '1',
        // currentPage: 1,
        currentPagePassed: 1,
        currentPageOnAudit: 1,
        pageSize: 8,
       } 
    },
    computed:{
        totalPagesPassed() {
            return Math.ceil(this.videoPassed.length / this.pageSize);
        },
        totalPagesOnAudit() {
            return Math.ceil(this.videoOnAudit.length / this.pageSize);
        },
        displayedVideosPassed() {
            const startIndex = (this.currentPagePassed - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.videoPassed.slice(startIndex, endIndex);
        },
        displayedVideosOnAudit() {
            const startIndex = (this.currentPageOnAudit - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.videoOnAudit.slice(startIndex, endIndex);
        },
    },
    created(){
        this.getData();
    },
    methods:{
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
      amendVideo(id){
        const amend_creation_url='/amendCreation/'+id;
        // window.open(amend_creation_url,)
        this.$router.push(amend_creation_url);
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
      deleteVideo(id){
        let Headers={'Authorization': this.$store.getters.getStorage}
        let formdata=new FormData();
        formdata.append("video_id",id);
        console.log(id);
        axios.post('/videos/delete_video',formdata,{headers:Headers})
        .then((response)=>{
            if(response.data.errno!=0){
                alert(response.data.msg);
            }
            else{
                alert(response.data.msg);
                window.location.reload();
                // this.$router.push('myCreation');
            }
        })
        .catch(err=>{
            console.log(err);
        })
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      upload_video(){
            const uploadUrl='/creation';
            this.$router.push(uploadUrl);
      },
        getData(){
            let Headers={'Authorization': this.$store.getters.getStorage}
            axios.get('/videos/get_video',{headers:Headers})
            .then((response)=>{
                console.log(response);
                if(response.data.errno!=0){
                    console.log(response.data.msg);
                    alert(response.data.msg);
                }
                else{
                    response.data.video1.forEach((video,index)=>{
                        // if(video.reviewed_status===1){
                            this.$set(this.videoPassed,index,video);
                            // console.log(this.videoPassed.length);
                            // this.videoPassed.append(video);
                        // }
                        // else if(video.reviewed_status===0){
                        //     this.videoOnAudit.append(video);
                        // }
                    })
                    // if(Array.isArray(response.data.vid))
                    response.data.video0.forEach((video,index)=>{
                        this.$set(this.videoOnAudit,index,video);
                        console.log(this.videoOnAudit.length);
                    })
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
.aside-wrapper{
    width:10%;
    
}
.upload-button{
    width:100%;
    background-color: rgb(0, 166, 255);
    color:white;
    font-size:16px;
}
.content-display{
    margin-left:50px;
    width:75%;
 
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
    width:23%;
    height:112px;
}
.video-img{
    width:100%;
    height:100%;
    object-fit: cover;
    /* width:199px; */
    border-radius:10px;
}
.video-info{
    margin-top:1%;
    margin-left:3%;
    width:80%;
}
.video-title{
    height:32%;
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
  -webkit-line-clamp:1;
  overflow:hidden;
}
.video-time{
    height:33.3%;
    font-weight:bold;
    font-size:16px;
    color:grey;
}
.el-icon-video-play{
    height:33.3%;
    font-size:16px;
    color:grey;
    margin-right:20px;
}
.el-icon-thumb{
    height:33.3%;
    font-size:16px;
    color:grey;
    margin-right:20px;
}
.el-icon-star-off{
    height:33.3%;
    font-size:16px;
    color:grey;
}
.delete-button{
    margin-top:3%;
   
    height:70%;
}
.delete-button:hover{
    background-color: rgb(243, 206, 206);
    border-color:rgb(250, 175, 175);
    color:rgb(255, 0, 0);
}
.amend-button{
    margin-top:3%;
    margin-right:3%;
    height:70%;
}
</style>