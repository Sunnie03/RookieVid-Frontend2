<template>
    <div class="person-container">
        <!-- 根标签 -->
        <top-header></top-header>
        <my-component></my-component>

        
        
        <el-main>
          <div class="follow-container">
            <div class="follow-header">全部关注</div>
            <ul class="follow-list">
              
              
                <li v-for="(user, index) in followList" :key="index" class="follow-item">
                  <img :src="user.avatar_url" class="photo" @click="openLook(user.id)">
                  <div class="user-name" @click="openLook(user.id)">{{ user.username }}</div>
                  <div class="user-sign" v-if="user.signature">{{user.signature}}</div>
                  <div class="user-sign" v-else>这个人很懒，什么都没写吖</div>
                  <button class="follow-button">+关注</button>
                </li>
              
              <!-- <li class="follow-item">关注用户2 </li> -->
            </ul>
          </div>
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
      followList:['']
    }
  },
  created() {
    this.getData();
    console.log(this.$store.state)
  },
  methods: {
    getData() {
      let Headers={'Authorization': this.$store.state.token}
      axios.get('/account/get_followings',{ headers: Headers})
      .then((res) => {
        console.log(res);
        console.log(Headers);
        if(res.data.errno == 0){  //获取成功
          if(Array.isArray(res.data.data)) {
            this.followList = res.data.data
          }
        }else {
            alert("获取数据出错")
            alert(res.data.msg)
        }
      }).catch(
        console.error()
      )
    },
    openLook(look_user) {
      let look_url='/lookPerson/'+look_user;
      window.open(look_url,'_blank');
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
  width: 80px;
  height: 80px;
  border-radius: 50% ;
  vertical-align: middle;
  margin-right: 5%;
}

.follow-container {
  width: 100%;
  align-content: center;
  
}
.follow-header {

  padding-left: 5%;
  font-size: 25px;
  height: 80px;
  margin-left: 5%;
  width: 90%;
  vertical-align: middle;
  line-height: 70px;
  border-bottom:3px solid #BBBBBB;
}
.follow-list {
  width: 90%;
  
  border-radius: 2px;
  margin-left: 5%;
  margin-top: 10px;
}
.follow-item {
  display:flex; 
  justify-content: flex-start;
  align-items: center;
  border-bottom:#3e93e2 1px solid;
  height: 90px;
  opacity: 0.9;
  margin-bottom: 10px;
 /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)*/
}
.user-sign {
  font-size: 15px;
  margin-right: 10px;
  width: 200px;
  flex:1;
}


.user-name {
  font-weight: bold;
  font-size: 20px;
  margin-right: 20px;
}

.follow-button {
  margin-right: 5%;
  background-color: #22b8cf;

  color: white;
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: bold;
  cursor: pointer;
}

</style>