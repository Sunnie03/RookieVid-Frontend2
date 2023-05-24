<template>
    <div class="CreationManagement">
        <Header/>
        <div class="creation-display">
            <div class="aside-wrapper">
                
            </div>
        
            <div class="content-display">
                <el-tabs class="videoClass">
                    <el-tab-pane label="已通过" name="VideoPassed">
                        <div class="video-container">
                            <div v-if="videoPassed.length===0" class="blank-container">
                                <div class="blank-msg">这里什么都没有吖</div>
                             </div>
                            <div v-else>
                                <VideoContent :partition="videoPassed"></VideoContent>
                            </div>
                            
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="审核中" name="VideoOnAudit">
                        <div v-if="videoOnAudit.length===0" class="blank-container">
                            <div class="blank-msg">这里什么都没有吖</div>
                        </div>
                        <div v-else>
                            <VideoContent :partition="videoOnAudit"></VideoContent>
                        </div>
                            <!-- <VideoContent :partition="videoOnAudit"></VideoContent> -->
                    </el-tab-pane>
                </el-tabs>
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
       } 
    },
    created(){
        this.getData();
    },
    methods:{
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
    margin:50px;
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
</style>