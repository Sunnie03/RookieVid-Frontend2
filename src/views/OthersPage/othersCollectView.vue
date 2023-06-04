<template>
    <div class="person-container">
        <!-- 根标签 -->
        <top-header></top-header>
        <div class="info-container">
        <info-title></info-title>

        

        <el-main>
         
          <el-col :span="4" style="height:100%">
            <el-menu
              default-active="1-4-1"
              class="el-menu-vertical-demo" style="height:100%;type:flex;justify:center" >
              <el-menu-item index="1" class="verti-menu" v-on:click="openVideo">
                <i class="el-icon-edit"></i>
                <span slot="title">TA的投稿</span>
              </el-menu-item>
              <el-menu-item index="2" class="verti-menu is-active" v-on:click="openCollect">
                <i class="el-icon-star-off" ></i>
                <span slot="title">TA的收藏夹</span>
              </el-menu-item>
              
            </el-menu>
          </el-col>

          <div class="recommend-container" v-if="!this.null_flag">
            <div v-for="(favorite,index) in this.partition" :key="index" class="recommend-item" >
                <img class="recommend-img" src="../../../image/logo.png" @click="openCollVideo(favorite.id,favorite.title)">
               
                 <a class="titles" @click="openCollVideo(favorite.id,favorite.title)">{{ favorite.title }}</a> 
                 <div class="author"> 
                   <span class="time" style="float:left">简介： {{ favorite.description }}</span>
                   
                   <!-- <span class="time">{{ video.created_at ? video.created_at.split('T')[0] : '' }}</span>  -->
                    
                 </div>
            </div>
          </div>
          <div v-else><h2 style="margin:50px 0 0 500px">TA没有公开的收藏夹哦~</h2></div>
          
        </el-main>
      </div>
          
    </div>
         
</template>

<script>
import router from '@/router'
import axios from 'axios'
// import { callbackify } from 'util'
import Header from '@/components/HomePage/Header.vue'
import Title from '@/components/PersonPage/otherTitle.vue'

// Vue.component('my-component', NavComponent);
export default {
  components: {
    'top-header':Header,
    'info-title':Title
  },
  data () {
    return {
      look_user: 0,
     
      null_flag: false,
      partition:[''],
    }
  },
  created() {
    this.look_user = this.$route.params.user_id
    this.getVideo();
    console.log(this.$store.state)
  },
  methods: {
    openVideo(){
        this.$router.push({name:'lookPerson',params:this.look_user})//注意看应该是获取到的user_id
       
    },
    openCollect(){
      // window.open(collect_url,'_blank');
      return 
      
    },
   
    getVideo() {  //获取别人的收藏夹，懒得改名了
    let Headers={'Authorization': this.$store.getters.getStorage}
    axios.get('/account/get_favorite',{ headers: Headers, params: {user_id: this.look_user}})
      .then((res) => {
        
        console.log(res);
        if(res.data.errno == 0){  //获取成功
            if (Array.isArray(res.data.favorite) && res.data.favorite.length>0) {
              this.partition = res.data.favorite;
              this.null_flag = false 
              console.log(this.partition)
            } else {    //我估计传回来的是空
              console.log("该用户收藏夹列表为空")
              this.null_flag = true
            }
        } else {
            alert(res.data.msg)
            // if(res.data.errno == )
        }
        console.log(res);
      }).catch(
        console.error()
      )
    },
    openCollVideo(collect_id, collect_name) {
        this.$router.push({name:'lookOthersCollectVideo',
        params:{
            user_id: this.look_user,
            collect_id: collect_id,
            collect_name: collect_name
        }})
     
    }
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
.info-container {
  height: 100%;
}
.photo {
    /*border-style: double;*/
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
    margin-bottom: 100px;
}
.user-sign {
  font-size: 16px;
  margin-right: 10px;
  width: 600px;
  margin-left: 40px;
  color: rgb(61, 59, 59);
}

.el-main {
  color: #4a5045;
  text-align:justify;
  height:100%;
  padding: 0;
}
.title-container {
    display:flex; 
    justify-content: flex-start;
    align-items: center;
    border:#09553d 1px;
    height: 260px;
    padding-left: 5% ;
    background-image: url("@/../image/titleBack1.png");
    background-size:cover;
}

.v-application {
  font-family: "Roboto", sans-serif;
  line-height: 1.6;
}
.follow-button {
  margin-right: 5%;
  background-color: #22b8cf;

  color: white;
  border-radius: 4px;
  padding: 6px 10px;
  font-weight: bold;
  cursor: pointer;
}

.el-menu-vertical-demo {
  border-right: grey 1px solid;
  background-color:rgb(252, 252, 247);
  height: 100%;
}
.v-application ul, .v-application ol {
   padding-left: 0px; 
}
.verti-menu{
  height: 200px;
  text-align: center;
  vertical-align: middle;
  line-height: 200px;
  }

  /*从我的投稿抄过来的代码*/
  .recommend-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    padding-top: 40px;
  }
  .recommend-item {
      width: 85%;
      height: 250px;
      position: relative;
      /*margin-bottom: 20px;*/
  }
  .recommend-img{
    width:100%;
    height:60%;
    object-fit:cover;
    border-radius: 6px;
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
     /* justify-content: center;
      align-items: center;*/
      font-size: 14px;
      font-weight: bold;
      padding: 10px;
      box-sizing: border-box;
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
    font-size:smaller;
    margin-top:5px;
    margin-left: 0px;
    width: 100%;
  }
</style>
