<template>
    <div class="register-container">
        <!-- 根标签 -->
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="register-form">
            <h2 class="title-zc">
              <img src="../../assets/web_logo.png" style="height: 30px;vertical-align: sub"/>
              欢迎注册
            </h2>
            <el-form-item label="用户名" prop="username" style="margin-top:20px">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password"  placeholder="8~16位，数字和字母" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" id="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verify" >
              <el-input v-model="form.verify"></el-input>
              <!-- 这里我还没写，验证码功能，也要改按钮触发事件 -->
              <el-button type="success" @click="sendVerification()">发送验证码</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()" style="margin:20px 50px 0 0;">提交</el-button>
              <el-button @click="resetForm('ruleForm')" style="margin-right:100px">重置</el-button>
            </el-form-item>
            <div text-decoration:underline><router-link to="/login">已有账号，去登录</router-link></div>
          </el-form>
    </div>
</template>

<script>
import { mdiZWave } from '@mdi/js'
import axios from 'axios'
// import { callbackify } from 'util'

export default {
  data () {
    var validatePass = (rule, value, callback) => {
      //  rule: password的详细信息，value：password的值，callback:如果都不满足，则正常提交
      if (value === '') {
        callback(new Error('请输入密码')) // input为空
      } else {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
        const isValid = regex.test(value);
        if(!isValid){
          callback(new Error('密码为数字+字母的组合'))
        }
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass') // 如果确认密码不为空，去往比对两密码函数
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
        const isValid = regex.test(value);
        if(!isValid){
          callback(new Error('密码为数字+字母的组合'))
        }
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
        username: '',
        password: '',
        checkPass: '',
        email: '',
        verify: ''
      },
      rules: {
        username: [{ required: true, validator: validateName, trigger: 'blur' },
          { min: 1, max: 20, message: '用户名长度在 1 到 20 个字符', trigger: 'blur' }/* 长度要求 */],
        password: [{ required: true, validator: validatePass, trigger: 'blur'},
          { min: 8, max: 14, message: '长度在 8 到 16 个字符', trigger: 'blur' }/* 长度要求、正则要求 */],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' },
          { min: 8, max: 14, message: '长度在 8 到 16 个字符', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
      }
    }
  },
  // 这里是表单提交功能、重置功能
  methods: {
    submitForm (formName) {
      let formData  = new FormData();
      formData.append("username", this.form.username);
      formData.append("password_1",this.form.password);
      formData.append("password_2",this.form.checkPass);
      formData.append("email",this.form.email);
      formData.append("vcode",this.form.verify);
      axios.post('/account/register', formData)
      .then((res) =>  {
          //处理成功响应
          if(res.data.errno == 0){
            this.$message.success("注册成功");
            // this.$router.push({name: login})
            this.$router.push('/login')
          } else {
            this.$message.error(res.data.msg)
          }
          console.log(res.data.msg)
         
        })
        .catch(
          //处理失败响应
          console.error())
    },
    resetForm () {
      this.form.username=''
      this.form.password=''
      this.form.checkPass=''
      this.form.email=''
      this.form.verify=''
    },
    sendVerification() {
        let formData  = new FormData();
        formData.append("email",this.form.email);
        axios.post('/account/send_vcode',formData)
        .then(response => {
          //处理成功响应
          if(response.data.errno === 0){
            this.$message.success("已发送验证码，注意5分钟内有效");
          } else {
            this.$message.error(response.data.msg)
            // prompt("okkl")
            // confirm("11111")
          }
          console.log(response)
        })
        .catch(
          //处理失败响应
          console.error())
    }
  }
}
</script>

<style scoped>
.register-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url('../../../image/registerBack.jpg');
  background-size: 100% 100% ;
  opacity: 0.7;
  background-repeat: no-repeat;
}
.register-form {
  width: 500px;
  margin: 100px auto;
  background-color: rgb(156, 230, 230, 0.95);
  padding: 30px;
  border-radius: 10px;
}
.title-zc {
  text-align: center;
}
</style>
