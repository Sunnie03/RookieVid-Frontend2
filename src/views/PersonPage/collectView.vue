<template>
    <div class="person-container">
        <!-- 根标签 -->
        <top-header></top-header>
        <my-component></my-component>
  
        <div class="info-container">
          <div class="titles-container" >
            <img class="photo" :src="avatar">
            <div class="text-title" > 昵称：{{ username }}</div>
          </div>
  
          
            <div class="recommend-container">
              <div v-for="(favorite,index) in this.partition" :key="index" class="recommend-item" >
                 <img class="recommend-img" :src="favorite.cover_url" @click="openCollect(favorite.id,favorite.title)">
                <!-- <div class="overlay">
                  <span class="play-info">
                    <img class="play-icon" src="../../assets/display/play_circle_outline.svg">
                    {{video.view_amount }}</span>
                  <span class="like-info">
                    <img class="like-icon" src="../../assets/display/thumb-up.svg">
                    {{ video.like_amount }}
                  </span>
                </div> -->
                  <a class="titles" @click="openCollect(favorite.id,favorite.title)">{{ favorite.title }}</a> 
                  <div class="author"> 
                    <span class="time" style="float:left">简介： {{ favorite.description }}</span>
                    <el-button v-on:click="removeCollect(favorite.id)" size="small" style="align-self:flex-end;float:left ">删除  </el-button>
                    
                     
                  </div>
              </div>
              <div  class="recommend-item" >
                
                <img class="recommend-img" src="../../../image/newCollect.png" @click="openForm">
                
                 <a class="titles" style="text-align:center" @click="openForm" >新建收藏夹 {{ favorite.title }}</a> 
                 
                <el-dialog title="新收藏夹" :visible.sync="dialogFormVisible">
                  <el-form :model="form">
                    <el-form-item label="收藏夹名称" :label-width="formLabelWidth">
                      <el-input v-model="form.collectName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="一句话描述" :label-width="formLabelWidth">
                      <el-input v-model="form.collectDes" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    
                    <el-form-item label="是否公开" :label-width="formLabelWidth">
                      <el-radio v-model="form.radio" label="1" @click="publicColl">公开</el-radio>
                      <el-radio v-model="form.radio" label="2" @click="privateColl">不公开</el-radio>
                    </el-form-item>

                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="newCollect(), dialogFormVisible = false">确 定</el-button>
                  </div>
                </el-dialog>
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
  import Header from '../../components/HomePage/Header.vue'

// Vue.component('my-component', NavComponent);
export default {
  components: {
    'my-component': NavComponent,
    'top-header':Header,
  
  },
  data () {
    return {
      user_id: 0,
      username: '',
      avatar: '',
      favorite:[''],
      partition:[''],
      form:{
        collectName: '',
        collectDes: '',
        radio: 0,
      },
      dialogFormVisible: Boolean,
      formLabelWidth: '120px',
    }
  },
  created() {
    this.dialogFormVisible = false
    this.getData();
    this.getCollects()
  },
  methods: {
    getData() {
      let Headers={'Authorization': this.$store.getters.getStorage}
      this.user_id = this.$store.getters.getNowUser
      console.log(this.user_id)
      axios.get('/account/display_profile',{ headers: Headers, params:{user_id: this.user_id} })
      .then((res) => {
        console.log(res);
        console.log(Headers);
        if(res.data.errno == 0){  //获取成功
          this.username = res.data.context.username,
          this.avatar = res.data.context.avatar_url   //这是头像
        }
      }).catch(
        console.error()
      )
    },
    getCollects() { //展开收藏夹列表
      let Headers={'Authorization': this.$store.getters.getStorage}
      axios.get('/account/get_favorite',{ headers: Headers, params: {user_id: this.user_id}})
      .then((res) => {
        
        console.log(res);
        if(res.data.errno == 0){  //获取成功
            if (Array.isArray(res.data.favorite)) {
              this.partition = res.data.favorite; 
              console.log(this.partition)
            } 
            // else {    //这个弹窗没用，因为一定是数组
            //   alert("收藏夹列表为空")
            //   console.log("收藏夹列表为空")
            // }
        } else {
            alert(res.data.msg)
            // if(res.data.errno == )
        }
        console.log(res);
      }).catch(
        console.error()
      )
    },
    openForm(){
      this.dialogFormVisible = true;
    },
    closeForm(){
      this.dialogFormVisible = false
    },
    newCollect() {  //创建收藏夹
      let Headers={'Authorization': this.$store.getters.getStorage}
      let formData  = new FormData();
      formData.append("title", this.form.collectName);
      formData.append("description",this.form.collectDes);
      formData.append("is_private",this.form.radio);
      axios.post('/videos/create_favorite', formData,{headers: Headers})
      .then((res) =>  {
          //处理成功响应
          console.log(res.data)
          if(res.data.errno == 0){
            this.$message.success("创建成功！");
            //还得刷新页面记得
            location.reload()
          } else {
            this.$message.error(res.data.msg)
          }
         
        })
        .catch(
          //处理失败响应
          console.error())
    },
    openCollect(collect_id, collect_name) {
      
      let collect_url='/collect/'+collect_id+'/'+collect_name;
      window.open(collect_url,'_blank');
    },
    publicColl() {
      this.radio = 1;
    },
    privateColl () {
      this.radio = 0;
    },
    removeCollect(collect_id) {
      let Headers={'Authorization': this.$store.getters.getStorage}
      console.log('collect_id/favorite_id: '+collect_id)
      let formData = new FormData()
      formData.append('favorite_id', collect_id)
      if(confirm("确认要删除此收藏夹吗？")) {
        axios.post('account/delete_favorite', formData, {headers: Headers})
      .then((res) =>  {
          //处理成功响应
          if(res.data.errno == 0){
            this.$message.success("删除收藏夹成功！");
            //还得刷新页面记得
            location.reload()
          } else {
            this.$message.error(res.data.msg)
          }
          console.log(res)
         
        })
        .catch(
          //处理失败响应
          console.error())
      } else {
        return 
      }
      
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        this.hasCover=true;
        console.log(this.dialogImageUrl)
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
    height: 100%;
    overflow: hidden;
  }
  .photo {
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
  color: #4a5045;
  text-align:justify;
  font-size: 15px;
  height:100%;
  margin: 20px 30px 20px 30px;
  padding-left: 30px;
  }
  .titles-container {
    display:flex; 
    justify-content: center;
    align-items: center;
    border:#09553d 1px;
    height: 100px;
    opacity: 0.9;
  }
  .el-main {
    height: 100%;
  }
  
  
  /*首页抄的视频代码*/
   .recommend-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    margin-top: 30px;
    padding-bottom: 50px;
  }
  .recommend-item {
      width: 85%;
      height: 300px;
      position: relative;
      margin-bottom: 20px;
  }
  .recommend-img{
    width:100%;
    height:80%;
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
      font-size: 20px;
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
    font-size:medium;
    margin-top:5px;
    margin-left: 0px;
    width: 100%;
  }
  .v-application ul, .v-application ol {
    padding-left: 0px
  }
  </style>
  