<template>
    <div class="person-container">
        <!-- 根标签 -->
        <top-header></top-header>
        <my-component></my-component>

        <el-col :span="4" style="height:100%">
          <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo" style="height:100%;type:flex;justify:center" >
            <el-menu-item index="1" class="verti-menu is-active" v-on:click="openPerson">
              <i class="el-icon-s-order"></i>
              <span slot="title">基本信息</span>
            </el-menu-item>
            <el-menu-item index="2" class="verti-menu" v-on:click="openVideo">
              <i class="el-icon-edit" ></i>
              <span slot="title">我的投稿</span>
            </el-menu-item>
            <el-menu-item index="3" class="verti-menu" v-on:click="openChange">
              <i class="el-icon-setting"></i>
              <span slot="title">修改个人资料</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        
        <el-main>
          <div class="title-container" >
              <img class="photo" :src="avatar">
            <div class="text-title" > 昵称：{{ username }}</div>
            
          </div>
          <div class="text">用户ID:  {{ userid }}</div>
          <div class="text">邮箱:  {{ email }}</div>
          <div class="text">个性签名:  {{ signature }}</div>
        </el-main>
          
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
      username: '',
      avatar: '',
      userid: '',
      email: '',
      signature: ''
    }
  },
  created() {
    this.getData();
    console.log(this.$store.state)
  },
  methods: {
    openVideo(){
      this.$router.push({name:'myVideo'})
    },
    openPerson(){
      return
    },
    openChange(){
      this.$router.push({name:'myChange'})
    },
    getData() {
      let Headers={'Authorization': this.$store.state.token}
      axios.get('/account/display_profile',{ headers: Headers, params:{user_id: 1} })
      .then((res) => {
        console.log(res);
        console.log(Headers);
        if(res.data.errno == 0){  //获取成功
          this.userid = res.data.context.uid,
          this.username = res.data.context.username,
          this.email = res.data.context.email
          this.signature = res.data.context.signature  //这是个性签名
          this.avatar = res.data.context.avatar_url   //这是头像
        }else {
            alert(res.data.msg)
            // if(res.data.errno == )
        }
      }).catch(
        console.error()
      )
    }
  }
}
</script>

<style scoped>
.person-container {
    border: 1px;
    background-color: antiquewhite;
    background-size: 100% 100% ;
    background-repeat: no-repeat;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
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
}
.verti-menu{
  height: 150px;
  text-align: center;
  }
.el-main {
  color: #4a5045;
  line-height: 80px;
  text-align:justify;
  font-size: 25px;
  height:100%;
}
.title-container {
    display:flex; 
    justify-content: center;
    align-items: center;
    border:#09553d 1px;
    height: 100px;
    opacity: 0.9;
}
.text {
  border: 1px solid #6b80e0;
  /*font-weight:bold;*/
  font-size: 20px;
  background-color: rgb(225, 241, 239);
  border-radius: 4px;
  padding: 2px 8px;
  height: 80px;
  margin: 20px 8px 5px 50px;
  width: 80%;
}
.v-application ul, .v-application ol {
  padding-left: 0px
}

</style>
