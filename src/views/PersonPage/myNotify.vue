<template>
    <div class="person-container">
        <!-- 根标签 -->
        <top-header></top-header>
        <my-component></my-component>
  
        
        
        <el-main>


          <div class="notify-container" >
            <div class="notify-header" >
                我的消息
                
                <!-- <div class="header-info-1" >
                  
                </div> -->
                <el-badge :value="this.count_unread" :max="99" class="item" v-if="this.count_unread!=0">
                  <button class="header-info-2" @click="readAll" >
                  
                    <i class="el-icon-check"></i> 全部已读
                  </button>
                </el-badge>
                

            </div>
            
            <el-tabs v-model="activeName" @tab-click="handleClick">
              
              <el-tab-pane label="未读消息" name="first">
                <ul class="unread-list" v-if="this.count_unread!=0">
              
                  <li v-for="(notify, index) in unreadList" :key="index" class="notify-item" >
                    <img :src="notify.avatar_url" class="photo" >
                    <div class="user-name" >{{ notify.username | ellipsis_name}}</div>
                    <div class="user-sign" >{{notify.content | ellipsis_descp}}</div>
                    <div class="time" style="float:right">{{ notify.create_at ? notify.create_at.substring(0, 10): '' }}</div>
                    <button class="notify-button" @click="readIt1(notify)"><i class="el-icon-check"></i> 已读</button>
                  </li>
                
              </ul>
              <div v-else><h2 style="margin:50px 0 0 500px">没有未读消息</h2></div>
              </el-tab-pane>

              <el-tab-pane label="已读消息" name="second">
                <ul class="read-list" v-if="this.readList.length>0">
              
                  <li v-for="(notify, index) in readList" :key="index" class="notify-item">
                    <img :src="notify.avatar_url" class="photo" >
                    <div class="user-name" >{{ notify.username | ellipsis_name }}</div>
                    <div class="user-sign" >{{notify.content | ellipsis_descp }}</div>
                    <div class="time" style="float:right">{{ notify.create_at ? notify.create_at.substring(0, 10): ''}}</div>
                    <button class="notify-button" @click="readIt2(notify)"> 详情</button>
                  </li>
                
              </ul>
              <div v-else><h2 style="margin:50px 0 0 500px">没有已读消息</h2></div>

              </el-tab-pane>
            </el-tabs>
            
            <el-dialog title="消息内容" :visible.sync="readVisible1">

                <div :label-width="formLabelWidth" style="display:flex">
                  <img :src="form.avatar_url" style="width:80px;height:80px;margin-left:30px;border-radius: 50% ;" >
                  <div class="notify-from" >{{ form.username }}</div>
                </div>
                
                <div class="dialog-container">{{form.content }}</div>
                <div class="notify-time" >{{ form.create_at ? form.create_at.substring(0, 10): '' }}</div>
                
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="end(), readVisible1 = false">O K</el-button>
              </div>
            </el-dialog>

            <el-dialog title="消息内容" :visible.sync="readVisible2">

              <div :label-width="formLabelWidth" style="display:flex">
                <avatar :src="form.avatar_url" style="width:80px;height:80px;margin-left:30px" ></avatar>
                <div class="notify-from" >{{ form.username }}</div>
              </div>
              
              <div class="dialog-container">{{form.content }}</div>
              <div class="notify-time" >{{ form.create_at ? form.create_at.substring(0, 10): '' }}</div>
              
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="readVisible2 = false">O K</el-button>
            </div>
          </el-dialog>
            
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
import { Avatar } from 'element-ui';
  
  // Vue.component('my-component', NavComponent);
  export default {
  components: {
    "my-component": NavComponent,
    "top-header": Header,
    Avatar
},
  data () {
    return {
      readList:[],
      unreadList:[''],
      count_unread: 0,
      activeName: 'first',
      readVisible1: false,
      readVisible2: false,
      form:[''],
      formLabelWidth: '120px',
    }
  },
  created() {
    this.getData();
    console.log(this.$store.state)
  },
  filters: {
    ellipsis_name(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 10) + "...";
      }
      return value;
    },
    ellipsis_descp (value) {
      if (!value) return "";
      if (value.length > 40) {
        return value.slice(0, 40) + "...";
      }
      return value;
    }
  },

  methods: {
    getData() {
      let Headers={'Authorization': this.$store.state.token}
      axios.get('/notification/get_all_notification',{ headers: Headers})//注意接口
      .then((res) => {
        console.log(res);
        
        if(res.data.errno === 0 ){  //获取成功
            this.count_unread = res.data.count_unread
          if(Array.isArray(res.data.unread_list) && res.data.unread_list.length > 0) {
            this.unreadList = res.data.unread_list
          }
          if(Array.isArray(res.data.read_list) && res.data.read_list.length > 0) {
            this.readList = res.data.read_list
          }
          console.log(this.readList)
        } else {
            alert(res.data.msg)
        }
      }).catch(
        console.error()
      )
    },
    readAll(){
      if(this.count_unread === 0){
        alert('没有未读消息啦！')
        return 
      }
    
      let Headers={'Authorization': this.$store.state.token}
      axios.post('/notification/read_all',{ headers: Headers})
      .then((res) => {
        console.log(res)
        if(res.data.errno === 0) {
          console.log('全部已读成功')
          location.reload()
          return 
        } else {
          alert(res.data.msg)

        }
      })
    },
    readIt1(notify) {

      this.readVisible1 = true
      let Headers={'Authorization': this.$store.state.token}
      let notify_id = notify.id
      axios.get('/notification/check_notification', { headers: Headers, params:{notification_id: notify_id}})
      .then((res) => {
        console.log(res)
        if(res.data.errno === 0) {
          this.form = notify
          console.log('已读成功')
          // location.reload()
          return 
        } else {
          alert(res.data.msg)

        }
      })
    },
    readIt2(notify) {

      this.readVisible2 = true
      let Headers={'Authorization': this.$store.state.token}
      let notify_id = notify.id
      axios.get('/notification/check_notification', { headers: Headers, params:{notification_id: notify_id}})
      .then((res) => {
        console.log(res)
        if(res.data.errno === 0) {
          this.form = notify
          console.log('已读成功')
          // location.reload()
          return 
        } else {
          alert(res.data.msg)

        }
      })
    },
    handleClick(tab, event) {
        // console.log(tab, event);
    },
    end() {
      location.reload()
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
  }
  .el-main {
    overflow: hidden;
  }
  
  .notify-container {
    width: 100%;
    align-content: center;
  }
  .notify-header {
    display: flex;
    justify-content:space-between;
    padding-left: 5%;
    font-size: 25px;
    height: 80px;
    margin-left: 5%;
    width: 90%;
    vertical-align: middle;
    line-height: 80px;
    border-bottom:3px solid #BBBBBB;
  }
  .el-form-item__content {
    
    margin: 0px 0px 0px 20px;
    line-height: 40px;
    position: relative;
    font-size: 14px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
  .item {
    margin-top: 30px;
    margin-right: 40px;
  }
  .el-badge {
    margin-bottom: 0px;
    display: grid;
    height: 30px;
  }
  .header-info-1 {
    font-size: 15px;
    margin-right: 10px;
    width: 15px;
    margin:auto;
  }
  .header-info-2 {
    font-size: 15px;
    width: 100px;
    line-height: 30px;
    border: #22b8cf 1px solid;
  }
  
  .notify-item {
    display:flex; 
    justify-content: flex-start;
    align-items: center;
    vertical-align: center;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    /*border:#929599 1px solid;*/
    height: 90px;
    opacity: 0.9;
    margin-bottom: 10px;
  }
  
  .photo {
    width: 80px;
    height: 80px;
    border-radius: 50% ;
    vertical-align: middle;

    margin-right: 50px;
    margin-left: 10px;
    margin-top: 5px;
  }
  .user-sign {
    font-size: 15px;
    margin-right: 10px;
    width: 200px;
    flex: 1
  }
  
  
  .user-name {
    font-weight: bold;
    font-size: 20px;
    margin-right: 10px;
    width: 150px;
    vertical-align: middle;
  }
  
  .notify-button {
    margin-right: 5%;
    background-color: #22b8cf;
  
    color: white;
    border-radius: 4px;
    padding: 4px 8px;
    font-weight: bold;
    cursor: pointer;
    width: 70px;
  }
  .remove-button {
    margin-right: 5%;
    background-color: #e5e9ef;
  
    color: #606266;
    border-radius: 4px;
    padding: 4px 8px;
    font-weight: bold;
    cursor: pointer;
    width: 15px;
  }
  .time{
    font-size:smaller;
    margin-top:5px;
    margin-left: 0px;
    width: 100px;
  } 

  .dialog-container {
    margin: 20px 0px 20px 30px;
    width:90%;
    height: 200px;
    border: rgb(233, 176, 100) 1px solid;
    border-radius: 3px;
    text-align: center;
    font-size: medium;
  }
  .notify-time{
    font-size:medium;
    margin-top:5px;
    margin-right: 30px;
    width: 100px;
    height: 40px;
    float: right;
  } 


  .notify-from {
    font-weight: bold;
    font-size: 20px;
    margin-right: 10px;
    margin-left:30px;
    width: 150px;
    line-height: 80px;
    vertical-align: middle;
  }

  .el-tabs{
    margin: 10px 80px 20px 100px;

  }
  .read-list {
    width: 90%;
    
    border-radius: 2px;
    margin-left: 5%;
    margin-top: 10px;
  }
  .unread-list {
    width: 90%;
    
    border-radius: 2px;
    margin-left: 5%;
    margin-top: 10px;
  }

  
  </style>