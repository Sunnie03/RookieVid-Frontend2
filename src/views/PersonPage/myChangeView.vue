<template>
    <div class="person-container">
        <!-- 根标签 -->
        <top-header></top-header>
        <my-component></my-component>

        <el-col :span="4" style="height:100%">
          <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo" style="height:90%;type:flex;justify:center" >
            <el-menu-item index="1" class="verti-menu" v-on:click="openPerson">
              <i class="el-icon-s-order"></i>
              <span slot="title">基本信息</span>
            </el-menu-item>
            <el-menu-item index="2" class="verti-menu" v-on:click="openVideo">
              <i class="el-icon-edit" ></i>
              <span slot="title">我的投稿</span>
            </el-menu-item>
            <el-menu-item index="3" class="verti-menu is-active" v-on:click="openChange">
              <i class="el-icon-setting"></i>
              <span slot="title">修改个人资料</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        
        <el-main>
          <div class="title-container" >
            <img class="photo" :src="avatar">            
            <label class="changephoto" @click="dialogFormVisible = true">更换头像</label>
            
          </div>
        
        

        <el-form style="width:100% ">
          <el-form-item label="用户ID  " prop="userid" style="display:flex;margin-left:15px"> {{ userid }}
          </el-form-item>
          <el-form-item label="用户名" prop="username" style="display:flex;margin-left:15px">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" style="display:flex; margin-left:28px">
            <el-input v-model="email" style="width:60%"></el-input> 
            <el-input v-model="verify" placeholder="请输入验证码" style="width:30%;margin-left:30px"></el-input>  
            <el-button type="success" @click="sendVerification()" style="margin-left:20px;position:absolute">发送验证码</el-button>
          </el-form-item>
          <el-form-item label="个性签名" prop="signature" style="display:flex">
            <el-input v-model="signature" autocomplete="off"></el-input>
          </el-form-item>
          <el-button type="primary" @click="changeInfo">修改资料</el-button>
          <el-button @click="giveUp">取消</el-button>
        </el-form>

        <el-form  status-icon :rules="rules">
          <el-form-item label="原始密码" prop="oldPassword" style="display:flex">
            <el-input type="password" v-model="oldPassword" autocomplete="off" style="width:370%" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password1" style="display:flex;margin-left:15px">
            <el-input type="password" v-model="password" autocomplete="off" style="width:370%" show-password  placeholder="8 到 14 个字符，数字+字母"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="password2" style="display:flex">
            <el-input type="password" v-model="checkPass" autocomplete="off" style="width:364%" show-password></el-input>
          </el-form-item>
          <el-button type="primary" @click="changePass" >修改密码</el-button>
          <el-button @click="giveUp">取消</el-button>
        </el-form>

        <!--更换头像表单-->
        <el-dialog :visible.sync="dialogFormVisible"  >
              
          <label for="upload">上传图片
            <!-- <img src="@/assets/upload/upload_cover.png" style="height: 100px; width:100px;opacity: 0.6;"> -->
          </label>
          <el-upload 
                  action=""
                  v-model="upload_photo"
                  list-type="picture-card"
                  
                  :on-remove="handleRemove"
                  :auto-upload="false"

                  :on-change="savePicture"
                  :on-preview="handlePictureCardPreview"
                  accpet=".png,.jpeg"
                  :limit="1"
                  >
                  <button>请点此上传图片</button>
                </el-upload>
          <!-- <el-input  type="file" id="upload" v-model="upload_photo" style="width:200px" accpet=".png,.jpeg,.jpg"
          :limit="1" :auto-upload="false" >  </el-input> -->
          
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="changephoto(), dialogFormVisible = false" >上传图片</el-button>
          
        </el-dialog>
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
    var validatePass = (rule, value, callback) => {
      //  rule: password的详细信息，value：password的值，callback:如果都不满足，则正常提交
      if (value === '') {
        callback(new Error('请输入密码')) // input为空
      } else {
        if (this.checkPass !== '') {
          this.$refs.validateField('checkPass') // 如果确认密码不为空，去往比对两密码函数
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (value !== this.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      user_id: 0,
      username: '',
      avatar: '',
      upload_photo: null,
      userid: '',
      email: '',
      oldEmail: '',
      signature: '',
      oldPassword: '',
      password: '',
      checkPass: '',
      verify: '',
      dialogFormVisible:Boolean,
      rules: {
        password: [{ required: true, validator: validatePass, trigger: 'blur' },
          { min: 8, max: 14, message: '长度在 8 到 14 个字符', trigger: 'blur' }/* 长度要求、正则要求 */],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
      },
    }
    
  },
  
  created(){
    this.dialogFormVisible = false;
    this.getData()
  },
  methods: {
    openVideo(){
      this.$router.push({name:'myVideo'})
    },
    openPerson(){
      this.$router.push({name:'person'})
    },
    openChange(){
      return
    },
    getData() {
      let Headers={'Authorization': this.$store.getters.getStorage}
      this.user_id = this.$store.getters.getNowUser
      axios.get('/account/display_profile',{ headers: Headers, params:{user_id: this.user_id} })
      .then((res) => {
        console.log(res);
        console.log(Headers);
        if(res.data.errno == 0){  //获取成功
          this.username = res.data.context.username,
          this.avatar = res.data.context.avatar_url   //这是头像
          this.userid = res.data.context.uid
          this.email = res.data.context.email
          this.oldEmail = this.email
          this.signature = res.data.context.signature

        } else {
            alert(res.data.msg)
            // if(res.data.errno == )
        }
      }).catch(
        console.error()
      )
    },
    changeInfo() {  //更改基本信息
      let Headers={'Authorization': this.$store.getters.getStorage}
      let formData1  = new FormData();
      formData1.append("username", this.username);
      formData1.append("signature",this.signature);

      let formData2 = new FormData();
      formData2.append("email", this.email);
      formData2.append("vcode", this.verify);
      
      if(this.email !== this.oldEmail) {
          Promise.all([   //昵称+个性签名，邮箱
          axios.post('/account/edit_profile', formData1, { headers: Headers}),
          axios.post('/account/change_email', formData2, {headers: Headers})
        ])
        .then(([res1,res2]) =>  {
          //处理成功响应
          console.log(res1)
          console.log(res2)
          if(res1.data.errno === 0 && res2.data.errno === 0){
            alert("已成功修改信息");
            location.reload()
          } else if(res1.data.errno !== 0) {
            alert(res1.data.msg);
            if(res2.data.errno) {
              alert(res2.data.msg);
            }
          } else {
            alert(res2.data.msg);
          }
          
        })
        .catch( //处理失败响应
          console.error()
        )
      }
      else{ //不用修改邮箱，不要判断验证码
          axios.post('/account/edit_profile',formData1, {headers: Headers})
          .then((res) => {
            // console.log("修改用户名+个性签名 "+res)
            console.log(res)
            if(res.data.errno == 0){
              alert("已成功修改信息");
              location.reload()
            } else {
              alert(res.data.msg);
            }
            
          })
          .catch( //处理失败响应
            console.error()
          )
      }
     
    },
    changePass(){   //更改密码
      let Headers={'Authorization': this.$store.getters.getStorage}
      let formData = new FormData();
      formData.append("old_password", this.oldPassword);
      formData.append("password_1",this.password);
      formData.append("password_2",this.checkPass);
      axios.post('/account/change_password', formData, {headers: Headers})
      .then(res => {
        console.log(res)
        if(res.data.errno == 0) {
          alert("修改密码成功")
          location.reload()
        } else {
          alert(res.data.msg)
        }
      })
      .catch(
        console.error()
      )
    },
    savePicture(file){
      this.upload_photo=file.raw;
      
    },
    changephoto() { //更改头像

      if(this.upload_photo==null || this.upload_photo=='' || this.upload_photo==undefined) {
        alert("您还未选择图片！")
        return
      }
      console.log(this.upload_photo)
      const isIMAGE = (this.upload_photo.type === 'image/jpeg' ||this.upload_photo.type === 'image/png'|| this.upload_photo.type === 'image/jpg');
      if (!isIMAGE) {
        this.$message.error('头像只能是jpeg/jpg/png格式!');
        alert("请选择正确的图片格式")
        return ;
      }
      let Headers={'Authorization': this.$store.getters.getStorage}
      let formData = new FormData();
      formData.append("avatar_file", this.upload_photo);
      
      axios.post('/account/edit_avatar', formData, {headers: Headers})
      .then(res => {
        console.log(res)
        if(res.data.errno == 0) {
          alert("更换头像成功")
          location.reload()
        } else {
          alert(res.data.msg)
        }
      })
      .catch(
        console.error()
      )
      
    },
    sendVerification() {
        let formData  = new FormData();
        formData.append("email",this.email);
        axios.post('/account/send_vcode',formData)
        .then(response => {
          //处理成功响应
          if(response.data.errno === 0){
            alert("已发送验证码，注意5分钟内有效");
          } else {
            alert(response.data.msg)
          }
          console.log(response)
        })
        .catch(
          //处理失败响应
          console.error())
    },
    giveUp() {
      location.reload()
      return
    },
    handleRemove(file, fileList) {
      return
    },
    handlePictureCardPreview(file) {
      return
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
    overflow:hidden;
}
.photo {
    width: 80px;
    height: 80px;
    border-radius: 50% ;
    vertical-align: middle;
}

.verti-menu{
  height: 150px;
  text-align: center;
  vertical-align: middle;
  line-height: 150px;
  }
  .el-menu-vertical-demo {
    background-color:#fcfcf7;
    height: 100%;
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
  margin-left: 100px;
}
.v-application ul, .v-application ol {
  padding-left: 0px
}
.el-main {
  overflow: auto;
  height: 100%;
}
.el-input {
  width:400%
}
.el-button {
  margin-left: 150px;
  margin-bottom: 20px;
}


.changephoto{
  margin-left: 70px;
  background-color: rgb(235, 232, 208);
  border-radius: 5px;
  padding: 8px 8px 8px 8px;
}
</style>
