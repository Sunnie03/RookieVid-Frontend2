<template>
    <div class="login-container">
        <!-- 根标签 -->
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-form">
            <h2 class="title-zc">
                <img src="../../../image/logo.png" style="height: 30px;width: 30px;vertical-align: sub" />
                欢迎登录
            </h2>
            <div id="username" class="intrud">请输入用户ID/邮箱</div>
            <el-input v-model="form.userid"></el-input>
            <div id="password" class="intrud">请输入密码</div>
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
            <el-form-item>
              <el-button type="primary" @click="loginForm('form')" style="margin:50px 50px 0 0;">
                登录
              </el-button>
              <el-button @click="closeForm('form')" style="margin-right:100px">取消</el-button>
            </el-form-item>
            <div text-decoration:underline><router-link to="/register">还没有帐号？点击注册</router-link></div>
        </el-form>
    </div>
</template>

<script>
import router from '@/router'
import axios from 'axios'
// import { callbackify } from 'util'

export default {
  data () {
    var validatePass = (rule, value, callback) => {
      //  rule: password的详细信息，value：password的值，callback:如果都不满足，则正常提交
      if (value === '') {
        callback(new Error('请输入密码')) // input为空
      } else {
        callback()
      }
    }
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      form: {
        userid: '',
        password: ''
      },
      rules: {
      }
    }
  },
  // 这里是表单提交功能、重置功能
  methods: {
    loginForm (formName) {
      let formData  = new FormData();
      formData.append("uid", this.form.userid);
      formData.append("password",this.form.password);
      axios.post('/account/login', formData)
      .then((res) => {
        if(res.data.errno == 0) {
           //登录成功，关闭本页面，把首页置为已登录状态
          this.$store.commit("$_login");  //登录
          this.$store.commit("$_logAdmin", res.data.status);  //是否是管理员
          this.$store.commit('$_setToken', res.data.token)  //这里就是要更改token
          this.$store.commit('$_setNowUser', res.data.user_id)
          this.$message({
            message:"登录成功！",
            type: 'success',
            duration: 1000})
          // alert("登录成功！")

          console.log(this.$store.state.token)    //打印当前token
          //刷新首页
          console.log(this.$store.state)

          // this.$message.close()
          if(window.opener === null) {
            this.$router.push("/")
          }else {
            window.opener.location.reload()
            window.close()
          }
          
          // this.$router.push({name:'home'})
        } else {
          alert(res.data.msg)
        }
        console.log(res.data);


      }).catch(
        console.error()
      )
    },
    closeForm (formName) {
      //关闭本页面，前一个页也要刷新
      window.opener.location.reload()
      window.opener = null;
      window.close()
    }
  }
}
</script>

<style scoped>
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url('../../../image/loginBack.jpg');
  background-size: 100% 100% ;
  opacity: 0.7;
  background-repeat: no-repeat;
}
.login-form {
  width: 500px;
  margin: 100px auto;
  background-color: rgb(156, 230, 230, 0.95);
  padding: 30px;
  border-radius: 10px;
}
.title-zc {
  text-align: center;
}
.intrud {
    text-align: left;
    margin-top: 40px;
    margin-bottom:15px;
    text-decoration-color: dimgrey;
}
</style>
