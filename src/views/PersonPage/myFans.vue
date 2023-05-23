<template>
    <div class="person-container">
        <!-- 根标签 -->
        <top-header></top-header>
        <my-component></my-component>

        
        
        <el-main>
          <!-- <div class="title-container" >
              <img class="photo" :src="avatar">
            <div class="text-title" > 昵称：{{ username }}</div>
            
          </div>
          <div class="text">用户ID:  {{ userid }}</div>
          <div class="text">邮箱:  {{ email }}</div>
          <div class="text">个性签名:  {{ signature }}</div> -->
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
    overflow: auto;
  }
  .photo {
    border-style: double;
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
  
</style>